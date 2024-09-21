import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'components/Modal';
import Button from 'components/Button';
import ApiResponseList from 'components/ApiResponseList';
import ProgramsToSendList from 'components/ProgramsToSendList';
import Spinner from 'components/Spinner';
import ConfirmAction from 'components/ConfirmAction';

import { saveFile, saveFileAs } from 'utils/saveFile';
import { generateGCodeForPart } from 'integration/mount-gcode';

import { editApp } from 'state/app/appSlice';

import { Part } from 'types/part';
import { App } from 'types/app';
import { SaveObject } from 'types/general';
import { Response } from 'types/api';

import { colors } from 'styles/global.styles';
import {
  MenuContainer,
  ModalText,
  Menu,
  List,
  ListItem,
  StyledLink,
  ItemBtn,
  StyledIcon,
  ItemSimple,
  ModalDetail,
  ModalContent,
  ModalContentMax,
} from './styles';

const SideMenu: React.FC = () => {
  const dispatch = useDispatch();
  const part = useSelector((state: { part: Part }) => state.part);
  const lastFilePath = useSelector(
    (state: { app: App }) => state.app.lastFilePathSaved,
  );
  const [loaded, setLoaded] = useState(false);
  const [isModalFeedbackOpen, setIsModalFeedbackOpen] =
    useState<boolean>(false);
  const [isModalResumeOpen, setIsModalResumeOpen] = useState<boolean>(false);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState<boolean>(false);
  const [modalFeedbackMessage, setModalFeedbackMessage] = useState<
    string | null
  >(null);
  const [response, setResponse] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveFile = async () => {
    let saveObj: SaveObject | undefined;
    if (lastFilePath) saveObj = await saveFile(part, lastFilePath);
    else saveObj = await saveFileAs(part);

    if (saveObj && saveObj.success) {
      if (saveObj.saveType === 'saveFile') dispatch(editApp({ isSaved: true }));
      else if (saveObj.filePath)
        dispatch(
          editApp({
            fileName: saveObj.filePath.substring(
              saveObj.filePath.lastIndexOf('\\') + 1,
            ),
            isSaved: true,
            lastFilePathSaved: saveObj.filePath,
            lastSavedFileState: JSON.stringify(part),
          }),
        );
    } else {
      console.error('Error reading file', `lasfilepath: ${lastFilePath}`);
    }
    setIsModalConfirmOpen(true);
  };

  const generateGCodeForOperations = async () => {
    const hasEmptyContoursIds = part.operations.some(
      (operation) => operation.contoursIds.length === 0,
    );
    if (part.operations.length === 0 || hasEmptyContoursIds) {
      setModalFeedbackMessage(
        'Não é possível gerar programas sem operações ou com operações sem contornos.',
      );
      setIsModalFeedbackOpen(true);
    } else {
      setIsModalResumeOpen(true);
    }
  };

  const sendPrograms = async () => {
    const generatedCodes: string[] = generateGCodeForPart(part);
    dispatch(editApp({ lastGeneratedCodes: generatedCodes }));
    setIsLoading(true);

    try {
      const res = await window.electron.ipcRenderer.saveGCode(generatedCodes);
      setResponse(res);
      setIsModalFeedbackOpen(true);
    } catch (error) {
      setModalFeedbackMessage('Problemas de conexão com o serviço.');
      setIsModalFeedbackOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setResponse(null);
    setModalFeedbackMessage(null);
  }, [part]);

  useEffect(() => {
    if (response?.statusCode !== 200) {
      setModalFeedbackMessage(
        'Um ou mais programas retornou um erro. Verifique os detalhes abaixo:',
      );
    } else {
      setModalFeedbackMessage(null);
    }
  }, [response]);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <MenuContainer>
      <Menu className={loaded ? 'loaded' : ''}>
        <List>
          <ListItem>
            <StyledLink to="/workgroup">
              <StyledIcon
                className="icon-make-group"
                color={colors.white}
                fontSize="28px"
              />
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/">
              <StyledIcon
                className="icon-remove_red_eye"
                color={colors.white}
                fontSize="28px"
              />
            </StyledLink>
          </ListItem>
        </List>
        <List>
          <ListItem>
            {!isLoading ? (
              <ItemBtn onClick={() => generateGCodeForOperations()}>
                <StyledIcon
                  className="icon-double_arrow"
                  color={colors.white}
                  fontSize="28px"
                />
              </ItemBtn>
            ) : (
              <ItemSimple>
                <Spinner />
              </ItemSimple>
            )}
          </ListItem>
        </List>
      </Menu>
      {/* Modals */}
      <Modal
        title={
          response?.statusCode === 200
            ? 'Programas enviados!'
            : 'Erro ao enviar programas'
        }
        variation={response?.statusCode === 200 ? 'default' : 'danger'}
        isOpen={isModalFeedbackOpen}
        onClose={() => setIsModalFeedbackOpen(false)}
      >
        <ModalContent>
          {modalFeedbackMessage && (
            <ModalText>{modalFeedbackMessage}</ModalText>
          )}
          {response?.message &&
            response?.statusCode !== 200 &&
            !response.data && (
              <ModalDetail>
                {response.statusCode}. {response.message}
              </ModalDetail>
            )}
          {response?.data && <ApiResponseList data={response.data} />}
        </ModalContent>
        <Button
          onClick={() => setIsModalFeedbackOpen(false)}
          color={response?.statusCode === 200 ? colors.blue : colors.red}
          bgColor={colors.white}
          borderColor={response?.statusCode === 200 ? colors.blue : colors.red}
        >
          OK
        </Button>
      </Modal>
      <Modal
        title="Resumo"
        isOpen={isModalResumeOpen}
        onClose={() => setIsModalResumeOpen(false)}
      >
        <ModalContentMax>
          <ProgramsToSendList />
        </ModalContentMax>
        <ConfirmAction
          confirmText="Salvar e enviar"
          cancelText="Cancelar"
          onConfirm={() => {
            setIsModalResumeOpen(false);
            handleSaveFile();
          }}
          onCancel={() => setIsModalResumeOpen(false)}
          variation="standard"
        />
      </Modal>
      <Modal
        title="Enviar programas"
        isOpen={isModalConfirmOpen}
        onClose={() => setIsModalConfirmOpen(false)}
      >
        <ModalText>Deseja enviar programas para o CNC?</ModalText>
        <ConfirmAction
          onConfirm={() => {
            setIsModalConfirmOpen(false);
            sendPrograms();
          }}
          onCancel={() => {
            setIsModalConfirmOpen(false);
          }}
          variation="standard"
        />
      </Modal>
    </MenuContainer>
  );
};

export default SideMenu;
