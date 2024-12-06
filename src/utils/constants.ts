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

// Integration RegExp
export const XZ_REGEX: RegExp = /^\d{0,4}(\.\d{0,4})?$/; // precisa aceitar decimal, duvida: deveria aceitar valor negativo?
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
  /^(100(\.0{0,3})?|([0-9]{1,2})(\.[0-9]{0,3})?|(0\.[0-9]{2,3}))$/;
export const FROM_1_TO_10_REGEX: RegExp = /^(10|[1-9])$/;
export const FROM_1_TO_9999_REGEX: RegExp = /^(9999|[1-9][0-9]{0,3})$/;
export const FROM_1_TO_9999_9999_REGEX: RegExp =
  /^-?(?:[1-9]\d{0,3}|0)?(?:\.\d{0,4})?$/;
export const FROM_0_001_TO_9999_REGEX: RegExp =
  /^(0\.\d{1,3}|[1-9]\d{0,3}(\.\d{0,3})?)$/;
export const FROM_0_001_TO_2_REGEX: RegExp =
  /^(0(\.\d{1,3})?|0\.|1(\.\d{0,3})?|1\.|2(\.0{0,3})?|2\.)$/;
export const FROM_0_1_TO_3000_REGEX: RegExp =
  /^(0|0\.[1-9]|[1-9]\d{0,2}(\.\d{0,1})?|3000(\.0)?|0\.)$/;
export const FROM_0_TO_2_REGEX: RegExp = /^(0|1|2)$/;
export const FROM_0_TO_999_REGEX: RegExp = /^(0|[1-9]\d{0,2})$/;
export const FROM_0_TO_999_DEC_REGEX: RegExp =
  /^(0|0\.|[1-9]\d{0,2}(\.\d{0,3})?|[1-9]\d{0,2}\.)$/;
export const FROM_NEG1_0_TO_0_REGEX: RegExp =
  /^(-1(\.0)?|-0(\.\d{0,3})?|-0\.|0(\.\d{0,3})?|0\.|1(\.0)?|1\.)$/;
export const FROM_0_TO_360_REGEX: RegExp =
  /^(0|[1-9]\d?|[12]\d{2}|3[0-5]\d|360)$/;
export const FROM_0_TO_60_REGEX: RegExp = /^(0|[1-5]?\d|60)$/;
export const FROM_NEG10_TO_10_REGEX: RegExp =
  /^(-10(\.0{0,3})?|-\d(\.\d{0,3})?|-?\d(\.\d{0,3})?|0(\.\d{0,3})?|10(\.0{0,3})?|10\.)$/;
export const FROM_1_TO_999_999_REGEX: RegExp =
  /^(0\.\d{1,3}|[1-9]\d{0,2}(\.\d{1,3})?|[1-9]\d{0,2}\.)$/;
export const ONLY_1_REGEX: RegExp = /^1$/; // unificar
export const ONLY_2_REGEX: RegExp = /^2$/; // unificar
export const ONLY_3_REGEX: RegExp = /^3$/; // unificar
export const ONLY_4_REGEX: RegExp = /^4$/; // unificar
export const FROM_1_TO_4_REGEX: RegExp = /^[1-4]$/;
export const FROM_0_001_TO_6_REGEX: RegExp =
  /^(0(\.\d{1,3})?|0\.|[1-5](\.\d{1,3})?|[1-5]\.|6(\.0{0,3})?|6\.)$/;
export const FROM_1_TO_2_REGEX: RegExp = /^(1|2)$/;
export const FROM_0_001_TO_999_999_REGEX: RegExp =
  /^(0(\.\d{1,3})?|0\.|[1-9]\d{0,2}(\.\d{0,3})?|[1-9]\d{0,2}\.)$/;

// Other Regex
export const getProgramNameFromGeratedCode =
  /\((?:[^()]*|\((?:[^()]*|\([^()]*\))*\))*\)/;
export const validateIp =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
