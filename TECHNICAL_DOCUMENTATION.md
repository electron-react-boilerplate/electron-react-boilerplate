1. MAIN BOX LAYOUT (Base Layout Foundation)
Box Dimensions:

const PAGE_WIDTH =17*72;
const PAGE_HEIGHT = 11*72;

const boxX = this.LABEL + this.SAFE;  // 20 + 6 = 26 points from left
const boxY = this.LABEL + this.SAFE;  // 20 + 6 = 26 points from top
const boxW = this.PAGE_WIDTH - 2 * (this.LABEL + this.SAFE);  // 17" - 2×26pts
const boxH = this.PAGE_HEIGHT - 2 * (this.LABEL + this.SAFE); // 11" - 2×26pts


THREE VERTICAL LINES (Column Dividers)

const LINE_X = [
  1.25 * this.INCH,   // Line 1: 90pts  (LEFT boundary)
  8.75 * this.INCH,   // Line 2: 630pts (CENTER divider)
  16.375 * this.INCH  // Line 3: 1179pts (RIGHT boundary)
];


Line 1 (1.25"): LEFT column starts here → RTR-01 and special systems
Line 2 (8.75"): CENTER divider → separates left from right column
Line 3 (16.375"): RIGHT column ends here → boundary for regular systems


Component Layout (Left to Right):

|← COMPONENT_START_SPACING (0.1") →|
|← Input Bubble (1.7") →|← CONNECTOR_LINE (0.15") →|
|← Cable ID (0.625") →|← CONNECTOR_LINE (0.15") →|
|← System Block (1.5") →|← CONNECTOR_LINE (0.15") →|
|← Cable ID (0.625") →|← CONNECTOR_LINE (0.15") →|
|← Output Bubble (1.7") →|

