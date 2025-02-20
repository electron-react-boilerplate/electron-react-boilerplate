import { ContourItem, ContourType, Machining } from 'types/part';
import { FieldState } from 'components/FormField/interface';

type Variation = 'add' | 'edit';

export interface addContourPayload {
  name: string;
  machining: Machining | string;
  type: ContourType | string;
  dressingTool?: string;
  bAxisAngle?: number;
  xSafetyDistance?: number;
  zSafetyDistance?: number;
}

export interface FormProps {
  contour?: ContourItem;
  machining?: Machining;
  variation: Variation;
  contourId?: number;
  onButtonClick: () => void;
}

export interface CustomFieldState extends Omit<FieldState, 'value'> {
  value: ContourType | string | undefined;
}

export interface IFormData {
  name: FieldState;
  type: CustomFieldState;
  bAxisAngle?: FieldState;
  xSafetyDistance?: FieldState;
  zSafetyDistance?: FieldState;
  dressingTool?: FieldState;
}
