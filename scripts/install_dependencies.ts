import { platform } from 'os';
import { exec } from 'child_process';

const operationalSystem = platform();

if (operationalSystem === 'win32') {
  exec('powershell.exe Get-Package', (err, stdout, sterr) => {
    if (err) {
      console.error(`exec search error: ${err}`);
    }
    if (stdout.includes('Nmap')) {
      console.log(`Already has all required dependecies.`);
    } else {
      exec('winget install -e --id Insecure.Nmap', (error, std, ste) => {
        if (error) {
          console.error(`exec install error ${error}`);
        }
        console.log('INSTALLING', std);
      });
    }
  });
} else {
  exec('bash scripts/install_dependencies.sh', (err, stdout, stderr) => {
    if (err) {
      console.error(`bash exec error: ${err}`);
      return;
    }
    console.log(`bash exec ${stdout}`);
  });
}
