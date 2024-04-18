// Provavelmente essa função vai virar um componente que pegara os dados do select do menu config para abastecer o select e os seus respectivos parametros
import { actionParams } from 'integration/functions-code';

interface AUX_ActionParams {
  aParamId: string;
  aParamValue: string | null;
  aParamValidation: RegExp | null;
  bParamId: string;
  bParamValue: string | null;
  bParamValidation: RegExp | null;
  cParamId: string;
  cParamValue: string | null;
  cParamValidation: RegExp | null;
}

function defineActionParams(actionCodeValue: string): AUX_ActionParams {
  // faria uma chamada de API para pegar os parametros de acordo com o actionCodeValue
  const params = actionParams.find((p) => p.actionCode === actionCodeValue);

  if (params) {
    // Remove actionCode from params and return the other values to match the ActionParams interface
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { actionCode, ...rest } = params;
    return rest;
  }
  return {
    aParamId: '',
    aParamValue: null,
    aParamValidation: null,
    bParamId: '',
    bParamValue: null,
    bParamValidation: null,
    cParamId: '',
    cParamValue: null,
    cParamValidation: null,
  };
}

export default defineActionParams;
