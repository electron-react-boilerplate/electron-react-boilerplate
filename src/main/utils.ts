import { Part } from 'types/part';
import { editApp } from 'state/app/appSlice';
import { SaveObject } from 'types/general';
import { isElectron } from 'constants/constants';
import { AppDispatch } from 'state/store';

export const saveFileAs = async (data: Part, dispatch: AppDispatch) => {
  try {
    let saveObj: SaveObject = {
      success: false,
      message: 'Operação de salvamento não executada',
    };
    if (isElectron())
      saveObj = await window.electron.ipcRenderer.saveFileAs(
        JSON.stringify(data),
      );
    if (saveObj && saveObj.success) {
      dispatch(editApp({ isSaved: true }));
    } else {
      console.error('Error saving file (0)', saveObj.message);
    }
  } catch (error: unknown) {
    alert(`Error saving file (1) ${error}`);
    console.error(error);
  }
};

export const saveFile = async (
  data: Part,
  lastFilePath: string | undefined,
  dispatch: AppDispatch,
) => {
  if (lastFilePath) {
    try {
      let saveObj: SaveObject = {
        success: false,
        message: 'Operação de salvamento não executada',
      };
      if (isElectron())
        saveObj = await window.electron.ipcRenderer.saveFile(
          JSON.stringify(data),
          lastFilePath,
        );
      if (saveObj && saveObj.success) {
        dispatch(editApp({ isSaved: true }));
      } else {
        alert(`Erro ao ler arquivo ${saveObj.message}`);
        console.error(saveObj.message, `lasfilepath: ${lastFilePath}`);
      }
    } catch (error: unknown) {
      alert(`Erro ao salvar o arquivo ${error}`);
      console.error(error);
    }
  } else {
    saveFileAs(data, dispatch);
  }
};
