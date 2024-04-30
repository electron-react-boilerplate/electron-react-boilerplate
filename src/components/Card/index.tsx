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
  Toggle,
  IconToggle,
  Remove,
  IconRemove,
} from './styles';

const Card: React.FC<CardProps> = ({ content, variation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCardActive, setIsCardActive] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCard = () => {
    setIsCardActive(!isCardActive);
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
    <Container isActive={isCardActive}>
      <ContentLeft>
        <Drag>
          <IconDrag className="icon-drag_indicator" />
        </Drag>
        {variation === 'operation' && (
          <Toggle onClick={() => toggleCard()}>
            {isCardActive ? (
              <IconToggle className="icon-panorama_fisheye" />
            ) : (
              <IconToggle className="icon-check_circle" />
            )}
          </Toggle>
        )}
        <Name>{content.name}</Name>
      </ContentLeft>
      <ContentRight>
        <Type>{content.type}</Type>
        {variation === 'contour' && (
          <Edit>
            <LinkStyled to="/operation">
              <IconEdit className="icon-create" />
            </LinkStyled>
          </Edit>
        )}
        {variation === 'contour' ? (
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
        ) : (
          <Remove>
            <LinkStyled to="/operation">
              <IconRemove className="icon-x" />
            </LinkStyled>
          </Remove>
        )}
      </ContentRight>
    </Container>
  );
};

export default Card;
