import nmap from './nmapScan.class';

const { NmapScan } = nmap;
export default class QuickScan extends NmapScan {
  constructor(range: string) {
    super(range, '-sP');
  }
}
