export const isElectron = () => {
  // Renderer process
  if (
    typeof window !== 'undefined' &&
    typeof window.process === 'object' &&
    window.process.type === 'renderer'
  ) {
    return true;
  }

  // Main process
  if (
    typeof process !== 'undefined' &&
    typeof process.versions === 'object' &&
    !!process.versions.electron
  ) {
    return true;
  }

  // Detect the user agent when the `nodeIntegration` option is set to true
  if (
    typeof navigator === 'object' &&
    typeof navigator.userAgent === 'string' &&
    navigator.userAgent.indexOf('Electron') >= 0
  ) {
    return true;
  }

  return false;
};

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
export const FROM_0001_TO_100_REGEX: RegExp =
  /^(100(\.0{1,3})?|([0-9]{1,2})(\.[0-9]{1,3})?|(0\.[0-9]{2,3}))$/;
export const FROM_1_TO_10_REGEX: RegExp = /^(10|[1-9])$/;
export const FROM_1_TO_9999_REGEX: RegExp = /^(9999|[1-9][0-9]{0,3})$/;
