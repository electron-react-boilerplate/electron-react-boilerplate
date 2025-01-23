import { ContourItem, ActivitiyItem, Part, OperationItem } from 'types/part';
import { GetToolsResponseData } from 'types/api';

const macroRef = 'G65 P7001';

function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function mountGCodeLine(
  activity: ActivitiyItem,
  index: number,
  isLastLine: boolean,
): string {
  const n = index + 1;
  const a = activity.actionCode ? `${activity.actionCode} ` : 'G01 G90 ';
  const nHeaderJumpValue = n + 6;

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
  let gCodeLine = `N00${nHeaderJumpValue * 10} ${a}${adtParams}\n`;

  if (isLastLine)
    gCodeLine = `${gCodeLine}N00${(nHeaderJumpValue + 1) * 10} M99`;

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

  let gCodeOutput = '';
  const toolIdLine = `N0010 #50001=${toolId}\n`;
  const toolTypeLine = `N0020 #${toolVar}0=${toolType}\n`;
  const bAxisAngleLine = `N0030 #${toolVar}1=${bAxisAngleValue}\n`;
  const xSafetyDistanceLine = `N0040 #${toolVar}2=${xSafetyDistanceValue}\n`;
  const zSafetyDistanceLine = `N0050 #${toolVar}3=${zSafetyDistanceValue}\n`;
  const macroRefLine = `N0060 ${macroRef}\n`;

  contour.activities.forEach((element: any, index: any) => {
    const isLastLine = contour.activities.length === index + 1;
    gCodeOutput = `${gCodeOutput}${mountGCodeLine(element, index, isLastLine)}`;
  });
  gCodeOutput = `${toolIdLine}${toolTypeLine}${bAxisAngleLine}${xSafetyDistanceLine}${zSafetyDistanceLine}${macroRefLine}${gCodeOutput}\n`;

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
  loadedTools: GetToolsResponseData,
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
      loadedTools[toolId - 1].value,
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
