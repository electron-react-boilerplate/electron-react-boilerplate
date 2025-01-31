//  Response data types for the API
export interface ResponseDataItem {
  programCode: string;
  result: string;
  resultDescription: string;
}

export interface GetToolsResponseDataItem {
  code: number;
  value: number;
}

export interface ResponseData extends Array<ResponseDataItem> {}

export interface GetToolsResponseData extends Array<GetToolsResponseDataItem> {}

export interface Response {
  statusCode: number;
  message: string;
  data?: ResponseData;
}

export interface GetToolsResponse {
  statusCode: number;
  message: string;
  data?: GetToolsResponseData;
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

export interface DressingQtdVars {
  fixedDiamond: number;
  refractableDiamond: number;
  dressingDisc: number;
  fixedDressingRoller: number;
  sCtrlMovableDressingRoller: number;
}

export interface Tools {
  tool1Var: number;
  tool1fixedDiamond: number;
  tool1refractableDiamond: number;
  tool1dressingDisc: number;
  tool1fixedDressingRoller: number;
  tool1sCtrlMovableDressingRoller: number;
  tool2Var: number;
  tool2fixedDiamond: number;
  tool2refractableDiamond: number;
  tool2dressingDisc: number;
  tool2fixedDressingRoller: number;
  tool2sCtrlMovableDressingRoller: number;
  tool3Var: number;
  tool3fixedDiamond: number;
  tool3refractableDiamond: number;
  tool3dressingDisc: number;
  tool3fixedDressingRoller: number;
  tool3sCtrlMovableDressingRoller: number;
  tool4Var: number;
  tool4fixedDiamond: number;
  tool4refractableDiamond: number;
  tool4dressingDisc: number;
  tool4fixedDressingRoller: number;
  tool4sCtrlMovableDressingRoller: number;
}

export interface Config {
  network: Network;
  cnc: Cnc;
  tools: Tools;
}

// Requests
export interface Request {
  network: Network;
  cnc: Cnc;
  programs: string[];
}

export interface GetToolsRequest {
  network: Network;
  pCodeAddresses: number[];
}
