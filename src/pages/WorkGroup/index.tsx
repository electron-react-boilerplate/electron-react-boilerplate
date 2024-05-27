import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumbs from 'components/Breadcrumbs';
import Card from 'components/Card';
import Modal from 'components/Modal';
import ContourForm from 'components/ContourForm';
import Icon from 'components/Icon';
import Button from 'components/Button';
import AddOperationForm from 'components/AddOperationForm';

import { removeContourFromOperation } from 'state/part/partSlice';

import { Contours, Operations } from 'types/part';

import { colors } from 'styles/global.styles';
import {
  Block,
  Container,
  Content,
  AddBtn,
  Title,
  TextAdd,
  Wrap,
  OpWrapper,
  CContentBlock,
  SContentBlock,
  OpItemHeader,
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
  const contours = useSelector(
    (state: { part: { contours: Contours } }) => state.part.contours,
  );
  const operations = useSelector(
    (state: { part: { operations: Operations } }) => state.part.operations,
  );
  const [isModalContourOpen, setIsModalContourOpen] = useState<boolean>(false);
  const [isModalOperationOpen, setIsModalOperationOpen] =
    useState<boolean>(false);

  const removeFromOperation = (operationId: number, contourId: number) => {
    dispatch(
      removeContourFromOperation({
        operationId,
        contourId,
      }),
    );
  };

  return (
    <Container>
      <Modal
        title="Cadastrar Contorno"
        isOpen={isModalContourOpen}
        onClose={() => setIsModalContourOpen(false)}
      >
        <ContourForm
          action="add"
          onButtonClick={() => setIsModalContourOpen(false)}
        />
      </Modal>
      <Modal
        title="Adicionar Operação"
        isOpen={isModalOperationOpen}
        onClose={() => setIsModalOperationOpen(false)}
      >
        <AddOperationForm
          // action="add"
          onButtonClick={() => setIsModalOperationOpen(false)}
        />
      </Modal>
      <Breadcrumbs items={breadcrumbsItems} />
      <Content>
        <Block>
          <Title>Contornos/Elementos</Title>
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
                <TextAdd>Cadastrar Contorno</TextAdd>
              </Wrap>
            </Button>
          </AddBtn>
          <CContentBlock>
            <div>
              {contours.map((contour) => (
                <Card key={contour.id} content={contour} variation="contour" />
              ))}
            </div>
          </CContentBlock>
        </Block>
        <Block>
          <Title>Sequência de Execução</Title>
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
            {operations.map((operation) => {
              return (
                <SContentBlock key={operation.id}>
                  <OpItemHeader>
                    <h3>{operation.name}</h3>
                    <h3>{operation.grindingWheel}</h3>
                    <Icon
                      className="icon-delete"
                      color={colors.greyFont}
                      fontSize="28px"
                    />
                  </OpItemHeader>
                  {operation.contoursIds.map((contourId) => {
                    const contour = contours.find(
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      (contour) => contour.id === contourId,
                    );
                    if (!contour) return null;
                    return (
                      <Card
                        key={contourId}
                        content={contour}
                        variation="operation"
                        removeFromOperation={() =>
                          removeFromOperation(operation.id, contour.id)
                        }
                      />
                    );
                  })}
                </SContentBlock>
              );
            })}
          </OpWrapper>
        </Block>
      </Content>
    </Container>
  );
};

export default WorkGroup;
