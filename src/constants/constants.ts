export const XZ_REGEX: RegExp = /^\d{0,4}(\.\d{0,4})?$/;
export const MCODE_REGEX: RegExp =
  /^M([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-9]{2}|300|30[1-5])$/;
export const FROM_1_TO_60_REGEX: RegExp = /^(60|[1-5]?[0-9])$/;
export const FROM_1_TO_2K_REGEX: RegExp =
  /^(2000|1[0-9]{3}|[1-9][0-9]{0,2}|[1-9])$/;
export const FROM_1_TO_3K_REGEX: RegExp = /^(3000|[1-2]?[0-9]{1,3}|[1-9])$/;
export const FROM_1_TO_10K_REGEX: RegExp = /^(10000|[1-9][0-9]{0,3})$/;
export const FROM_1_TO_18K_REGEX: RegExp =
  /^(18000|1[0-7][0-9]{3}|[1-9][0-9]{0,3})$/;
