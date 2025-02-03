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
  tool1fixedDiamondQtd: {
    value: defaultConfig.tools.tool1fixedDiamondQtd,
    edit: false,
    error: false,
    message: undefined,
  },
  tool1refractableDiamondQtd: {
    value: defaultConfig.tools.tool1refractableDiamondQtd,
    edit: false,
    error: false,
    message: undefined,
  },
  tool1dressingDiscQtd: {
    value: defaultConfig.tools.tool1dressingDiscQtd,
    edit: false,
    error: false,
    message: undefined,
  },
  tool1fixedDressingRollerQtd: {
    value: defaultConfig.tools.tool1fixedDressingRollerQtd,
    edit: false,
    error: false,
    message: undefined,
  },
  tool1sCtrlMovableDressingRollerQtd: {
    value: defaultConfig.tools.tool1sCtrlMovableDressingRollerQtd,
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
  tool2fixedDiamondQtd: {
    value: defaultConfig.tools.tool2fixedDiamondQtd,
    edit: false,
    error: false,
    message: undefined,
  },
  tool2refractableDiamondQtd: {
    value: defaultConfig.tools.tool2refractableDiamondQtd,
    edit: false,
    error: false,
    message: undefined,
  },
  tool2dressingDiscQtd: {
    value: defaultConfig.tools.tool2dressingDiscQtd,
    edit: false,
    error: false,
    message: undefined,
  },
  tool2fixedDressingRollerQtd: {
    value: defaultConfig.tools.tool2fixedDressingRollerQtd,
    edit: false,
    error: false,
    message: undefined,
  },
  tool2sCtrlMovableDressingRollerQtd: {
    value: defaultConfig.tools.tool2sCtrlMovableDressingRollerQtd,
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
  tool3fixedDiamondQtd: {
    value: defaultConfig.tools.tool3fixedDiamondQtd,
    edit: false,
    error: false,
    message: undefined,
  },
  tool3refractableDiamondQtd: {
    value: defaultConfig.tools.tool3refractableDiamondQtd,
    edit: false,
    error: false,
    message: undefined,
  },
  tool3dressingDiscQtd: {
    value: defaultConfig.tools.tool3dressingDiscQtd,
    edit: false,
    error: false,
    message: undefined,
  },
  tool3fixedDressingRollerQtd: {
    value: defaultConfig.tools.tool3fixedDressingRollerQtd,
    edit: false,
    error: false,
    message: undefined,
  },
  tool3sCtrlMovableDressingRollerQtd: {
    value: defaultConfig.tools.tool3sCtrlMovableDressingRollerQtd,
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
  tool4fixedDiamondQtd: {
    value: defaultConfig.tools.tool4fixedDiamondQtd,
    edit: false,
    error: false,
    message: undefined,
  },
  tool4refractableDiamondQtd: {
    value: defaultConfig.tools.tool4refractableDiamondQtd,
    edit: false,
    error: false,
    message: undefined,
  },
  tool4dressingDiscQtd: {
    value: defaultConfig.tools.tool4dressingDiscQtd,
    edit: false,
    error: false,
    message: undefined,
  },
  tool4fixedDressingRollerQtd: {
    value: defaultConfig.tools.tool4fixedDressingRollerQtd,
    edit: false,
    error: false,
    message: undefined,
  },
  tool4sCtrlMovableDressingRollerQtd: {
    value: defaultConfig.tools.tool4sCtrlMovableDressingRollerQtd,
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
    name: 'tool1fixedDiamondQtd',
    type: 'number',
    placeholder: '50011',
  },
  {
    label: 'Diamante Retrátil do Rebolo 1',
    name: 'tool1refractableDiamondQtd',
    type: 'number',
    placeholder: '50012',
  },
  {
    label: 'Disco de Dressagem do Rebolo 1',
    name: 'tool1dressingDiscQtd',
    type: 'number',
    placeholder: '50013',
  },
  {
    label: 'Rolo de Dressagem Fixo do Rebolo 1',
    name: 'tool1fixedDressingRollerQtd',
    type: 'number',
    placeholder: '50014',
  },
  {
    label: 'Rolo de Dressagem Móvel do Rebolo 1',
    name: 'tool1sCtrlMovableDressingRollerQtd',
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
    name: 'tool2fixedDiamondQtd',
    type: 'number',
    placeholder: '50021',
  },
  {
    label: 'Diamante Retrátil do Rebolo 2',
    name: 'tool2refractableDiamondQtd',
    type: 'number',
    placeholder: '50022',
  },
  {
    label: 'Disco de Dressagem do Rebolo 2',
    name: 'tool2dressingDiscQtd',
    type: 'number',
    placeholder: '50023',
  },
  {
    label: 'Rolo de Dressagem Fixo do Rebolo 2',
    name: 'tool2fixedDressingRollerQtd',
    type: 'number',
    placeholder: '50024',
  },
  {
    label: 'Rolo de Dressagem Móvel do Rebolo 2',
    name: 'tool2sCtrlMovableDressingRollerQtd',
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
    name: 'tool3fixedDiamondQtd',
    type: 'number',
    placeholder: '50031',
  },
  {
    label: 'Diamante Retrátil do Rebolo 3',
    name: 'tool3refractableDiamondQtd',
    type: 'number',
    placeholder: '50032',
  },
  {
    label: 'Disco de Dressagem do Rebolo 3',
    name: 'tool3dressingDiscQtd',
    type: 'number',
    placeholder: '50033',
  },
  {
    label: 'Rolo de Dressagem Fixo do Rebolo 3',
    name: 'tool3fixedDressingRollerQtd',
    type: 'number',
    placeholder: '50034',
  },
  {
    label: 'Rolo de Dressagem Móvel do Rebolo 3',
    name: 'tool3sCtrlMovableDressingRollerQtd',
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
    name: 'tool4fixedDiamondQtd',
    type: 'number',
    placeholder: '50041',
  },
  {
    label: 'Diamante Retrátil do Rebolo 4',
    name: 'tool4refractableDiamondQtd',
    type: 'number',
    placeholder: '50042',
  },
  {
    label: 'Disco de Dressagem do Rebolo 4',
    name: 'tool4dressingDiscQtd',
    type: 'number',
    placeholder: '50043',
  },
  {
    label: 'Rolo de Dressagem Fixo do Rebolo 4',
    name: 'tool4fixedDressingRollerQtd',
    type: 'number',
    placeholder: '50044',
  },
  {
    label: 'Rolo de Dressagem Móvel do Rebolo 4',
    name: 'tool4sCtrlMovableDressingRollerQtd',
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
    case 'tool1fixedDiamondQtd':
    case 'tool1refractableDiamondQtd':
    case 'tool1dressingDiscQtd':
    case 'tool1fixedDressingRollerQtd':
    case 'tool1sCtrlMovableDressingRollerQtd':
    case 'tool2Var':
    case 'tool2fixedDiamondQtd':
    case 'tool2refractableDiamondQtd':
    case 'tool2dressingDiscQtd':
    case 'tool2fixedDressingRollerQtd':
    case 'tool2sCtrlMovableDressingRollerQtd':
    case 'tool3Var':
    case 'tool3fixedDiamondQtd':
    case 'tool3refractableDiamondQtd':
    case 'tool3dressingDiscQtd':
    case 'tool3fixedDressingRollerQtd':
    case 'tool3sCtrlMovableDressingRollerQtd':
    case 'tool4Var':
    case 'tool4fixedDiamondQtd':
    case 'tool4refractableDiamondQtd':
    case 'tool4dressingDiscQtd':
    case 'tool4fixedDressingRollerQtd':
    case 'tool4sCtrlMovableDressingRollerQtd': {
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
