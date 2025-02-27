import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumbs from 'components/Breadcrumbs';
import Card from 'components/Card';
import Modal from 'components/Modal';
import ContourForm from 'components/ContourForm';
import Icon from 'components/Icon';
import Button from 'components/Button';
import AddOperationForm from 'components/OperationForm';
import ConfirmAction from 'components/ConfirmAction';

import useFormattedTools from 'hooks/useFormattedTools';

import {
  removeContourFromOperation,
  deleteOperation,
  editOperation,
} from 'state/part/partSlice';

import { ToolOptionItem } from 'components/Select/interface';
import { Contours, Machining, OperationItem, Operations } from 'types/part';

import { PageTitle } from 'styles/Components';
import { colors } from 'styles/global.styles';

import dresserImg from '../../../assets/images/dresser.png';
import partImg from '../../../assets/images/part.png';

import {
  Block,
  Container,
  Content,
  AddBtn,
  TextAdd,
  Wrap,
  OpWrapper,
  CContentBlock,
  SContentBlock,
  OpItemHeader,
  OpItemCards,
  OpItemHeaderTitle,
  OpItemHeaderSubTitle,
  SButton,
  BAxisAngleText,
  WheelText,
  OpItemHeaderContent,
  ContourBtnsWrapper,
  IconButton,
  IconBtn,
} from './style';

const breadcrumbsItems = [
  {
    label: 'Grupo de Trabalho',
    url: '/workgroup',
    isActive: true,
  },
];

