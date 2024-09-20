import { Part } from 'types/part';
import { SaveObject } from 'types/general';
import { isElectron } from 'constants/constants';

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
    console.error(`Error saving file as ${error}`);
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
    console.error(`Error saving file ${error}`);
  }
  return saveObj;
};
