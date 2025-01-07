import { FieldState } from 'components/FormField/interface';

interface ToolIdFieldState extends Omit<FieldState, 'value'> {
  value: number;
}

export interface addOperationPayload {
  name: string;
  grindingWheel: string;
  bAxisAngle?: number;
  xSafetyDistance?: number;
  zSafetyDistance?: number;
}

export interface IFormData {
  name: FieldState;
  toolId: ToolIdFieldState;
  bAxisAngle: FieldState;
  xSafetyDistance: FieldState;
  zSafetyDistance: FieldState;
}

export interface FormProps {
  variation?: 'add' | 'edit';
  operationId?: number;
  onButtonClick: () => void;
}
