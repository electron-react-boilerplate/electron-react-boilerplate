import React, { useRef } from 'react';

import Breadcrumbs from 'components/Breadcrumbs';
import ContentBlock from 'components/ContentBlock';
import Card from 'components/Card';

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

//test

// just for dev and test
const card1 = {
  name: 'Diametro',
  type: 'Interno',
};

const card2 = {
  name: 'Diametro DM01',
  type: 'Externo',
};

const card3 = {
  name: 'C01 Contrno',
  type: 'Externo',
};

const card4 = {
  name: 'Nome elemento 01',
  type: 'Externo',
};

const WorkGroup: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  return (
    <Container>
      <Breadcrumbs items={breadcrumbsItems} />
      <Content>
        <Block>
          <Title>Contornos/Elementos</Title>
          <ContentBlock ref={containerRef}>
            <div>
              <AddBtn>
                <IconAdd className="icon-add" />
                <TextAdd>Cadastrar Contorno</TextAdd>
              </AddBtn>
              <Card
                content={card1}
                variation="contour"
                containerRef={containerRef}
              />
              <Card
                content={card2}
                variation="contour"
                containerRef={containerRef}
              />
              <Card
                content={card3}
                variation="contour"
                containerRef={containerRef}
              />
              <Card
                content={card4}
                variation="contour"
                containerRef={containerRef}
              />
              <Card
                content={card2}
                variation="contour"
                containerRef={containerRef}
              />
              <Card
                content={card3}
                variation="contour"
                containerRef={containerRef}
              />
            </div>
          </ContentBlock>
        </Block>
        <Block>
          <Title>Sequência de Execução</Title>
          <ContentBlock ref={containerRef}>
            <div>
              <Card
                content={card2}
                variation="operation"
                containerRef={containerRef}
              />
              <Card
                content={card3}
                variation="operation"
                containerRef={containerRef}
              />
            </div>
          </ContentBlock>
        </Block>
      </Content>
    </Container>
  );
};

export default WorkGroup;
