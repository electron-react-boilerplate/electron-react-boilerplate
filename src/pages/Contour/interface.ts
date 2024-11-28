import { ActionParamItem } from 'types/part';

export interface ActionParamItemValidation extends ActionParamItem {
  validation: RegExp | string | null;
}

export interface ActionParamsValidation
  extends Array<ActionParamItemValidation> {}

export interface auxActionParamsCode {
  actionCode: string;
  actionParams: ActionParamsValidation;
}
