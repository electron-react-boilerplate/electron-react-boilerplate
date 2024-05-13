import React, { useState } from 'react';

import Breadcrumbs from 'components/Breadcrumbs';
import ContentBlock from 'components/ContentBlock';
import Card from 'components/Card';
import Modal from 'components/Modal';
import ContourForm from 'components/ContourForm';
import Icon from 'components/Icon';
import Button from 'components/Button';

import { useSelector } from 'react-redux';
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
} from './style';

const breadcrumbsItems = [
  {
    label: 'Grupo de Trabalho',
    url: '/workgroup',
    isActive: true,
  },
];

const WorkGroup: React.FC = () => {
  const contours = useSelector(
    (state: { part: { contours: Contours } }) => state.part.contours,
  );
  const operations = useSelector(
    (state: { part: { operations: Operations } }) => state.part.operations,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Container>
      <Modal
        title="Cadastrar Contorno"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ContourForm action="add" onButtonClick={() => setIsModalOpen(false)} />
      </Modal>
      <Breadcrumbs items={breadcrumbsItems} />
      <Content>
        <Block>
          <Title>Contornos/Elementos</Title>
          <ContentBlock>
            <div>
              <AddBtn>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  color={colors.white}
                  bgColor={colors.blue}
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
              {contours.map((contour) => (
                <Card key={contour.id} content={contour} variation="contour" />
              ))}
            </div>
          </ContentBlock>
        </Block>
        <Block>
          <Title>Sequência de Execução</Title>
          <ContentBlock>
            <div>
              {operations.map((operation) => {
                return operation.contoursIds.map((contourId) => {
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
                    />
                  );
                });
              })}
            </div>
          </ContentBlock>
        </Block>
      </Content>
    </Container>
  );
};

export default WorkGroup;
