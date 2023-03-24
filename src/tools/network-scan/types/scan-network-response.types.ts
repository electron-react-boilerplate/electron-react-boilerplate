export interface ITcpScanResponse {
  address: {
    addr: string;
    addrType: string;
  }[];
  hostName: {
    names: {
      name: string;
    }[];
  }[];
  ports: {
    number: string;
    protocol: string;
    state: string;
    deviceType: string;
    service: string;
    product: string;
    osType: string;
    extraInfo: string;
  }[][];
}
