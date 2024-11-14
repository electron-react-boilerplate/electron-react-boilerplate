import { Config } from 'types/api';

// Need to adjust if interface Config changes
export type FieldKeys =
  | keyof Config['network']
  | keyof Config['cnc']
  | keyof Config['tools'];

export type FieldState = {
  value: string | number;
  edit: boolean;
  error: boolean;
  message: string | undefined;
};

export type FormState = {
  ip: FieldState;
  port: FieldState;
  delRangeStart: FieldState;
  delRangeEnd: FieldState;
  pmcAddress: FieldState;
  pmcAddressBit: FieldState;
  tool1Var: FieldState;
  tool2Var: FieldState;
  tool3Var: FieldState;
  tool4Var: FieldState;
};

export type RenderFieldProps = {
  label: string;
  name: FieldKeys;
  type: string;
  placeholder: string;
}[];
