import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs';
import { Container, Content, Title } from './style';

const breadcrumbsItems = [
  {
    label: 'Grupo de Trabalho',
    url: '/workgroup',
    isActive: true,
  },
];

const WorkGroup: React.FC = () => {
  return (
    <Container>
      <Breadcrumbs items={breadcrumbsItems} />
      <Content>
        <Title>Grupo de Trabalho</Title>
        <p>Lista de operação:</p>
        <br />
        <ul>
          <li>
            <Link to="/operation">Operação</Link>
          </li>
        </ul>
      </Content>
    </Container>
  );
};

export default WorkGroup;
