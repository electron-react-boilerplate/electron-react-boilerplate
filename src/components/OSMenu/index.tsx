/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useState, useEffect, useRef, useCallback } from 'react';
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

import { isElectron } from 'utils/constants';
import { saveFile, saveFileAs } from 'utils/saveFile';
import { appFileExtension } from 'main/appConstants';

import {
  ModalText,
  Button,
  SubButton,
  Container,
  Menu,
  SubMenu,
  Hr,
  // SubButtonLabel,
} from './styles';

const OSMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalConfirmNewOpen, setIsModalConfirmNewOpen] = useState(false);
  const [isModalConfirmOpenOpen, setIsModalConfirmOpenOpen] = useState(false);
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

  const newFile = useCallback(() => {
    dispatch(
      replacePart({
        ...partInitialState,
      }),
    );
    dispatch(
      editApp({
        ...appInitialState,
      }),
    );
  }, [dispatch]);

  const handleNewFile = useCallback(() => {
    if (!isSaved) {
      setIsModalConfirmNewOpen(true);
    } else {
      newFile();
    }
  }, [isSaved, newFile]);

  const openFile = useCallback(async () => {
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
      alert(`Error opening file`);
    }
  }, [dispatch]);

  const handleOpenFile = useCallback(() => {
    if (!isSaved) {
      setIsModalConfirmOpenOpen(true);
    } else {
      openFile();
    }
  }, [isSaved, openFile]);

  const saveFileChangeAppState = useCallback(
    async (saveObj: SaveObject) => {
      if (saveObj.success) {
        if (saveObj.saveType === 'saveFile')
          dispatch(editApp({ isSaved: true }));
        else if (saveObj.filePath)
          dispatch(
            editApp({
              fileName: saveObj.filePath.substring(
                saveObj.filePath.lastIndexOf('\\') + 1,
              ),
              isSaved: true,
              lastFilePathSaved: saveObj.filePath,
              lastSavedFileState: JSON.stringify(partState),
            }),
          );
      }
    },
    [dispatch, partState],
  );

  const handleSaveFileAs = useCallback(async () => {
    let saveObj: SaveObject | undefined;
    try {
      saveObj = await saveFileAs(partState);
      saveFileChangeAppState(saveObj);
    } catch (error: unknown) {
      alert(error);
    }
  }, [saveFileChangeAppState, partState]);

  const handleSaveFile = useCallback(async () => {
    if (lastFilePath) {
      let saveObj: SaveObject | undefined;
      try {
        saveObj = await saveFile(partState, lastFilePath);
        saveFileChangeAppState(saveObj);
      } catch (error: unknown) {
        alert(error);
      }
    } else {
      handleSaveFileAs();
    }
  }, [lastFilePath, partState, saveFileChangeAppState, handleSaveFileAs]);

  /* incluir em outro lugar aonde ele não fique remapeando os atalhos,
  corrigir também o problema de ele ficar impedindo atalho em outros softwares */
  // eslint-disable-next-line consistent-return
  // useEffect(() => {
  //   const handleShortcutN = () => handleNewFile();
  //   const handleShortcutO = () => handleOpenFile();
  //   const handleShortcutS = () => handleSaveFile();
  //   const handleShortcutShiftS = () => handleSaveFileAs();

  //   if (isElectron()) {
  //     window.electron.ipcRenderer.on('shortcut-pressed-n', handleShortcutN);
  //     window.electron.ipcRenderer.on('shortcut-pressed-o', handleShortcutO);
  //     window.electron.ipcRenderer.on('shortcut-pressed-s', handleShortcutS);
  //     window.electron.ipcRenderer.on(
  //       'shortcut-pressed-shift-s',
  //       handleShortcutShiftS,
  //     );

  //     return () => {
  //       window.electron.ipcRenderer.removeListener(
  //         'shortcut-pressed-n',
  //         handleShortcutN,
  //       );
  //       window.electron.ipcRenderer.removeListener(
  //         'shortcut-pressed-o',
  //         handleShortcutO,
  //       );
  //       window.electron.ipcRenderer.removeListener(
  //         'shortcut-pressed-s',
  //         handleShortcutS,
  //       );
  //       window.electron.ipcRenderer.removeListener(
  //         'shortcut-pressed-shift-s',
  //         handleShortcutShiftS,
  //       );
  //     };
  //   }
  // }, [
  //   handleNewFile,
  //   handleOpenFile,
  //   handleSaveFile,
  //   handleSaveFileAs,
  //   partState,
  // ]);

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
      <Menu ref={menuRef}>
        <li>
          <Button onClick={toggleMenu}>Arquivo</Button>
          {isOpen && (
            <SubMenu>
              <SubButton onClick={() => handleNewFile()}>
                Novo
                {/* <SubButtonLabel>Ctrl + N</SubButtonLabel> */}
              </SubButton>
              <SubButton onClick={() => handleOpenFile()}>
                Abrir
                {/* <SubButtonLabel>Ctrl + O</SubButtonLabel> */}
              </SubButton>
              <SubButton onClick={() => handleSaveFile()}>
                Salvar
                {/* <SubButtonLabel>Ctrl + S</SubButtonLabel> */}
              </SubButton>
              <SubButton onClick={() => handleSaveFileAs()}>
                Salvar como...
                {/* <SubButtonLabel>Ctrl + Shift + S</SubButtonLabel> */}
              </SubButton>
              <Hr />
              <SubButton onClick={() => window.electron.ipcRenderer.quitApp()}>
                Sair
                {/* <SubButtonLabel>Ctrl + Q</SubButtonLabel> */}
              </SubButton>
            </SubMenu>
          )}
        </li>
      </Menu>
      {/* Modals */}
      <Modal
        isOpen={isModalConfirmNewOpen}
        onClose={() => {
          setIsModalConfirmNewOpen(false);
        }}
        title="Alerta"
        variation="danger"
      >
        <ModalText>
          Mudanças não salvas serão perdidas. Deseja continuar?
        </ModalText>
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
      <Modal
        isOpen={isModalConfirmOpenOpen}
        onClose={() => {
          setIsModalConfirmOpenOpen(false);
        }}
        title="Alerta"
        variation="danger"
      >
        <ModalText>
          Mudanças não salvas serão perdidas. Deseja continuar?
        </ModalText>
        <ConfirmAction
          onConfirm={() => {
            openFile();
            setIsModalConfirmOpenOpen(false);
          }}
          onCancel={() => {
            setIsModalConfirmOpenOpen(false);
          }}
        />
      </Modal>
    </Container>
  );
};

export default OSMenu;
