import { FieldState } from 'components/FormField/interface';

export interface addOperationPayload {
  name: string;
  grindingWheel: string;
  bAxisAngle?: number;
}

export interface IFormData {
  name: FieldState;
  toolId: FieldState;
  bAxisAngle: FieldState;
}

export interface FormProps {
  variation?: 'add' | 'edit';
  operationId?: number;
  onButtonClick: () => void;
}
