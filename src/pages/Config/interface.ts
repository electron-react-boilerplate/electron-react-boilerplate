import { Config } from 'types/api';

export type FieldKeys = keyof Config['network'] | keyof Config['cnc'];

export type FieldState = {
  value: string | number;
  edit: boolean;
  error: boolean;
};

export type FormState = {
  ip: FieldState;
  port: FieldState;
  delRangeStart: FieldState;
  delRangeEnd: FieldState;
  pmcAddress: FieldState;
  pmcAddressBit: FieldState;
};

export type RenderFieldProps = {
  label: string;
  name: FieldKeys;
  type: string;
  placeholder: string;
}[];
