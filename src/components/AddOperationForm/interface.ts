export interface addOperationPayload {
  name: string;
  grindingWheel: string;
  dAngle?: number;
}

export interface FormProps {
  variation?: 'add' | 'edit';
  operationId?: number;
  onButtonClick: () => void;
}
