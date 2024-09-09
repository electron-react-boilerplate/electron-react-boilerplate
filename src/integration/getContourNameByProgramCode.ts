function getContourNameByProgramCode(
  lastGeneratedCodes: string[],
  programCode: string,
): string | null {
  const codeFound = lastGeneratedCodes.find((c) =>
    c.startsWith(`\n${programCode}`),
  );
  if (codeFound) {
    const match = codeFound.match(/\(([^)]+)\)/);
    return match ? match[1] : null;
  }
  return null;
}

export { getContourNameByProgramCode };
