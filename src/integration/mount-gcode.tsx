import { OperationItem, ActivitiyItem } from 'types/part';

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
  let gCodeLine = `N00${n * 10} G90 ${rm}${x}${z}${f}\n`;

  if (isLastLine) gCodeLine = `${gCodeLine}N00${(n + 1) * 10} M99`;

  return gCodeLine;
}

// Vai ter que mudar pra ao inves de receber um OperationItem receber um Part
function mountGCode(operation: OperationItem) {
  let gCodeOutput: String = '';
  let gCodeTemplate: String = '';

  operation.activities.forEach((element: any, index: any) => {
    const isLastLine = operation.activities.length === index + 1;
    gCodeOutput = `${gCodeOutput}${mountGCodeLine(element, index, isLastLine)}`;
  });
  gCodeOutput = `${gCodeOutput}\n`;
  gCodeTemplate = `%\n7000(Teste GZema)\n${gCodeOutput}%`;

  return gCodeTemplate;
}

export { mountGCode };
