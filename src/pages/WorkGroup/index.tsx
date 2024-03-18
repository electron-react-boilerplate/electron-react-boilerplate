import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs';
import { Container } from './style';

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
      <Link to="/operation">Operation Test</Link>
    </Container>
  );
};

export default WorkGroup;
