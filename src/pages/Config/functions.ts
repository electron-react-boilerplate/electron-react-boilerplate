import { defaultConfig } from 'utils/loadConfig';
import { validateIp } from 'utils/constants';
import { FieldKeys, FormState, RenderFieldProps } from './interface';

export const initialState: FormState = {
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
  tool1fixedDiamond: {
    value: defaultConfig.tools.tool1fixedDiamond,
    edit: false,
    error: false,
    message: undefined,
  },
  tool1refractableDiamond: {
    value: defaultConfig.tools.tool1refractableDiamond,
    edit: false,
    error: false,
    message: undefined,
  },
  tool1dressingDisc: {
    value: defaultConfig.tools.tool1dressingDisc,
    edit: false,
    error: false,
    message: undefined,
  },
  tool1fixedDressingRoller: {
    value: defaultConfig.tools.tool1fixedDressingRoller,
    edit: false,
    error: false,
    message: undefined,
  },
  tool1sCtrlMovableDressingRoller: {
    value: defaultConfig.tools.tool1sCtrlMovableDressingRoller,
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
  tool2fixedDiamond: {
    value: defaultConfig.tools.tool2fixedDiamond,
    edit: false,
    error: false,
    message: undefined,
  },
  tool2refractableDiamond: {
    value: defaultConfig.tools.tool2refractableDiamond,
    edit: false,
    error: false,
    message: undefined,
  },
  tool2dressingDisc: {
    value: defaultConfig.tools.tool2dressingDisc,
    edit: false,
    error: false,
    message: undefined,
  },
  tool2fixedDressingRoller: {
    value: defaultConfig.tools.tool2fixedDressingRoller,
    edit: false,
    error: false,
    message: undefined,
  },
  tool2sCtrlMovableDressingRoller: {
    value: defaultConfig.tools.tool2sCtrlMovableDressingRoller,
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
  tool3fixedDiamond: {
    value: defaultConfig.tools.tool3fixedDiamond,
    edit: false,
    error: false,
    message: undefined,
  },
  tool3refractableDiamond: {
    value: defaultConfig.tools.tool3refractableDiamond,
    edit: false,
    error: false,
    message: undefined,
  },
  tool3dressingDisc: {
    value: defaultConfig.tools.tool3dressingDisc,
    edit: false,
    error: false,
    message: undefined,
  },
  tool3fixedDressingRoller: {
    value: defaultConfig.tools.tool3fixedDressingRoller,
    edit: false,
    error: false,
    message: undefined,
  },
  tool3sCtrlMovableDressingRoller: {
    value: defaultConfig.tools.tool3sCtrlMovableDressingRoller,
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
  tool4fixedDiamond: {
    value: defaultConfig.tools.tool4fixedDiamond,
    edit: false,
    error: false,
    message: undefined,
  },
  tool4refractableDiamond: {
    value: defaultConfig.tools.tool4refractableDiamond,
    edit: false,
    error: false,
    message: undefined,
  },
  tool4dressingDisc: {
    value: defaultConfig.tools.tool4dressingDisc,
    edit: false,
    error: false,
    message: undefined,
  },
  tool4fixedDressingRoller: {
    value: defaultConfig.tools.tool4fixedDressingRoller,
    edit: false,
    error: false,
    message: undefined,
  },
  tool4sCtrlMovableDressingRoller: {
    value: defaultConfig.tools.tool4sCtrlMovableDressingRoller,
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
    label: 'Diamante Fixo do Rebolo 1',
    name: 'tool1fixedDiamond',
    type: 'number',
    placeholder: '50011',
  },
  {
    label: 'Diamante Retrátil do Rebolo 1',
    name: 'tool1refractableDiamond',
    type: 'number',
    placeholder: '50012',
  },
  {
    label: 'Disco de Dressagem do Rebolo 1',
    name: 'tool1dressingDisc',
    type: 'number',
    placeholder: '50013',
  },
  {
    label: 'Rolo de Dressagem Fixo do Rebolo 1',
    name: 'tool1fixedDressingRoller',
    type: 'number',
    placeholder: '50014',
  },
  {
    label: 'Rolo de Dressagem Móvel do Rebolo 1',
    name: 'tool1sCtrlMovableDressingRoller',
    type: 'number',
    placeholder: '50015',
  },
  {
    label: 'Variável PCode do Rebolo 2',
    name: 'tool2Var',
    type: 'number',
    placeholder: '50020',
  },
  {
    label: 'Diamante Fixo do Rebolo 2',
    name: 'tool2fixedDiamond',
    type: 'number',
    placeholder: '50021',
  },
  {
    label: 'Diamante Retrátil do Rebolo 2',
    name: 'tool2refractableDiamond',
    type: 'number',
    placeholder: '50022',
  },
  {
    label: 'Disco de Dressagem do Rebolo 2',
    name: 'tool2dressingDisc',
    type: 'number',
    placeholder: '50023',
  },
  {
    label: 'Rolo de Dressagem Fixo do Rebolo 2',
    name: 'tool2fixedDressingRoller',
    type: 'number',
    placeholder: '50024',
  },
  {
    label: 'Rolo de Dressagem Móvel do Rebolo 2',
    name: 'tool2sCtrlMovableDressingRoller',
    type: 'number',
    placeholder: '50025',
  },
  {
    label: 'Variável PCode do Rebolo 3',
    name: 'tool3Var',
    type: 'number',
    placeholder: '50030',
  },
  {
    label: 'Diamante Fixo do Rebolo 3',
    name: 'tool3fixedDiamond',
    type: 'number',
    placeholder: '50031',
  },
  {
    label: 'Diamante Retrátil do Rebolo 3',
    name: 'tool3refractableDiamond',
    type: 'number',
    placeholder: '50032',
  },
  {
    label: 'Disco de Dressagem do Rebolo 3',
    name: 'tool3dressingDisc',
    type: 'number',
    placeholder: '50033',
  },
  {
    label: 'Rolo de Dressagem Fixo do Rebolo 3',
    name: 'tool3fixedDressingRoller',
    type: 'number',
    placeholder: '50034',
  },
  {
    label: 'Rolo de Dressagem Móvel do Rebolo 3',
    name: 'tool3sCtrlMovableDressingRoller',
    type: 'number',
    placeholder: '50035',
  },
  {
    label: 'Variável PCode do Rebolo 4',
    name: 'tool4Var',
    type: 'number',
    placeholder: '50040',
  },
  {
    label: 'Diamante Fixo do Rebolo 4',
    name: 'tool4fixedDiamond',
    type: 'number',
    placeholder: '50041',
  },
  {
    label: 'Diamante Retrátil do Rebolo 4',
    name: 'tool4refractableDiamond',
    type: 'number',
    placeholder: '50042',
  },
  {
    label: 'Disco de Dressagem do Rebolo 4',
    name: 'tool4dressingDisc',
    type: 'number',
    placeholder: '50043',
  },
  {
    label: 'Rolo de Dressagem Fixo do Rebolo 4',
    name: 'tool4fixedDressingRoller',
    type: 'number',
    placeholder: '50044',
  },
  {
    label: 'Rolo de Dressagem Móvel do Rebolo 4',
    name: 'tool4sCtrlMovableDressingRoller',
    type: 'number',
    placeholder: '50045',
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
      return {
        isValid: true,
        message: undefined,
      };
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
      return {
        isValid: true,
        message: undefined,
      };
    }
    case 'tool1Var':
    case 'tool1fixedDiamond':
    case 'tool1refractableDiamond':
    case 'tool1dressingDisc':
    case 'tool1fixedDressingRoller':
    case 'tool1sCtrlMovableDressingRoller':
    case 'tool2Var':
    case 'tool2fixedDiamond':
    case 'tool2refractableDiamond':
    case 'tool2dressingDisc':
    case 'tool2fixedDressingRoller':
    case 'tool2sCtrlMovableDressingRoller':
    case 'tool3Var':
    case 'tool3fixedDiamond':
    case 'tool3refractableDiamond':
    case 'tool3dressingDisc':
    case 'tool3fixedDressingRoller':
    case 'tool3sCtrlMovableDressingRoller':
    case 'tool4Var':
    case 'tool4fixedDiamond':
    case 'tool4refractableDiamond':
    case 'tool4dressingDisc':
    case 'tool4fixedDressingRoller':
    case 'tool4sCtrlMovableDressingRoller': {
      const numValue = Number(value);
      if (numValue < 0) {
        return {
          isValid: false,
          message: 'Valor não pode ser negativo',
        };
      }
      return {
        isValid: true,
        message: undefined,
      };
    }
    default:
      return {
        isValid: true,
        message: undefined,
      };
  }
};
