import { Part } from 'types/part';

export interface FileObject {
  data: Part;
  path: string | undefined;
  fileName: string;
}

export interface SaveObject {
  success: boolean;
  saveType: 'saveFile' | 'saveFileAs';
  filePath?: string;
}
