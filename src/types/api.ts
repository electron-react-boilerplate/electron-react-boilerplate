//  Response data types for the API
export interface ResponseDataItem {
  programCode: string;
  result: string;
  resultDescription: string;
}

export interface ResponseData extends Array<ResponseDataItem> {}

export interface Response {
  statusCode: number;
  message: string;
  data?: ResponseData;
}

//  Request data types for the API
export interface Network {
  ip: string;
  port: number;
}

export interface Cnc {
  delRangeStart: number;
  delRangeEnd: number;
}

export interface Config {
  network: Network;
  cnc: Cnc;
}

export interface Request {
  network: Network;
  cnc: Cnc;
  programs: string[];
}