const WorkGroup: React.FC = () => {
  const dispatch = useDispatch();
  const formattedTools = useFormattedTools();
  const contours = useSelector(
    (state: { part: { contours: Contours } }) => state.part.contours,
  );
  const operations = useSelector(
    (state: { part: { operations: Operations } }) => state.part.operations,
  );
  const [isModalContourOpen, setIsModalContourOpen] = useState<boolean>(false);
  const [selectedMachining, setSelectedMachining] = useState<Machining>(1);
  const [isModalOperationOpen, setIsModalOperationOpen] =
    useState<boolean>(false);
  const [isModalEditOperationOpen, setIsModalEditOperationOpen] =
    useState<boolean>(false);
  const [isModalCofirmDeleteOpOpen, setIsModalCofirmDeleteOpOpen] =
    useState<boolean>(false);
  const [opIdAux, setOpIdAux] = useState<number>(0);

  const removeFromOperation = (operationId: number, contourId: number) => {
    dispatch(
      removeContourFromOperation({
        operationId,
        contourId,
      }),
    );
  };

  const handleToggleCard = (
    isActive: boolean,
    operationId: number,
    contourId: number,
  ) => {
    const currentOperation = operations.find((op) => op.id === operationId);

    if (currentOperation) {
      let updatedContoursIdsExcluded: number[];

      if (isActive) {
        updatedContoursIdsExcluded = [
          ...(currentOperation.contoursIdsExcluded ?? []),
          contourId,
        ];
      } else {
        updatedContoursIdsExcluded =
          currentOperation.contoursIdsExcluded?.filter(
            (id) => id !== contourId,
          ) ?? [];
      }

      dispatch(
        editOperation({
          id: operationId,
          operation: {
            ...currentOperation,
            contoursIdsExcluded: updatedContoursIdsExcluded,
          },
        }),
      );
    }
  };

  const handleDeleteOperation = () => {
    dispatch(deleteOperation(opIdAux));
  };

  return (
    <Container>
      <Breadcrumbs items={breadcrumbsItems} />
      <Content>
        <Block>
          <PageTitle>Contornos</PageTitle>
          <ContourBtnsWrapper>
            <IconBtn>
              <IconButton
                onClick={() => setSelectedMachining(1)}
                bgColor={selectedMachining === 1 ? colors.yellow : colors.white}
                shadow={selectedMachining === 1}
              >
                <img src={partImg} height={34} alt="Part Icon" />
              </IconButton>
            </IconBtn>
            <IconBtn>
              <IconButton
                onClick={() => setSelectedMachining(2)}
                bgColor={selectedMachining === 2 ? colors.yellow : colors.white}
                shadow={selectedMachining === 2}
              >
                <img src={dresserImg} height={34} alt="Dressing Icon" />
              </IconButton>
            </IconBtn>
            <AddBtn>
              <Button
                onClick={() => setIsModalContourOpen(true)}
                color={colors.white}
                bgColor={colors.green}
              >
                <Wrap>
                  <Icon
                    className="icon-add"
                    color={colors.white}
                    fontSize="26px"
                  />
                  <TextAdd>
                    Cadastrar{' '}
                    {selectedMachining === 1 ? 'Retificação' : 'Dressagem'}
                  </TextAdd>
                </Wrap>
              </Button>
            </AddBtn>
          </ContourBtnsWrapper>
          <CContentBlock>
            <div>
              {contours
                .filter((contour) => contour.machining === selectedMachining)
                .map((contour) => (
                  <Card
                    key={contour.id}
                    content={contour}
                    variation="contour"
                  />
                ))}
            </div>
          </CContentBlock>
        </Block>
        <Block>
          <PageTitle>Sequência de Execução</PageTitle>
          <AddBtn>
            <Button
              onClick={() => setIsModalOperationOpen(true)}
              color={colors.white}
              bgColor={colors.blue}
            >
              <Wrap>
                <Icon
                  className="icon-add"
                  color={colors.white}
                  fontSize="26px"
                />
                <TextAdd>Adicionar Operação</TextAdd>
              </Wrap>
            </Button>
          </AddBtn>
          <OpWrapper>
            {operations.map((operation: OperationItem) => {
              const matchedTool = formattedTools.find(
                (tool: ToolOptionItem) => tool.id === operation.toolId,
              );
              return (
                <SContentBlock key={operation.id}>
                  <OpItemHeader>
                    <OpItemHeaderTitle>{operation.name}</OpItemHeaderTitle>
                    <div>
                      <SButton
                        onClick={() => {
                          setOpIdAux(operation.id);
                          setIsModalEditOperationOpen(true);
                        }}
                      >
                        <Icon
                          className="icon-create"
                          color={colors.greyFont}
                          fontSize="28px"
                        />
                      </SButton>
                      <SButton
                        onClick={() => {
                          setOpIdAux(operation.id);
                          setIsModalCofirmDeleteOpOpen(true);
                        }}
                      >
                        <Icon
                          className="icon-delete"
                          color={colors.greyFont}
                          fontSize="28px"
                        />
                      </SButton>
                    </div>
                  </OpItemHeader>
                  <OpItemHeaderContent>
                    <OpItemHeaderSubTitle>
                      <WheelText>{matchedTool && matchedTool.label}</WheelText>
                      <BAxisAngleText>
                        Ângulo Eixo B: {operation.bAxisAngle}
                      </BAxisAngleText>
                    </OpItemHeaderSubTitle>
                  </OpItemHeaderContent>
                  <OpItemCards>
                    {operation.contoursIds.map((contourId) => {
                      const contour = contours.find(
                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        (contour) => contour.id === contourId,
                      );
                      if (!contour) return null;
                      return (
                        <Card
                          key={contourId}
                          content={{ ...contour, operationId: operation.id }}
                          variation="operation"
                          removeFromOperation={() =>
                            removeFromOperation(operation.id, contour.id)
                          }
                          onToggle={(isActive: boolean) => {
                            handleToggleCard(
                              isActive,
                              operation.id,
                              contour.id,
                            );
                          }}
                        />
                      );
                    })}
                  </OpItemCards>
                </SContentBlock>
              );
            })}
          </OpWrapper>
        </Block>
      </Content>
      <Modal
        title={`Cadastrar ${
          selectedMachining === 1 ? 'Retificação' : 'Dressagem'
        }`}
        isOpen={isModalContourOpen}
        onClose={() => setIsModalContourOpen(false)}
      >
        <ContourForm
          variation="add"
          machining={selectedMachining}
          onButtonClick={() => setIsModalContourOpen(false)}
        />
      </Modal>
      <Modal
        title="Adicionar Operação"
        isOpen={isModalOperationOpen}
        onClose={() => setIsModalOperationOpen(false)}
      >
        <AddOperationForm
          onButtonClick={() => setIsModalOperationOpen(false)}
        />
      </Modal>
      <Modal
        title="Editar Operação"
        isOpen={isModalEditOperationOpen}
        onClose={() => setIsModalEditOperationOpen(false)}
      >
        <AddOperationForm
          variation="edit"
          onButtonClick={() => setIsModalEditOperationOpen(false)}
          operationId={opIdAux}
        />
      </Modal>
      <Modal
        title="Deseja excluir operação?"
        isOpen={isModalCofirmDeleteOpOpen}
        onClose={() => setIsModalCofirmDeleteOpOpen(false)}
        variation="danger"
      >
        <ConfirmAction
          onConfirm={() => {
            handleDeleteOperation();
            setIsModalCofirmDeleteOpOpen(false);
          }}
          onCancel={() => setIsModalCofirmDeleteOpOpen(false)}
        />
      </Modal>
    </Container>
  );
};

export default WorkGroup;
