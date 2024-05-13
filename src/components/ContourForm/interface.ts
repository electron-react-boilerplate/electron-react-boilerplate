import { ContourItem, ContourType } from 'types/part';

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
