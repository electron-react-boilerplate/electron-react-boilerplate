import { defaultConfig } from 'utils/loadConfig';
import { FieldKeys, FormState, RenderFieldProps } from './interface';

export const initialState = {
  ip: {
    value: defaultConfig.network.ip,
    edit: false,
    error: false,
  },
  port: {
    value: defaultConfig.network.port,
    edit: false,
    error: false,
  },
  delRangeStart: {
    value: defaultConfig.cnc.delRangeStart,
    edit: false,
    error: false,
  },
  delRangeEnd: {
    value: defaultConfig.cnc.delRangeEnd,
    edit: false,
    error: false,
  },
  pmcAddress: {
    value: defaultConfig.cnc.pmcAddress,
    edit: false,
    error: false,
  },
  pmcAddressBit: {
    value: defaultConfig.cnc.pmcAddressBit,
    edit: false,
    error: false,
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

export const validateField = (
  fieldId: FieldKeys,
  value: string | number,
  formState: FormState,
): boolean => {
  switch (fieldId) {
    case 'ip': {
      const ipRegex =
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      return ipRegex.test(value.toString());
    }
    case 'port':
    case 'delRangeStart': {
      if (value > formState.delRangeEnd.value) return false;
      return true;
    }
    case 'delRangeEnd': {
      if (value < formState.delRangeStart.value) return false;
      return true;
    }
    case 'pmcAddress':
    case 'pmcAddressBit': {
      const numValue = parseInt(value.toString(), 10);
      return !Number.isNaN(numValue) && numValue >= 0 && numValue <= 7;
    }
    default:
      return false;
  }
};
