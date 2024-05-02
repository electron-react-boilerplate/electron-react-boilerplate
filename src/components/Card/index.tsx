// Card.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import Modal from 'components/Modal';
import ConfirmAction from 'components/ConfirmAction';
import { addContour, removeContour } from 'state/part/partSlice';
import { ContourType } from 'types/part';

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
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isCardActive, setIsCardActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCard = () => {
    setIsCardActive(!isCardActive);
  };

  const excludeContour = () => {
    dispatch(removeContour(content.id));
  };

  const duplicateContour = () => {
    dispatch(
      addContour({
        ...content,
        name: `${content.name} (Cópia)`,
        type: content.type as ContourType,
      }),
    );
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
      <Modal
        title="Deseja excluir Contorno?"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ConfirmAction
          onConfirm={() => excludeContour()}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
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
            <LinkStyled to={`/contour/${content.id}`}>
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
                <SubButton onClick={() => duplicateContour()}>
                  Duplicar
                </SubButton>
                {/* <SubButton>Renomear</SubButton> */}
                <SubButton onClick={() => setIsModalOpen(true)}>
                  Excluir
                </SubButton>
              </SubMenuDown>
            )}
          </Menu>
        ) : (
          <Remove>
            <LinkStyled to="/contour">
              <IconRemove className="icon-x" />
            </LinkStyled>
          </Remove>
        )}
      </ContentRight>
    </Container>
  );
};

export default Card;
