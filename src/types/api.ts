export interface ResponseDataItem {
  programCode: string;
  result: string; // specify string results
  resultDescription: string;
}

export interface ResponseData extends Array<ResponseDataItem> {}

export interface Response {
  statusCode: number;
  message: string;
  data?: ResponseData;
}
