export interface ITcpScanResponse {
  address: string;
  hostName: string;
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
