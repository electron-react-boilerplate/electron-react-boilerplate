import { actionParams } from 'integration/functions-code';
import { ActionParamItemValidation, ActionParamsValidation } from './interface';

function defineActionParams(actionCodeValue: string): ActionParamsValidation {
  const params = actionParams.find((p) => p.actionCode === actionCodeValue);

  if (params) {
    return params.actionParams.map((param: ActionParamItemValidation) => ({
      id: param.id,
      fakeId: param.fakeId ? param.fakeId : undefined,
      validation: param.validation ? param.validation.toString() : null,
      placeholder: param.placeholder,
    }));
  }
  return [];
}

export default defineActionParams;
