export interface auxActionParams {
  aParamId: string;
  aParamValue: string | null;
  aParamValidation: RegExp | null;
  bParamId: string;
  bParamValue: string | null;
  bParamValidation: RegExp | null;
  cParamId: string;
  cParamValue: string | null;
  cParamValidation: RegExp | null;
}

export interface auxActionParamsCode extends auxActionParams {
  actionCode: string;
}
