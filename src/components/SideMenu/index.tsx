import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from 'components/Modal';
import Button from 'components/Button';
import ApiResponseList from 'components/ApiResponseList';

import { mountGCode } from 'integration/mount-gcode';

import { Part } from 'types/part';
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
} from './styles';

const SideMenu: React.FC = () => {
  const part = useSelector((state: { part: Part }) => state.part);
  const [loaded, setLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [response, setResponse] = useState<Response | null>(null);

  const generateGCodeForOperations = async () => {
    const hasEmptyContoursIds = part.operations.some(
      (operation) => operation.contoursIds.length === 0,
    );
    if (part.operations.length === 0 || hasEmptyContoursIds) {
      setModalMessage(
        'Não é possível gerar programas sem operações ou com operações sem contornos.',
      );
    } else {
      const generatedCodes: String[] = [];

      part.operations.forEach((operation) => {
        operation.contoursIds.forEach((contourId) => {
          const operationContour = part.contours.find(
            (contour) => contour.id === contourId,
          );
          if (operationContour) {
            // Resolver problema do ID repetido do mesmo contorno em operations diferentes
            const gCode = mountGCode(operationContour);
            generatedCodes.push(gCode);
          }
        });
      });

      try {
        setResponse(
          await window.electron.ipcRenderer.saveGCode(generatedCodes),
        );
        if (response?.statusCode !== 200) {
          setModalMessage(
            'Um ou mais programas retornou um erro. Verifique a lista abaixo.',
          );
        }
      } catch (error) {
        setModalMessage('Problemas de conexão com o serviço.');
        console.error(error);
      }

      // o state de operação é quem vai definir o numero do arquivo
      // adicionar borda vermelha no contorno pra feedback de erro
      // adicionar feedback visual parecido com o de salvamento para o botão de gerar gcode
      // nome do arquivo
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    setResponse(null);
    setModalMessage(null);
  }, [part]);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <MenuContainer>
      <Modal
        title={
          response?.statusCode === 200
            ? 'Programas enviados!'
            : 'Erro ao enviar programas'
        }
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {modalMessage && <ModalText>{modalMessage}</ModalText>}
        {response?.data && <ApiResponseList data={response.data} />}
        <Button
          onClick={() => setIsModalOpen(false)}
          color={colors.red}
          bgColor={colors.white}
          borderColor={colors.red}
        >
          OK
        </Button>
      </Modal>
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
            <ItemBtn onClick={() => generateGCodeForOperations()}>
              <StyledIcon
                className="icon-double_arrow"
                color={colors.white}
                fontSize="28px"
              />
            </ItemBtn>
          </ListItem>
        </List>
      </Menu>
    </MenuContainer>
  );
};

export default SideMenu;
