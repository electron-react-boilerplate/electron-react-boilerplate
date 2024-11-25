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
  [key in FieldKeys]: FieldState;
};

export type RenderFieldProps = {
  label: string;
  name: FieldKeys;
  type: string;
  placeholder: string;
}[];

export type ToolData = {
  code: number;
  value: number;
};
