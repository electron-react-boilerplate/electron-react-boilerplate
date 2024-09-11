import { ContourItem, ActivitiyItem, Part, OperationItem } from 'types/part';

function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Some string have right blank spaces that are required for CNC syntax
const isRapidMovement = (fvalue: string | undefined): string =>
  fvalue ? 'G01 ' : 'G00 ';

function mountGCodeLine(
  activity: ActivitiyItem,
  index: number,
  isLastLine: boolean,
): string {
  const n = index + 1;
  const rm = isRapidMovement(activity.fvalue);
  const x = activity.xaxis ? `X${activity.xaxis} ` : '';
  const z = activity.zaxis ? `Z${activity.zaxis} ` : '';
  const f = activity.fvalue ? `F${activity.fvalue} ` : '';
  const a = activity.actionCode ? `${activity.actionCode} ` : '';
  const aParam = activity.aParamValue
    ? `${activity.aParamId}${activity.aParamValue} `
    : '';
  const bParam = activity.bParamValue
    ? `${activity.bParamId}${activity.bParamValue} `
    : '';
  const cParam = activity.cParamValue
    ? `${activity.cParamId}${activity.cParamValue} `
    : '';
  let gCodeLine = `N00${
    n * 10
  } G90 ${rm}${x}${z}${f}${a}${aParam}${bParam}${cParam}\n`;

  if (isLastLine) gCodeLine = `${gCodeLine}N00${(n + 1) * 10} M99`;

  return gCodeLine;
}

function mountGCode(contour: ContourItem) {
  let gCodeOutput: String = '';
  let gCodeTemplate: String = '';

  contour.activities.forEach((element: any, index: any) => {
    const isLastLine = contour.activities.length === index + 1;
    gCodeOutput = `${gCodeOutput}${mountGCodeLine(element, index, isLastLine)}`;
  });
  gCodeOutput = `${gCodeOutput}\n`;
  gCodeTemplate = `(${removeAccents(contour.name)})\n${gCodeOutput}%`;

  return gCodeTemplate;
}

function mountGCodeWithProgramNumber(
  contour: ContourItem,
  programNumber: number,
): string {
  let gCodeOutput = '';
  let gCodeTemplate = '';

  contour.activities.forEach((element: any, index: any) => {
    const isLastLine = contour.activities.length === index + 1;
    gCodeOutput = `${gCodeOutput}${mountGCodeLine(element, index, isLastLine)}`;
  });
  gCodeOutput = `${gCodeOutput}\n`;
  gCodeTemplate = `\nO${programNumber}(${removeAccents(
    contour.name,
  )})\n${gCodeOutput}%`;

  return gCodeTemplate;
}

function generateGCodeForPart(part: Part): string[] {
  let programNumber = 1000;
  const gCodeStrings: string[] = [];
  const usedProgramNumbers: Set<number> = new Set();

  // Ordenar contoursIds em todas as operações
  const sortedContoursIds: number[] = [];
  part.operations.forEach((operation: OperationItem) => {
    operation.contoursIds.forEach((contourId) => {
      sortedContoursIds.push(contourId);
    });
  });

  sortedContoursIds.sort((a, b) => a - b); // Ordenar numericamente

  // Gerar GCode para cada contorno
  sortedContoursIds.forEach((contourId) => {
    const contour = part.contours.find((c) => c.id === contourId);
    if (contour) {
      while (usedProgramNumbers.has(programNumber)) {
        programNumber += 1;
      }
      const gCode = mountGCodeWithProgramNumber(contour, programNumber);
      gCodeStrings.push(gCode);
      usedProgramNumbers.add(programNumber);
      programNumber += 1;
    }
  });

  return gCodeStrings;
}

export { mountGCode, generateGCodeForPart, mountGCodeWithProgramNumber };
