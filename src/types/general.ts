import { Operations } from 'types/part';

export interface FileObject {
  data: Operations;
  path: string | undefined;
}

export interface SaveObject {
  success: boolean;
  message: string;
}
