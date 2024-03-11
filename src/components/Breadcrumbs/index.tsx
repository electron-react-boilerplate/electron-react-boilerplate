import React from 'react';
import { Container, Nav, List, Item, Link } from './style';

const breadcrumbsItems = [
  {
    label: 'Home',
    url: '/',
    isActive: false,
  },
  {
    label: 'Grupo de Trabalho',
    url: '/',
    isActive: false,
  },
  {
    label: 'Diametro',
    url: '/',
    isActive: true,
  },
];

const Breadcrumbs: React.FC = () => {
  return (
    <Container>
      <Nav>
        <List>
          {breadcrumbsItems.map((item) => (
            <Item key={item.label}>
              <Link href={item.url} isActive={item.isActive}>
                {item.label}
              </Link>
            </Item>
          ))}
        </List>
      </Nav>
    </Container>
  );
};

export default Breadcrumbs;
