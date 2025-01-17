import { ContourItem, ContourType, Machining } from 'types/part';
import { FieldState } from 'components/FormField/interface';

type Action = 'add' | 'edit';

export interface addContourPayload {
  name: string;
  machining: Machining | string;
  type: ContourType | string;
}

export interface FormProps {
  contour?: ContourItem;
  action: Action;
  onButtonClick: () => void;
}

export interface CustomFieldState extends Omit<FieldState, 'value'> {
  value: ContourType | string | undefined;
}

export interface IFormData {
  name: FieldState;
  machining: CustomFieldState;
  type: CustomFieldState;
}
