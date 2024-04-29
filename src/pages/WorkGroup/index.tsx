import React, { useRef } from 'react';

import Breadcrumbs from 'components/Breadcrumbs';
import ContentBlock from 'components/ContentBlock';
import Card from 'components/Card';

import { Block, Container, Content, AddBtn, IconAdd, Title } from './style';

const breadcrumbsItems = [
  {
    label: 'Grupo de Trabalho',
    url: '/workgroup',
    isActive: true,
  },
];

// just for dev and test
const card = {
  name: 'Diametro',
  type: 'Interno',
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
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
              <Card content={card} containerRef={containerRef} />
            </div>
            <AddBtn>
              <IconAdd className="icon-add" />
            </AddBtn>
          </ContentBlock>
        </Block>
        <Block>
          <Title>Sequência de Execução</Title>
          {/* <ContentBlock>asd</ContentBlock> */}
        </Block>
      </Content>
    </Container>
  );
};

export default WorkGroup;
