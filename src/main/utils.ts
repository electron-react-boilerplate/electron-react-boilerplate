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
    alert(`Error saving file (1) ${error}`);
    console.error(error);
  }
  console.log('saveFileAs saveObj', saveObj);
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
    alert(`Erro ao salvar o arquivo ${error}`);
    console.error(error);
  }
  console.log('saveFile saveObj', saveObj);
  return saveObj;
};
