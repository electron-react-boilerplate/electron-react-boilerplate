import { mountGCodeWithProgramNumber } from 'integration/mount-gcode';
import { Part, ContourItem } from 'types/part';

function getContourNameByProgramCode(
  part: Part,
  programCode: number,
): string | null {
  const contour = part.contours.find((contourItem: ContourItem) => {
    const generatedCode = mountGCodeWithProgramNumber(contourItem, programCode);
    return generatedCode.includes(`O${programCode}`);
  });

  return contour ? contour.name : null;
}

export { getContourNameByProgramCode };
