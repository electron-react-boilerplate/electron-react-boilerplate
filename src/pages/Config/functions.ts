import { defaultConfig } from 'utils/loadConfig';
import { validateIp } from 'utils/constants';
import { FieldKeys, FormState, RenderFieldProps } from './interface';

export const initialState = {
  ip: {
    value: defaultConfig.network.ip,
    edit: false,
    error: false,
    message: undefined,
  },
  port: {
    value: defaultConfig.network.port,
    edit: false,
    error: false,
    message: undefined,
  },
  delRangeStart: {
    value: defaultConfig.cnc.delRangeStart,
    edit: false,
    error: false,
    message: undefined,
  },
  delRangeEnd: {
    value: defaultConfig.cnc.delRangeEnd,
    edit: false,
    error: false,
    message: undefined,
  },
  pmcAddress: {
    value: defaultConfig.cnc.pmcAddress,
    edit: false,
    error: false,
    message: undefined,
  },
  pmcAddressBit: {
    value: defaultConfig.cnc.pmcAddressBit,
    edit: false,
    error: false,
    message: undefined,
  },
  tool1Var: {
    value: defaultConfig.tools.tool1Var,
    edit: false,
    error: false,
    message: undefined,
  },
  tool2Var: {
    value: defaultConfig.tools.tool2Var,
    edit: false,
    error: false,
    message: undefined,
  },
  tool3Var: {
    value: defaultConfig.tools.tool3Var,
    edit: false,
    error: false,
    message: undefined,
  },
  tool4Var: {
    value: defaultConfig.tools.tool4Var,
    edit: false,
    error: false,
    message: undefined,
  },
};

export const fieldsNetworkProps: RenderFieldProps = [
  {
    label: 'Endereço de IP',
    name: 'ip',
    type: 'text',
    placeholder: '192.168.0.1',
  },
  { label: 'Porta', name: 'port', type: 'number', placeholder: '8193' },
];

export const fieldsCNCProps: RenderFieldProps = [
  {
    label: 'ID do programa inicial',
    name: 'delRangeStart',
    type: 'number',
    placeholder: '1000',
  },
  {
    label: 'ID do programa final',
    name: 'delRangeEnd',
    type: 'number',
    placeholder: '1010',
  },
  {
    label: 'Endereço PMC de segurança',
    name: 'pmcAddress',
    type: 'number',
    placeholder: '2850',
  },
  {
    label: 'Bit do endereço PMC de segurança',
    name: 'pmcAddressBit',
    type: 'number',
    placeholder: '0',
  },
];

export const fieldsToolsProps: RenderFieldProps = [
  {
    label: 'Variável PCode do Rebolo 1',
    name: 'tool1Var',
    type: 'number',
    placeholder: '50010',
  },
  {
    label: 'Variável PCode do Rebolo 2',
    name: 'tool2Var',
    type: 'number',
    placeholder: '50020',
  },
  {
    label: 'Variável PCode do Rebolo 3',
    name: 'tool3Var',
    type: 'number',
    placeholder: '50030',
  },
  {
    label: 'Variável PCode do Rebolo 4',
    name: 'tool4Var',
    type: 'number',
    placeholder: '50040',
  },
];

export interface validateFieldObj {
  isValid: boolean;
  message: string | undefined;
}

export const validateField = (
  fieldId: FieldKeys,
  value: string | number,
  formState: FormState,
): validateFieldObj => {
  switch (fieldId) {
    case 'ip': {
      return {
        isValid: validateIp.test(value.toString()),
        message: 'Endereço de IP inválido',
      };
    }
    case 'port': {
      const numValue = Number(value);
      return {
        isValid: numValue > 0 && numValue <= 65535,
        message: 'Porta inválida',
      };
    }
    case 'delRangeStart': {
      const numValue = Number(value);
      if (numValue < 0) {
        return {
          isValid: false,
          message: 'ID do programa inicial não pode ser negativo',
        };
      }
      if (numValue > Number(formState.delRangeEnd.value)) {
        return {
          isValid: false,
          message: 'ID do programa inicial maior que o ID do programa final',
        };
      }
      return { isValid: true, message: undefined };
    }
    case 'delRangeEnd': {
      const numValue = Number(value);
      if (numValue < 0) {
        return {
          isValid: false,
          message: 'ID do programa final não pode ser negativo',
        };
      }
      if (numValue < Number(formState.delRangeStart.value)) {
        return {
          isValid: false,
          message: 'ID do programa final menor que o ID do programa inicial',
        };
      }
      return { isValid: true, message: undefined };
    }
    case 'pmcAddress': {
      const numValue = Number(value);
      return {
        isValid: numValue >= 0 && numValue <= 9999,
        message: 'Endereço PMC inválido',
      };
    }
    case 'pmcAddressBit': {
      const numValue = parseInt(value.toString(), 10);
      return {
        isValid: !Number.isNaN(numValue) && numValue >= 0 && numValue <= 7,
        message: 'Bit inválido',
      };
    }
    case 'tool1Var': {
      const numValue = Number(value);
      return {
        isValid: numValue >= 0,
        message: 'Variável PCode inválida',
      };
    }
    case 'tool2Var': {
      const numValue = Number(value);
      return {
        isValid: numValue >= 0,
        message: 'Variável PCode inválida',
      };
    }
    case 'tool3Var': {
      const numValue = Number(value);
      return {
        isValid: numValue >= 0,
        message: 'Variável PCode inválida',
      };
    }
    case 'tool4Var': {
      const numValue = Number(value);
      return {
        isValid: numValue >= 0,
        message: 'Variável PCode inválida',
      };
    }
    default:
      return { isValid: false, message: 'Campo inválido' };
  }
};
