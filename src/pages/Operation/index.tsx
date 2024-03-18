import React from 'react';

import Breadcrumbs from 'components/Breadcrumbs';

import { Container } from './style';

const breadcrumbsItems = [
  {
    label: 'Grupo de Trabalho',
    url: '/workgroup',
    isActive: false,
  },
  {
    label: 'Operation Test',
    url: '/operation',
    isActive: true,
  },
];

const Operation: React.FC = () => {
  return (
    <Container>
      <Breadcrumbs items={breadcrumbsItems} />
    </Container>
  );
};

export default Operation;
