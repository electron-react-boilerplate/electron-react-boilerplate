import React, { useRef, useState } from 'react';

import Breadcrumbs from 'components/Breadcrumbs';
import ContentBlock from 'components/ContentBlock';
import Card from 'components/Card';
import Modal from 'components/Modal';
import ContourForm from 'components/ContourForm';

import { useSelector } from 'react-redux';
import { Contours, Operations } from 'types/part';

import {
  Block,
  Container,
  Content,
  AddBtn,
  IconAdd,
  Title,
  TextAdd,
} from './style';

const breadcrumbsItems = [
  {
    label: 'Grupo de Trabalho',
    url: '/workgroup',
    isActive: true,
  },
];

const WorkGroup: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
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
          <ContentBlock ref={containerRef}>
            <div>
              <AddBtn onClick={() => setIsModalOpen(true)}>
                <IconAdd className="icon-add" />
                <TextAdd>Cadastrar Contorno</TextAdd>
              </AddBtn>
              {contours.map((contour) => (
                <Card
                  key={contour.id}
                  content={contour}
                  variation="contour"
                  containerRef={containerRef}
                />
              ))}
            </div>
          </ContentBlock>
        </Block>
        <Block>
          <Title>Sequência de Execução</Title>
          <ContentBlock ref={containerRef}>
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
                      containerRef={containerRef}
                    />
                  );
                });
              })}
              {/* <Card
                content={card2}
                variation="operation"
                containerRef={containerRef}
              />
              <Card
                content={card3}
                variation="operation"
                containerRef={containerRef}
              /> */}
            </div>
          </ContentBlock>
        </Block>
      </Content>
    </Container>
  );
};

export default WorkGroup;
