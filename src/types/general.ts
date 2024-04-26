import { Operations } from 'types/part';

export interface FileObject {
  data: Operations;
  path: string | undefined;
}
