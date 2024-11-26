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
    param1Id: '',
    param1Value: null,
    param1Validation: null,
    param2Id: '',
    param2Value: null,
    param2Validation: null,
    param3Id: '',
    param3Value: null,
    param3Validation: null,
  };
}

export default defineActionParams;
