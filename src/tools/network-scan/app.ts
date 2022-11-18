import nmap from './nmapScan.class';

async function hookSend(range: string, args: string) {
  const scan = new nmap.NmapScan(range, args);
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
  console.log(range, args);
}
export default hookSend;
