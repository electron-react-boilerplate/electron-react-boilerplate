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
    label: 'Operation',
    url: '/operation',
    isActive: true,
  },
];

const Operation: React.FC = () => {
  return (
    <Container>
      <Breadcrumbs items={breadcrumbsItems} />
      <h1>Operation</h1>
      <form>
        <button
          type="button"
          onClick={() => {
            window.electron.store.set('foo', 'asdasdas');
          }}
        >
          Set
        </button>
        <button
          type="button"
          onClick={() => {
            console.log(window.electron.store.get('foo'));
          }}
        >
          Get
        </button>
      </form>
    </Container>
  );
};

export default Operation;
