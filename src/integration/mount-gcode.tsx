import { ContourItem, ActivitiyItem, Part, OperationItem } from 'types/part';
import {
  MACHINING_DRESSING,
  MACHINING_GRINDING,
  TYPE_EXTERNAL,
  TYPE_INTERNAL,
} from 'utils/constants';
import { ToolOptions } from 'components/Select/interface';

const macroRef = 'G65 P7001';

function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function mountGCodeLine(
  activity: ActivitiyItem,
  isLastLine: boolean,
  incrementLineNumber: () => string,
): string {
  const a = activity.actionCode ? `${activity.actionCode} ` : 'G01 G90 ';

  const adtParams = activity.actionParams
    .map((param) => `adtParam${param.id}`)
    .filter(
      (key) =>
        key in activity &&
        activity[key as keyof ActivitiyItem] !== '' &&
        activity[key as keyof ActivitiyItem] !== undefined,
    )
    .map((key) => {
      const paramValue = activity[key as keyof ActivitiyItem];
      const paramId = key.replace('adtParam', '');
      if (/^M\d+$/.test(paramId)) {
        return `M${paramValue} `;
      }
      return `${paramId}${paramValue} `;
    })
    .join('');

  let gCodeLine = `N${incrementLineNumber()} ${a}${adtParams}\n`;

  if (isLastLine) gCodeLine = `${gCodeLine}N${incrementLineNumber()} M99`;

  return gCodeLine;
}

function generateLines(
  contour: ContourItem,
  toolId?: number,
  toolType?: number,
  bAxisAngleValue?: number,
  xSafetyDistanceValue?: number,
  zSafetyDistanceValue?: number,
): string {
  let toolVar: string = '5X00';
  if (toolId === 1) toolVar = '5100';
  if (toolId === 2) toolVar = '5200';
  if (toolId === 3) toolVar = '5300';
  if (toolId === 4) toolVar = '5400';

  let lineNumber = 10;
  const incrementLineNumber = () => {
    const currentLineNumber = lineNumber;
    lineNumber += 10;
    return currentLineNumber.toString().padStart(4, '0');
  };

  const jobValue: number | null = (() => {
    if (
      contour.machining === MACHINING_GRINDING &&
      contour.type === TYPE_EXTERNAL
    )
      return 1;
    if (
      contour.machining === MACHINING_DRESSING &&
      contour.type === TYPE_EXTERNAL
    )
      return 2;
    if (
      contour.machining === MACHINING_GRINDING &&
      contour.type === TYPE_INTERNAL
    )
      return 3;
    if (
      contour.machining === MACHINING_DRESSING &&
      contour.type === TYPE_INTERNAL
    )
      return 4;
    return 0;
  })();

  const toolIdLine = toolId
    ? `N${incrementLineNumber()} #50001=${toolId}\n`
    : '';
  const toolTypeLine = toolType
    ? `N${incrementLineNumber()} #${toolVar}0=${toolType}\n`
    : '';
  // jobLine refers to if it is a grinding OD/ID or dressing OD/ID operation
  const jobLine = jobValue
    ? `N${incrementLineNumber()} #50002=${jobValue}\n`
    : '';
  const bAxisAngleLine = bAxisAngleValue
    ? `N${incrementLineNumber()} #${toolVar}1=${bAxisAngleValue}\n`
    : '';
  const xSafetyDistanceLine = xSafetyDistanceValue
    ? `N${incrementLineNumber()} #${toolVar}2=${xSafetyDistanceValue}\n`
    : '';
  const zSafetyDistanceLine = zSafetyDistanceValue
    ? `N${incrementLineNumber()} #${toolVar}3=${zSafetyDistanceValue}\n`
    : '';
  const macroRefLine = macroRef
    ? `N${incrementLineNumber()} ${macroRef}\n`
    : '';

  let gCodeOutput = '';
  contour.activities.forEach((element: any, index: any) => {
    const isLastLine = contour.activities.length === index + 1;
    gCodeOutput = `${gCodeOutput}${mountGCodeLine(
      element,
      isLastLine,
      incrementLineNumber,
    )}`;
  });
  gCodeOutput = `${toolIdLine}${jobLine}${toolTypeLine}${bAxisAngleLine}${xSafetyDistanceLine}${zSafetyDistanceLine}${macroRefLine}${gCodeOutput}\n`;

  return gCodeOutput;
}

function mountGCode(contour: ContourItem): string {
  const gCodeOutput = generateLines(contour);
  const gCodeTemplate = `(${removeAccents(contour.name)})\n${gCodeOutput}%`;

  return gCodeTemplate;
}

function mountGCodeWithProgramNumber(
  contour: ContourItem,
  programNumber: number,
  toolId: number,
  toolType: number,
  bAxisAngleValue: number,
  xSafetyDistanceValue: number,
  zSafetyDistanceValue: number,
): string {
  const gCodeOutput = generateLines(
    contour,
    toolId,
    toolType,
    bAxisAngleValue,
    xSafetyDistanceValue,
    zSafetyDistanceValue,
  );
  const gCodeTemplate = `\nO${programNumber}(${removeAccents(
    contour.name,
  )})\n${gCodeOutput}%`;

  return gCodeTemplate;
}

const orderedContours = (part: Part): ContourItem[] => {
  return part.operations
    .flatMap((operation) =>
      operation.contoursIds.filter(
        (contourId) => !operation.contoursIdsExcluded?.includes(contourId),
      ),
    )
    .map((contourId) =>
      part.contours.find((contour) => contour.id === contourId),
    )
    .filter((contour) => contour !== undefined) as ContourItem[];
};

/* This function will return an error in case contourId is not found at operations,
since it will only happen if used in wrong context, it will be thrown so the developer can fix it. */
function getOperationData<T>(
  part: Part,
  contourId: number,
  callback: (operation: OperationItem) => T,
): T {
  const operation: OperationItem | undefined = part.operations.find((op) =>
    op.contoursIds.includes(contourId),
  );
  if (!operation) {
    throw new Error(`Operation not found for contourId: ${contourId}`);
  }
  return callback(operation);
}

function generateGCodeForPart(
  part: Part,
  rangeStart: number,
  formattedTools: ToolOptions,
): string[] {
  const gCodeStrings: string[] = [];

  orderedContours(part).forEach((contour: ContourItem, index: number) => {
    const toolId = getOperationData(
      part,
      contour.id,
      (operation) => operation.toolId,
    );

    const gCode = mountGCodeWithProgramNumber(
      contour,
      Number(rangeStart) + index,
      toolId,
      Array.isArray(formattedTools)
        ? formattedTools.find((t) => t.id === toolId)?.value ?? 0
        : 0,
      getOperationData(part, contour.id, (operation) => operation.bAxisAngle),
      getOperationData(
        part,
        contour.id,
        (operation) => operation.xSafetyDistance,
      ),
      getOperationData(
        part,
        contour.id,
        (operation) => operation.zSafetyDistance,
      ),
    );
    gCodeStrings.push(gCode);
  });

  return gCodeStrings;
}

export {
  mountGCode,
  getOperationData,
  generateGCodeForPart,
  orderedContours,
  mountGCodeWithProgramNumber,
};
