/* eslint-disable @typescript-eslint/no-unused-expressions */
import xml2js from 'xml2js';
import { EventEmitter } from 'events';
import { spawn } from 'child_process';
import { ITcpScan } from './types/scan-network.types';

function convertRawJsonToScanResults(xmlInput: ITcpScan) {
  const hostT = xmlInput.nmaprun.host.map((host, index) => {
    const target = {
      address: host.address[index].$.addr,
      hostName: host.hostnames[index].hostname[0].$.name,
      port: host.ports.map((p, idx: number) => {
        return p.port.map((s) => {
          return {
            number: p.port[idx].$.portid,
            protocol: p.port[idx].$.protocol,
            service: s.service[idx].$.name,
            product: s.service[idx].$.product,
            deviceType: s.service[idx].$.devicetype,
            osType: s.service[idx].$.ostype,
            extraInfo: s.service[idx].$.extrainfo,
          };
        });
      }),
    };
    return target;
  });

  return hostT;
}

class NmapScan extends EventEmitter {
  command: string[];

  nmapOutputXML: string;

  range: string;

  arguments: string[];

  rawData: string;

  rawJSON: any;

  child: any;

  cancelled: boolean;

  scanTime: number;

  error: null;

  timer: any;

  scanResults: any;

  scanTimeout: number;

  constructor(range: string, args: string) {
    super();
    this.command = [];
    this.nmapOutputXML = '';
    this.timer;
    this.range = '';
    this.arguments = ['-oX', '-'];
    this.rawData = '';
    this.rawJSON;
    this.child;
    this.cancelled = false;
    this.scanTime = 0;
    this.error = null;
    this.scanResults;
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

  initializeChildProcess() {
    this.startTimer();
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    this.child = spawn(nmap.nmapLocation, this.command);

    process.on('SIGINT', this.killChild);
    process.on('uncaughtException', this.killChild);
    process.on('exit', this.killChild);
    this.child.stdout.on('data', (data: string) => {
      if (data.indexOf('percent') > -1) {
        // console.log(data.toString());
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

    this.child.stderr.on('data', (err: any) => {
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

  rawDataHandler(data: any) {
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
const nmap = {
  nmapLocation: 'nmap',
  NmapScan,
  // QuickScan,
  // OsAndPortScan,
  // QueuedScan,
  // QueuedNmapScan,
  // QueuedQuickScan,
  // QueuedOsAndPortScan
};

export default nmap;
