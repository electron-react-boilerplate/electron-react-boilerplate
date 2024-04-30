import { Contours } from 'types/part';

export interface FileObject {
  data: Contours;
  path: string | undefined;
}

export interface SaveObject {
  success: boolean;
  message: string;
}
