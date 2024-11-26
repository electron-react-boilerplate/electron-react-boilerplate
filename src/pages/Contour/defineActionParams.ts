import { actionParams } from 'integration/functions-code';
import { auxActionParams as auxActionParamsInterface } from './interface';

function defineActionParams(actionCodeValue: string): auxActionParamsInterface {
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
