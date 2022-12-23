import nmap from './nmapScan.class';

const { NmapScan } = nmap;
export default class OsAndPortScan extends NmapScan {
  constructor(range: string) {
    super(range, '-O');
  }
}
