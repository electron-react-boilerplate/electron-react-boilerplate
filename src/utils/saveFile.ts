import { Part } from 'types/part';
import { SaveObject } from 'types/general';
import { isElectron } from 'utils/constants';

export const saveFileAs = async (data: Part) => {
  let saveObj: SaveObject = {
    success: false,
    saveType: 'saveFileAs',
  };
  try {
    if (isElectron()) {
      saveObj = await window.electron.ipcRenderer.saveFileAs(
        JSON.stringify(data),
      );
    }
  } catch (error: unknown) {
    throw new Error(`Error saving file as`);
  }
  return saveObj;
};

export const saveFile = async (
  data: Part,
  lastFilePath: string | undefined,
) => {
  let saveObj: SaveObject = {
    success: false,
    saveType: 'saveFile',
  };
  try {
    if (isElectron()) {
      saveObj = await window.electron.ipcRenderer.saveFile(
        JSON.stringify(data),
        lastFilePath,
      );
    }
  } catch (error: unknown) {
    throw new Error(`Error saving file`);
  }
  return saveObj;
};
