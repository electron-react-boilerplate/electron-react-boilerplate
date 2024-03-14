import React from 'react';
import { BreadcrumbsProps } from './interface';
import { Container, Nav, List, Item, ItemLink } from './style';

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <Container>
      <Nav>
        <List>
          {items.map((item: any) => (
            <Item key={item.label}>
              <ItemLink to={item.url} isActive={item.isActive}>
                {item.label}
              </ItemLink>
            </Item>
          ))}
        </List>
      </Nav>
    </Container>
  );
};

export default Breadcrumbs;
