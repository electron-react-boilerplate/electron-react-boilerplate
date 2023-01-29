import xml2js from 'xml2js';
import { EventEmitter } from 'events';
import { spawn } from 'child_process';
import { platform } from 'os';
import { exec } from 'sudo-prompt';
import { ITcpScan } from './types/scan-network.types';
import convertRawJsonToScanResults from './scan-network';

class NmapScan extends EventEmitter {
  command: string[];

  nmapOutputXML: string;

  range: string;

  arguments: string[];

  rawData: string;

  rawJSON: ITcpScan;

  child: any;

  cancelled: boolean;

  scanTime: number;

  error: string;

  timer: NodeJS.Timer;

  scanResults: string;

  scanTimeout: number;

  constructor(range: string, args: string) {
    super();
    this.command = [];
    this.nmapOutputXML = '';
    this.timer = undefined as any;
    this.range = '';
    this.arguments = ['-oX', '-'];
    this.rawData = '';
    this.rawJSON = '' as any;
    this.child = '';
    this.cancelled = false;
    this.scanTime = 0;
    this.error = '';
    this.scanResults = '';
    this.scanTimeout = 0;
    this.commandConstructor(range, args);
    this.initializeChildProcess();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.scanTime += 10;
      if (this.scanTime >= this.scanTimeout && this.scanTimeout !== 0) {
        this.killChild();
      }
    }, 10);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  commandConstructor(range: string, args: string) {
    if (args) {
      if (!Array.isArray(args)) {
        args.split(' ');
      }
      this.command = this.arguments.concat(args);
    } else {
      this.command = this.arguments;
    }

    if (!Array.isArray(range)) {
      range.split(' ');
    }
    this.range = range;
    this.command = this.command.concat(this.range);
  }

  killChild() {
    this.cancelled = true;
    if (this.child) {
      this.child.kill();
    }
  }

  async initializeChildProcess() {
    this.startTimer();
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    console.log(nmap.nmapLocation, this.command, 'CHAMADO COMANDO');
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    this.child = spawn(nmap.nmapLocation, this.command);
    process.on('SIGINT', this.killChild);
    process.on('uncaughtException', this.killChild);
    process.on('exit', this.killChild);
    this.child.stdout.on('data', (data: string) => {
      if (data.indexOf('percent') > -1) {
        console.log(data.toString());
      } else {
        this.rawData += data;
      }
    });

    this.child.on('error', (err: any) => {
      this.killChild();
      if (err.code === 'ENOENT') {
        this.emit(
          'error',
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          `NMAP not found at command location: ${nmap.nmapLocation}`
        );
      } else {
        this.emit('error', err.Error);
      }
    });

    this.child.stderr.on('data', (err: string) => {
      this.error = err.toString();
    });

    this.child.on('close', () => {
      process.removeListener('SIGINT' as any, this.killChild);
      process.removeListener('uncaughtException' as any, this.killChild);
      process.removeListener('exit' as any, this.killChild);

      if (this.error) {
        this.stopTimer();
        this.emit('error', this.error);
      } else if (this.cancelled === true) {
        this.stopTimer();
        this.emit('error', `Over scan timeout ${this.scanTimeout}`);
      } else {
        this.rawDataHandler(this.rawData);
      }
    });
  }

  startScan() {
    this.child.stdin.end();
  }

  cancelScan() {
    this.killChild();
    this.emit('error', 'Scan cancelled');
  }

  scanComplete(results: any) {
    this.scanResults = results;
    this.stopTimer();
    this.emit('complete', this.scanResults);
  }

  rawDataHandler(data: string) {
    let results;
    // turn NMAP's xml output into a json object
    xml2js.parseString(data, (err, result) => {
      if (err) {
        this.stopTimer();
        this.emit('error', `Error converting XML to JSON in xml2js: ${err}`);
      } else {
        this.rawJSON = result;
        results = convertRawJsonToScanResults(this.rawJSON);
        this.scanComplete(results);
      }
    });
  }
}

// export default NmapScan;
function runAsRoot(firstArg: string) {
  const options = {
    name: 'Electron',
    icns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
  };

  exec(firstArg, options, (error, stdout, stderr) => {
    if (error) throw error;
    console.log(`stdout: ${stdout}`);
  });
}

const operationalSystem = platform();
const nmap = {
  nmapLocation: operationalSystem === 'linux' ? 'nmap' : 'nmap.exe',
  NmapScan,
};

export default nmap;
