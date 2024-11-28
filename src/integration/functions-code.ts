import {
  FROM_1_TO_60_REGEX,
  FROM_1_TO_2K_REGEX,
  FROM_1_TO_10K_REGEX,
  FROM_1_TO_3K_REGEX,
  FROM_1_TO_18K_REGEX,
  FROM_0001_TO_100_REGEX,
  FROM_1_TO_10_REGEX,
  FROM_1_TO_9999_REGEX,
} from 'utils/constants';
import { auxActionParamsCode } from 'pages/Contour/interface';

export const actionParams: auxActionParamsCode[] = [
  {
    actionCode: 'M3',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M4',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M11',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_60_REGEX,
      },
    ],
  },
  {
    actionCode: 'M13',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M14',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M31',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_60_REGEX,
      },
    ],
  },
  {
    actionCode: 'M37',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_60_REGEX,
      },
    ],
  },
  {
    actionCode: 'M51',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_10K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M57',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_60_REGEX,
      },
    ],
  },
  {
    actionCode: 'M103',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M104',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M111',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_3K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M112',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_18K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M113',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M114',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_2K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M131',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_18K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M151',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_10K_REGEX,
      },
    ],
  },
  {
    actionCode: 'M218',
    actionParams: [
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_10K_REGEX,
      },
    ],
  },
  {
    actionCode: 'G2',
    actionParams: [
      {
        id: 'R',
        value: '',
        validation: FROM_0001_TO_100_REGEX,
      },
    ],
  },
  {
    actionCode: 'G3',
    actionParams: [
      {
        id: 'R',
        value: '',
        validation: FROM_0001_TO_100_REGEX,
      },
    ],
  },
  {
    actionCode: 'G4.1',
    actionParams: [
      {
        id: 'P1',
        value: '',
        validation: null,
      },
    ],
  },
  {
    actionCode: 'G31',
    actionParams: [
      {
        id: 'P',
        value: '',
        validation: FROM_1_TO_10_REGEX,
      },
    ],
  },
  {
    actionCode: 'G65',
    actionParams: [
      {
        id: 'P',
        value: '',
        validation: FROM_1_TO_9999_REGEX,
      },
    ],
  },
  // test case
  {
    actionCode: 'G121',
    actionParams: [
      {
        id: 'A',
        value: '',
        validation: FROM_1_TO_9999_REGEX,
      },
      {
        id: 'M',
        value: '',
        validation: FROM_1_TO_9999_REGEX,
      },
      {
        id: 'S',
        value: '',
        validation: FROM_1_TO_9999_REGEX,
      },
    ],
  },
];
