import { getProgramNameFromGeratedCode } from 'utils/constants';

function getContourNameByProgramCode(
  lastGeneratedCodes: string[],
  programCode: string,
): string | null {
  const codeFound = lastGeneratedCodes.find((c) =>
    c.startsWith(`\n${programCode}`),
  );
  if (codeFound) {
    const match = codeFound.match(getProgramNameFromGeratedCode);
    if (match) return match[0].slice(1, -1);
  }
  return null;
}

export { getContourNameByProgramCode };
