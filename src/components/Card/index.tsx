// Card.tsx
import React, { useEffect, useRef, useState } from 'react';
import { CardProps } from './interface';
import {
  Container,
  ContentLeft,
  ContentRight,
  Edit,
  IconDrag,
  IconEdit,
  IconMenu,
  Name,
  Menu,
  Type,
  SubMenuDown,
  SubButton,
  LinkStyled,
  Drag,
} from './styles';

const Card: React.FC<CardProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Container>
      <ContentLeft>
        <Drag>
          <IconDrag className="icon-drag_indicator" />
        </Drag>
        <Name>{content.name}</Name>
      </ContentLeft>
      <ContentRight>
        <Type>{content.type}</Type>
        <Edit>
          <LinkStyled to="/operation">
            <IconEdit className="icon-create" />
          </LinkStyled>
        </Edit>
        <Menu
          ref={menuRef as React.RefObject<HTMLButtonElement>}
          onClick={toggleMenu}
        >
          <IconMenu className="icon-more_vert" />
          {isOpen && (
            <SubMenuDown>
              <SubButton>Duplicar</SubButton>
              <SubButton>Renomear</SubButton>
              <SubButton>Excluir</SubButton>
            </SubMenuDown>
          )}
        </Menu>
      </ContentRight>
    </Container>
  );
};

export default Card;
