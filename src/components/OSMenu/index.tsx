/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'components/Modal';
import ConfirmAction from 'components/ConfirmAction';

import {
  replacePart,
  initialState as partInitialState,
} from 'state/part/partSlice';
import { editApp, initialState as appInitialState } from 'state/app/appSlice';
import { Part } from 'types/part';
import { FileObject, SaveObject } from 'types/general';
import { App } from 'types/app';
import { isElectron, appFileExtension } from 'constants/constants';

import {
  Button,
  SubButton,
  Container,
  Menu,
  SubMenu,
  Hr,
  SubButtonLabel,
} from './styles';

const OSMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalConfirmNewOpen, setIsModalConfirmNewOpen] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);

  const lastFilePath = useSelector(
    (state: { app: App }) => state.app.lastFilePathSaved,
  );
  const isSaved = useSelector((state: { app: App }) => state.app.isSaved);
  const partState = useSelector((state: { part: Part }) => state.part);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const newFile = () => {
    dispatch(
      replacePart({
        ...partInitialState,
      }),
    );
    // colocar estados iniciais aqui, utilizar arquivo separado para não repetir código
    dispatch(
      editApp({
        ...appInitialState,
      }),
    );
  };

  const handleNewFile = () => {
    if (!isSaved) {
      setIsModalConfirmNewOpen(true);
    } else {
      newFile();
    }
  };

  const openFile = async () => {
    try {
      let file: FileObject | undefined;

      if (isElectron()) {
        file = await window.electron.ipcRenderer.openFile();
      } else {
        const fileRead: Promise<FileObject> = new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = (e) => {
            const f = e.target?.result;
            if (f) {
              resolve({
                data: JSON.parse(f as string),
                path: undefined,
                fileName: 'Untitled',
              });
            }
          };

          reader.onerror = reject;

          const input = document.createElement('input');
          input.type = 'file';
          input.accept = `.${appFileExtension}`;
          input.onchange = (event) => {
            const files = (event.target as HTMLInputElement)?.files;
            if (files && files.length > 0) {
              const f = files[0];
              reader.readAsText(f);
            }
          };
          input.click();
        });

        file = await fileRead;
      }

      if (file) {
        // refactor later maybe
        dispatch(replacePart((file as FileObject).data as unknown as Part));
        dispatch(
          editApp({
            fileName: (file as FileObject).fileName,
            isSaved: true,
            lastFilePathSaved: (file as FileObject).path,
            lastSavedFileState: JSON.stringify((file as FileObject).data),
          }),
        );
      }
    } catch (error: unknown) {
      alert(`Erro ao abrir o arquivo ${error}`);
      console.error(error);
    }
  };

  const saveFileAs = async (data: Part) => {
    try {
      let filePath: string | undefined;
      if (isElectron())
        filePath = await window.electron.ipcRenderer.saveFileAs(
          JSON.stringify(data),
        );
      if (filePath) {
        dispatch(
          editApp({
            fileName: filePath.substring(filePath.lastIndexOf('\\') + 1),
            isSaved: true,
            lastFilePathSaved: filePath,
            lastSavedFileState: JSON.stringify(partState),
          }),
        );
      }
    } catch (error: unknown) {
      alert(`Erro ao salvar o arquivo ${error}`);
      console.error(error);
    }
  };

  const saveFile = async (data: Part) => {
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
          dispatch(dispatch(editApp({ isSaved: true })));
        } else {
          alert(`Erro ao ler arquivo ${saveObj.message}`);
          console.error(saveObj.message, `lasfilepath: ${lastFilePath}`);
        }
      } catch (error: unknown) {
        alert(`Erro ao salvar o arquivo ${error}`);
        console.error(error);
      }
    } else {
      saveFileAs(data);
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const handleShortcutN = () => handleNewFile();
    const handleShortcutO = () => openFile();
    const handleShortcutS = () => saveFile(partState);
    const handleShortcutShiftS = () => saveFileAs(partState);

    if (isElectron()) {
      window.electron.ipcRenderer.on('shortcut-pressed-n', handleShortcutN);
      window.electron.ipcRenderer.on('shortcut-pressed-o', handleShortcutO);
      window.electron.ipcRenderer.on('shortcut-pressed-s', handleShortcutS);
      window.electron.ipcRenderer.on(
        'shortcut-pressed-shift-s',
        handleShortcutShiftS,
      );

      return () => {
        window.electron.ipcRenderer.removeListener(
          'shortcut-pressed-n',
          handleShortcutN,
        );
        window.electron.ipcRenderer.removeListener(
          'shortcut-pressed-o',
          handleShortcutO,
        );
        window.electron.ipcRenderer.removeListener(
          'shortcut-pressed-s',
          handleShortcutS,
        );
        window.electron.ipcRenderer.removeListener(
          'shortcut-pressed-shift-s',
          handleShortcutShiftS,
        );
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (lastFilePath) dispatch(editApp({ lastFilePathSaved: lastFilePath }));
  }, [dispatch, lastFilePath]);

  return (
    <Container>
      <Modal
        isOpen={isModalConfirmNewOpen}
        onClose={() => {
          setIsModalConfirmNewOpen(false);
        }}
        title="Mudanças não salvas serão perdidas. Deseja continuar?"
      >
        <ConfirmAction
          onConfirm={() => {
            newFile();
            setIsModalConfirmNewOpen(false);
          }}
          onCancel={() => {
            setIsModalConfirmNewOpen(false);
          }}
        />
      </Modal>
      <Menu ref={menuRef}>
        <li>
          <Button onClick={toggleMenu}>Arquivo</Button>
          {isOpen && (
            <SubMenu>
              <SubButton onClick={() => handleNewFile()}>
                Novo<SubButtonLabel>Ctrl + N</SubButtonLabel>
              </SubButton>
              <SubButton onClick={() => openFile()}>
                Abrir<SubButtonLabel>Ctrl + O</SubButtonLabel>
              </SubButton>
              <SubButton onClick={() => saveFile(partState)}>
                Salvar<SubButtonLabel>Ctrl + S</SubButtonLabel>
              </SubButton>
              <SubButton onClick={() => saveFileAs(partState)}>
                Salvar como...<SubButtonLabel>Ctrl + Shift + S</SubButtonLabel>
              </SubButton>
              <Hr />
              <SubButton onClick={() => window.electron.ipcRenderer.quitApp()}>
                Sair<SubButtonLabel>Ctrl + Q</SubButtonLabel>
              </SubButton>
            </SubMenu>
          )}
        </li>
      </Menu>
    </Container>
  );
};

export default OSMenu;
