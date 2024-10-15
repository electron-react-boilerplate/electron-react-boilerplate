import { FieldState } from 'components/FormField/interface';

export interface addOperationPayload {
  name: string;
  grindingWheel: string;
  dAngle?: number;
}

export interface IFormData {
  name: FieldState;
  grindingWheelId: FieldState;
  dAngle: FieldState;
}

export interface FormProps {
  variation?: 'add' | 'edit';
  operationId?: number;
  onButtonClick: () => void;
}
