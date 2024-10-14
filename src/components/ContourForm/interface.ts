import { ContourItem, ContourType } from 'types/part';
import { FieldState } from 'components/FormField/interface';

type Action = 'add' | 'edit';

export interface addContourPayload {
  name: string;
  type: ContourType | string;
}

export interface FormProps {
  contour?: ContourItem;
  action: Action;
  onButtonClick: () => void;
}

export interface CustomFieldState extends Omit<FieldState, 'value'> {
  value: ContourType | string;
}

export interface IFormData {
  name: FieldState;
  type: CustomFieldState;
}
