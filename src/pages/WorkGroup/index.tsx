import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Container } from './style';

const breadcrumbsItems = [
  {
    label: 'Grupo de Trabalho',
    url: '/workgroup',
    isActive: false,
  },
];

const WorkGroup: React.FC = () => {
  return (
    <Container>
      <Breadcrumbs items={breadcrumbsItems} />
      WorkGroup
    </Container>
  );
};

export default WorkGroup;
