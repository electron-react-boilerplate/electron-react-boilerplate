import { ContourItem, ActivitiyItem } from 'types/part';

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
  gCodeTemplate = `%\n7000(${contour.name})\n${gCodeOutput}%`;

  return gCodeTemplate;
}

export { mountGCode };
