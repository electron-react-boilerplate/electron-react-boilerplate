/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
import ROGAURACORE_PATH from '../constants';
import { StoredData } from '../types';




interface IChangeColorKeyboard {
  mode: string
  color?: string;
  force?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  singleMode?: boolean;
}

const useChangeColorKeyboard = () => {

  const clearAndSet = async (data: StoredData) => {
    await window.electron.ipcRenderer.invoke('store-delete', 'dataStored');
    await window.electron.ipcRenderer.invoke('store-set', 'dataStored', JSON.stringify(data));
  }


  const changeColor = ({ mode, color, force, color1, color2, color3, color4, singleMode }: IChangeColorKeyboard) => {
      window.electron.ipcRenderer.invoke('store-set', 'mode', mode);

    const body = {
      mode,
      color,
      color1,
      color2,
      color3,
      color4,
      force,
      singleMode,
    } as StoredData

    clearAndSet(body);

    if (mode === 'STATIC') {
      window.electron.ipcRenderer.sendMessage('execute-command', `${ROGAURACORE_PATH} single_static ${color}`);
    }

    if(mode === 'RAINBOW'){
      window.electron.ipcRenderer.sendMessage('execute-command', `${ROGAURACORE_PATH} rainbow_cycle ${force}`);
    }

    if(mode === 'BRIGHTNESS'){
      window.electron.ipcRenderer.sendMessage('execute-command', `${ROGAURACORE_PATH} brightness ${force}`);
    }

    if(mode === 'OFF'){
      window.electron.ipcRenderer.sendMessage('execute-command', `${ROGAURACORE_PATH} single_static 000000`);
    }

    if(mode === 'MULTI_STATIC'){
      window.electron.ipcRenderer.sendMessage('execute-command', `${ROGAURACORE_PATH} multi_static ${color1} ${color2} ${color3} ${color4}`);
    }

  };

  return {
    changeColor,
  };
};

export default useChangeColorKeyboard;
