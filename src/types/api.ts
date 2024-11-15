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
  pmcAddress: number;
  pmcAddressBit: number;
}

export interface Tools {
  tool1Var: number;
  tool2Var: number;
  tool3Var: number;
  tool4Var: number;
}

export interface Config {
  network: Network;
  cnc: Cnc;
  tools: Tools;
}

export interface Request {
  network: Network;
  cnc: Cnc;
  programs: string[];
}

export interface GetToolsRequest {
  network: Network;
  pCodeAddresses: number[];
}
