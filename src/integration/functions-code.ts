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
  VALID_CHAIN_M_CODES_REGEX,
  FROM_0_001_TO_9999_9999_REGEX,
} from 'utils/constants';
import { auxActionParamsCode } from 'pages/Contour/interface';

export const actionParams: auxActionParamsCode[] = [
  {
    actionCode: 'M3',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_2K_REGEX,
        placeholder: 'Rotação',
      },
    ],
  },
  {
    actionCode: 'M4',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_2K_REGEX,
        placeholder: 'Rotação',
      },
    ],
  },
  {
    actionCode: 'M13',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_2K_REGEX,
        placeholder: 'Rotação',
      },
    ],
  },
  {
    actionCode: 'M14',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_2K_REGEX,
        placeholder: 'Rotação',
      },
    ],
  },
  {
    actionCode: 'M51',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_10K_REGEX,
        placeholder: 'Rotação',
      },
    ],
  },
  {
    actionCode: 'M103',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_2K_REGEX,
        placeholder: 'Rotação',
      },
    ],
  },
  {
    actionCode: 'M104',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_2K_REGEX,
        placeholder: 'Rotação',
      },
    ],
  },
  {
    actionCode: 'M113',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_2K_REGEX,
        placeholder: 'Rotação',
      },
    ],
  },
  {
    actionCode: 'M114',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_2K_REGEX,
        placeholder: 'Rotação',
      },
    ],
  },
  {
    actionCode: 'M151',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_10K_REGEX,
        placeholder: 'Rotação',
      },
    ],
  },
  {
    actionCode: 'M218',
    actionParams: [
      {
        id: 'S',
        validation: FROM_1_TO_10K_REGEX,
        placeholder: 'Rotação',
      },
    ],
  },
  {
    actionCode: 'G01',
    actionParams: [
      {
        id: 'X',
        validation: XZ_REGEX,
        placeholder: 'Eixo X',
      },
      {
        id: 'Z',
        validation: XZ_REGEX,
        placeholder: 'Eixo Z',
      },
      {
        id: 'F',
        validation: XZ_REGEX,
        placeholder: 'Velocidade',
      },
      {
        id: 'M1',
        fakeId: 'M',
        validation: VALID_CHAIN_M_CODES_REGEX,
        placeholder: 'Função M',
      },
      {
        id: 'M2',
        fakeId: 'M',
        validation: VALID_CHAIN_M_CODES_REGEX,
        placeholder: 'Função M',
      },
      {
        id: 'M3',
        fakeId: 'M',
        validation: VALID_CHAIN_M_CODES_REGEX,
        placeholder: 'Função M',
      },
    ],
  },
  {
    actionCode: 'G02',
    actionParams: [
      {
        id: 'X',
        validation: XZ_REGEX,
        placeholder: 'Eixo X',
      },
      {
        id: 'Z',
        validation: XZ_REGEX,
        placeholder: 'Eixo Z',
      },
      {
        id: 'F',
        validation: XZ_REGEX,
        placeholder: 'Velocidade',
      },
      {
        id: 'R',
        validation: FROM_0001_TO_100_REGEX,
        placeholder: 'Raio',
      },
      {
        id: 'M1',
        fakeId: 'M',
        validation: VALID_CHAIN_M_CODES_REGEX,
        placeholder: 'Função M',
      },
      {
        id: 'M2',
        fakeId: 'M',
        validation: VALID_CHAIN_M_CODES_REGEX,
        placeholder: 'Função M',
      },
      {
        id: 'M3',
        fakeId: 'M',
        validation: VALID_CHAIN_M_CODES_REGEX,
        placeholder: 'Função M',
      },
    ],
  },
  {
    actionCode: 'G03',
    actionParams: [
      {
        id: 'X',
        validation: XZ_REGEX,
        placeholder: 'Eixo X',
      },
      {
        id: 'Z',
        validation: XZ_REGEX,
        placeholder: 'Eixo Z',
      },
      {
        id: 'F',
        validation: XZ_REGEX,
        placeholder: 'Velocidade',
      },
      {
        id: 'R',
        validation: FROM_0001_TO_100_REGEX,
        placeholder: 'Raio',
      },
      {
        id: 'M1',
        fakeId: 'M',
        validation: VALID_CHAIN_M_CODES_REGEX,
        placeholder: 'Função M',
      },
      {
        id: 'M2',
        fakeId: 'M',
        validation: VALID_CHAIN_M_CODES_REGEX,
        placeholder: 'Função M',
      },
      {
        id: 'M3',
        fakeId: 'M',
        validation: VALID_CHAIN_M_CODES_REGEX,
        placeholder: 'Função M',
      },
    ],
  },
  {
    actionCode: 'G31',
    actionParams: [
      {
        id: 'P',
        validation: FROM_1_TO_10_REGEX,
        placeholder: 'Código P',
      },
    ],
  },
  {
    actionCode: 'G65',
    actionParams: [
      {
        id: 'P',
        validation: FROM_1_TO_9999_REGEX,
        placeholder: 'Código P',
      },
    ],
  },
  {
    actionCode: 'G88',
    actionParams: [
      {
        id: 'X',
        validation: FROM_1_TO_9999_9999_REGEX,
        placeholder: 'Diâmetro Final',
      },
      {
        id: 'W',
        validation: FROM_0_001_TO_9999_REGEX,
        placeholder: 'Comprimento de Passada',
      },
      {
        id: 'U',
        validation: FROM_0_001_TO_2_REGEX,
        placeholder: 'Incremento em X',
      },
      {
        id: 'F',
        validation: FROM_0_001_TO_3000_REGEX,
        placeholder: 'Velocidade',
      },
      {
        id: 'C',
        validation: FROM_0_TO_2_REGEX,
        placeholder: 'Incremento dos Dois Lados',
      },
      {
        id: 'S',
        validation: FROM_0_TO_999_REGEX,
        placeholder: 'Passadas em Vazio',
      },
      {
        id: 'H',
        validation: FROM_0_TO_999_DEC_REGEX,
        placeholder: 'Tempo para Furo Cego',
      },
      {
        id: 'J',
        validation: FROM_NEG_1_TO_1_DEC_REGEX,
        placeholder: 'Corretor Paralelo',
      },
    ],
  },
  {
    actionCode: 'G89',
    actionParams: [
      {
        id: 'X',
        validation: FROM_1_TO_9999_REGEX,
        placeholder: 'Diâmetro final',
      },
      {
        id: 'W',
        validation: FROM_0_001_TO_9999_REGEX,
        placeholder: 'Comprimento de Passada',
      },
      {
        id: 'U',
        validation: FROM_0_001_TO_2_REGEX,
        placeholder: 'Incremento em X',
      },
      {
        id: 'F',
        validation: FROM_0_001_TO_3000_REGEX,
        placeholder: 'Velocidade',
      },
      {
        id: 'C',
        validation: FROM_0_TO_2_REGEX,
        placeholder: 'Incremento dos Dois Lados',
      },
      {
        id: 'S',
        validation: FROM_0_TO_999_REGEX,
        placeholder: 'Passadas em Vazio',
      },
    ],
  },
  {
    actionCode: 'G120',
    actionParams: [
      {
        id: 'A',
        validation: FROM_0_TO_360_REGEX,
        placeholder: 'Ângulo (Graus)',
      },
    ],
  },
  {
    actionCode: 'G121',
    actionParams: [
      {
        id: 'A',
        validation: FROM_0_TO_360_REGEX,
        placeholder: 'Ângulo (Graus)',
      },
      {
        id: 'M',
        validation: FROM_0_TO_60_REGEX,
        placeholder: 'Ângulo (Minutos)',
      },
      {
        id: 'S',
        validation: FROM_0_TO_60_REGEX,
        placeholder: 'Ângulo (Segundos)',
      },
    ],
  },
  {
    actionCode: 'G130',
    actionParams: [
      {
        id: 'W',
        validation: FROM_NEG10_TO_10_REGEX,
        placeholder: 'Afastamento em Z',
      },
      {
        id: 'F',
        validation: FROM_0_001_TO_9999_9999_REGEX,
        placeholder: 'Velocidade',
      },
    ],
  },
  {
    actionCode: 'G131',
    actionParams: [
      {
        id: 'W',
        validation: FROM_NEG10_TO_10_REGEX,
        placeholder: 'Afastamento em Z',
      },
    ],
  },
  {
    actionCode: 'G132',
    actionParams: [
      {
        id: 'X',
        validation: FROM_1_TO_9999_9999_REGEX,
        placeholder: 'Diâmetro Final',
      },
      {
        id: 'I',
        validation: FROM_1_TO_4_REGEX,
        placeholder: 'Sinal do Medidor',
      },
      {
        id: 'F',
        validation: FROM_0_001_TO_9999_9999_REGEX,
        placeholder: 'Velocidade',
      },
    ],
  },
  {
    actionCode: 'G133',
    actionParams: [
      {
        id: 'Z',
        validation: FROM_1_TO_9999_9999_REGEX,
        placeholder: 'Distância Final',
      },
      {
        id: 'I',
        validation: FROM_1_TO_4_REGEX,
        placeholder: 'Sinal do Medidor',
      },
      {
        id: 'F',
        validation: FROM_0_001_TO_9999_9999_REGEX,
        placeholder: 'Velocidade',
      },
    ],
  },
  {
    actionCode: 'G134',
    actionParams: [
      {
        id: 'H',
        validation: FROM_0_001_TO_999_999_REGEX,
        placeholder: 'Comprimento da Rosca',
      },
      {
        id: 'E',
        validation: FROM_0_001_TO_6_REGEX,
        placeholder: 'Passo da Rosca',
      },
      {
        id: 'F',
        validation: FROM_0_001_TO_9999_9999_REGEX,
        placeholder: 'Velocidade',
      },
    ],
  },
  {
    actionCode: 'G137',
    actionParams: [
      {
        id: 'T',
        validation: FROM_0_001_TO_9999_REGEX,
        placeholder: 'Movim. ABS do CCP',
      },
      {
        id: 'F',
        validation: FROM_0_001_TO_9999_9999_REGEX,
        placeholder: 'Velocidade',
      },
    ],
  },
  {
    actionCode: 'G140',
    actionParams: [
      {
        id: 'W',
        validation: FROM_0_001_TO_9999_REGEX, // revisar
        placeholder: 'Rebolo',
      },
      {
        id: 'SR',
        validation: FROM_0_001_TO_9999_REGEX, // revisar
        placeholder: 'S ou R (???)',
      },
      {
        id: 'R',
        validation: FROM_1_TO_999_999_REGEX, // revisar
        placeholder: 'Rotação',
      },
      {
        id: 'S',
        validation: FROM_1_TO_999_999_REGEX, // revisar
        placeholder: 'Velocidade Periférica',
      },
    ],
  },
  {
    actionCode: 'G141',
    actionParams: [
      {
        id: 'W',
        validation: FROM_0_001_TO_9999_REGEX, // revisar
        placeholder: 'Rebolo',
      },
    ],
  },
  {
    actionCode: 'G188',
    actionParams: [
      {
        id: 'W',
        validation: FROM_0_001_TO_999_999_REGEX,
        placeholder: 'Comprimento de Passada',
      },
      {
        id: 'F',
        validation: FROM_0_001_TO_999_999_REGEX,
        placeholder: 'Velocidade',
      },
    ],
  },
  {
    actionCode: 'G190',
    actionParams: [
      {
        id: 'U',
        validation: FROM_0_001_TO_999_999_REGEX,
        placeholder: 'Incremento em X',
      },
      {
        id: 'C',
        validation: FROM_1_TO_2_REGEX,
        placeholder: 'Incremento em Z',
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
        {
          id: 'M1',
          fakeId: 'M',
          validation: FROM_1_TO_2K_REGEX,
          placeholder: 'Função M',
        },
        {
          id: 'M2',
          fakeId: 'M',
          validation: FROM_1_TO_2K_REGEX,
          placeholder: 'Função M',
        },
        {
          id: 'M3',
          fakeId: 'M',
          validation: FROM_1_TO_2K_REGEX,
          placeholder: 'Função M',
        },
      ],
    });
  }
}
