import { ContourItem } from 'types/part';

type Action = 'add' | 'edit';

export interface FormProps {
  contour?: ContourItem;
  action: Action;
  onButtonClick: () => void;
}
