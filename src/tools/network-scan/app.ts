import nmap from './scan-network';

const scan = new nmap.NmapScan('192.168.0.1', '-sV');
console.log('scan starting');
scan.on('complete', (data) => {
  console.log(JSON.stringify(data, null, 4));
  console.log(`total scan time ${scan.scanTime}`);
});

scan.on('error', (data) => {
  console.log(JSON.stringify(data, null, 2));
  console.log(`total scan time ${scan.scanTime}`);
});

scan.startScan();
