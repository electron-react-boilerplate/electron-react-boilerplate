import { actionParams } from 'integration/functions-code';
import { ActionParamsValidation } from './interface';

function defineActionParams(actionCodeValue: string): ActionParamsValidation {
  const params = actionParams.find((p) => p.actionCode === actionCodeValue);

  if (params) {
    return params.actionParams.map((param) => ({
      id: param.id,
      validation: param.validation,
    }));
  }
  return [];
}

export default defineActionParams;
