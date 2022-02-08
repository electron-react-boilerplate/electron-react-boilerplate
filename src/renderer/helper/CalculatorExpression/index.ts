/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */

export const calculatorExpressionEval = (s: string): number => {
  let expression = s;
  if (!new RegExp(`^[\\d\\+\\/\\*\\.\\- \\(\\)]*$`).test(expression)) return 0;
  if (s.length) {
    const ultimaCaractere = s[s.length - 1];
    if (!/\d/.test(ultimaCaractere)) expression = s.slice(0, -1);
  }
  try {
    const value = new Function(`return ${expression};`)() as number;
    return value ?? 0;
  } catch (error: any) {
    return 0;
  }
};
