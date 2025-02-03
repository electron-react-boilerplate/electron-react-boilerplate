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
  tool1fixedDiamondQtd: number;
  tool1refractableDiamondQtd: number;
  tool1dressingDiscQtd: number;
  tool1fixedDressingRollerQtd: number;
  tool1sCtrlMovableDressingRollerQtd: number;
  tool2Var: number;
  tool2fixedDiamondQtd: number;
  tool2refractableDiamondQtd: number;
  tool2dressingDiscQtd: number;
  tool2fixedDressingRollerQtd: number;
  tool2sCtrlMovableDressingRollerQtd: number;
  tool3Var: number;
  tool3fixedDiamondQtd: number;
  tool3refractableDiamondQtd: number;
  tool3dressingDiscQtd: number;
  tool3fixedDressingRollerQtd: number;
  tool3sCtrlMovableDressingRollerQtd: number;
  tool4Var: number;
  tool4fixedDiamondQtd: number;
  tool4refractableDiamondQtd: number;
  tool4dressingDiscQtd: number;
  tool4fixedDressingRollerQtd: number;
  tool4sCtrlMovableDressingRollerQtd: number;
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
