export interface auxActionParams {
  param1Id: string;
  param1Value: string | null;
  param1Validation: RegExp | null;
  param2Id: string;
  param2Value: string | null;
  param2Validation: RegExp | null;
  param3Id: string;
  param3Value: string | null;
  param3Validation: RegExp | null;
}

export interface auxActionParamsCode extends auxActionParams {
  actionCode: string;
}
