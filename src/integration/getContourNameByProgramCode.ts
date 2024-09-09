function getContourNameByProgramCode(
  lastGeneratedCodes: string[],
  programCode: string,
): string | null {
  const codeFound = lastGeneratedCodes.find((c) =>
    c.startsWith(`\n${programCode}`),
  );
  if (codeFound) {
    const getNameRegEx = /\((?:[^()]*|\((?:[^()]*|\([^()]*\))*\))*\)/;
    const match = codeFound.match(getNameRegEx);
    if (match) return match[0].slice(1, -1);
  }
  return null;
}

export { getContourNameByProgramCode };
