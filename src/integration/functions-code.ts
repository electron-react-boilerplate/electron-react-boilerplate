import {
  FROM_1_TO_2K_REGEX,
  FROM_1_TO_10K_REGEX,
  FROM_0001_TO_100_REGEX,
  FROM_1_TO_10_REGEX,
  FROM_1_TO_9999_REGEX,
  FROM_0_001_TO_9999_REGEX,
  FROM_0_001_TO_2_REGEX,
  FROM_0_001_TO_3000_REGEX,
  FROM_0_TO_2_REGEX,
  FROM_0_TO_999_REGEX,
  FROM_0_TO_360_REGEX,
  FROM_0_TO_60_REGEX,
  FROM_NEG10_TO_10_REGEX,
  FROM_1_TO_999_999_REGEX,
  FROM_1_TO_9999_9999_REGEX,
  FROM_0_001_TO_999_999_REGEX,
  FROM_1_TO_2_REGEX,
  FROM_0_001_TO_6_REGEX,
  XZ_REGEX,
  FROM_NEG_1_TO_1_DEC_REGEX,
  FROM_0_TO_999_DEC_REGEX,
  FROM_1_TO_4_REGEX,
} from 'utils/constants';
import { auxActionParamsCode } from 'pages/Contour/interface';

export const actionParams: auxActionParamsCode[] = [
  {
    actionCode: 'M3',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M4',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M13',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M14',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M51',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_10K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M103',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M104',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M113',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M114',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M151',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_10K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M218',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_10K_REGEX,
      },
    ],
  },
  {
    actionCode: 'G01',
    actionParams: [
      {
        id: 'X',
        validation: XZ_REGEX,
      },
      {
        id: 'Z',
        validation: XZ_REGEX,
      },
      {
        id: 'F',
        validation: XZ_REGEX,
      },
      {
        id: 'M',
        validation: FROM_1_TO_2K_REGEX,
      },
      {
        id: 'M',
        validation: FROM_1_TO_2K_REGEX,
      },
      {
        id: 'M',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'G02',
    actionParams: [
      {
        id: 'X',
        validation: XZ_REGEX,
      },
      {
        id: 'Z',
        validation: XZ_REGEX,
      },
      {
        id: 'F',
        validation: XZ_REGEX,
      },
      {
        id: 'R',
        validation: FROM_0001_TO_100_REGEX,
      },
      {
        id: 'M',
        validation: FROM_1_TO_2K_REGEX,
      },
      {
        id: 'M',
        validation: FROM_1_TO_2K_REGEX,
      },
      {
        id: 'M',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'G03',
    actionParams: [
      {
        id: 'X',
        validation: XZ_REGEX,
      },
      {
        id: 'Z',
        validation: XZ_REGEX,
      },
      {
        id: 'F',
        validation: XZ_REGEX,
      },
      {
        id: 'R',
        validation: FROM_0001_TO_100_REGEX,
      },
      {
        id: 'M',
        validation: FROM_1_TO_2K_REGEX,
      },
      {
        id: 'M',
        validation: FROM_1_TO_2K_REGEX,
      },
      {
        id: 'M',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'G4.1',
    actionParams: [
      {
        id: 'P1',
        validation: XZ_REGEX,
      },
    ],
  },
  {
    actionCode: 'G31',
    actionParams: [
      {
        id: 'P',
        validation: FROM_1_TO_10_REGEX,
      },
    ],
  },
  {
    actionCode: 'G65',
    actionParams: [
      {
        id: 'P',
        validation: FROM_1_TO_9999_REGEX,
      },
    ],
  },
  {
    actionCode: 'G88',
    actionParams: [
      {
        id: 'X',
        validation: FROM_1_TO_9999_9999_REGEX,
      },
      {
        id: 'W',
        validation: FROM_0_001_TO_9999_REGEX,
      },
      {
        id: 'U',
        validation: FROM_0_001_TO_2_REGEX,
      },
      {
        id: 'F',
        validation: FROM_0_001_TO_3000_REGEX,
      },
      {
        id: 'C',
        validation: FROM_0_TO_2_REGEX,
      },
      {
        id: 'S',
        validation: FROM_0_TO_999_REGEX,
      },
      {
        id: 'H',
        validation: FROM_0_TO_999_DEC_REGEX,
      },
      {
        id: 'J',
        validation: FROM_NEG_1_TO_1_DEC_REGEX,
      },
    ],
  },
  {
    actionCode: 'G89',
    actionParams: [
      {
        id: 'X',
        validation: FROM_1_TO_9999_REGEX,
      },
      {
        id: 'W',
        validation: FROM_0_001_TO_9999_REGEX,
      },
      {
        id: 'U',
        validation: FROM_0_001_TO_2_REGEX,
      },
      {
        id: 'F',
        validation: FROM_0_001_TO_3000_REGEX,
      },
      {
        id: 'C',
        validation: FROM_0_TO_2_REGEX,
      },
      {
        id: 'S',
        validation: FROM_0_TO_999_REGEX,
      },
    ],
  },
  {
    actionCode: 'G120',
    actionParams: [
      {
        id: 'A',
        validation: FROM_0_TO_360_REGEX,
      },
    ],
  },
  {
    actionCode: 'G121',
    actionParams: [
      {
        id: 'A',
        validation: FROM_0_TO_360_REGEX,
      },
      {
        id: 'M',
        validation: FROM_0_TO_60_REGEX,
      },
      {
        id: 'S',
        validation: FROM_0_TO_60_REGEX,
      },
    ],
  },
  {
    actionCode: 'G130',
    actionParams: [
      {
        id: 'W',
        validation: FROM_NEG10_TO_10_REGEX,
      },
      {
        id: 'F',
        validation: FROM_1_TO_999_999_REGEX,
      },
    ],
  },
  {
    actionCode: 'G131',
    actionParams: [
      {
        id: 'W',
        validation: FROM_NEG10_TO_10_REGEX,
      },
    ],
  },
  {
    actionCode: 'G132',
    actionParams: [
      {
        id: 'X',
        validation: FROM_1_TO_9999_9999_REGEX,
      },
      {
        id: 'I',
        validation: FROM_1_TO_4_REGEX,
      },
      {
        id: 'F',
        validation: FROM_1_TO_999_999_REGEX,
      },
    ],
  },
  {
    actionCode: 'G133',
    actionParams: [
      {
        id: 'Z',
        validation: FROM_1_TO_9999_9999_REGEX,
      },
      {
        id: 'I',
        validation: FROM_1_TO_4_REGEX,
      },
      {
        id: 'F',
        validation: FROM_1_TO_999_999_REGEX,
      },
    ],
  },
  {
    actionCode: 'G134',
    actionParams: [
      {
        id: 'H',
        validation: FROM_0_001_TO_999_999_REGEX,
      },
      {
        id: 'E',
        validation: FROM_0_001_TO_6_REGEX,
      },
      {
        id: 'F',
        validation: FROM_1_TO_999_999_REGEX,
      },
    ],
  },
  {
    actionCode: 'G188',
    actionParams: [
      {
        id: 'W',
        validation: FROM_0_001_TO_999_999_REGEX,
      },
      {
        id: 'F',
        validation: FROM_0_001_TO_999_999_REGEX,
      },
    ],
  },
  {
    actionCode: 'G190',
    actionParams: [
      {
        id: 'U',
        validation: FROM_0_001_TO_999_999_REGEX,
      },
      {
        id: 'W',
        validation: FROM_0_001_TO_999_999_REGEX,
      },
      {
        id: 'C',
        validation: FROM_1_TO_2_REGEX,
      },
    ],
  },
];

const EXCLUDED_CODES = [
  'M11',
  'M31',
  'M37',
  'M57',
  'M111',
  'M112',
  'M131',
  'M3',
  'M4',
  'M13',
  'M14',
  'M51',
  'M151',
  'M218',
  'M0',
  'M1',
  'M2',
  'M30',
  'M96',
  'M97',
  'M98',
  'M99',
];

for (let i = 0; i <= 305; i += 1) {
  const code = `M${i}`;
  if (!EXCLUDED_CODES.includes(code)) {
    actionParams.push({
      actionCode: code,
      actionParams: [
        { id: 'M', validation: FROM_1_TO_2K_REGEX },
        { id: 'M', validation: FROM_1_TO_2K_REGEX },
        { id: 'M', validation: FROM_1_TO_2K_REGEX },
      ],
    });
  }
}
