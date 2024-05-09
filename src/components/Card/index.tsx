// Card.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import Modal from 'components/Modal';
import ConfirmAction from 'components/ConfirmAction';
import {
  addContour,
  addContourToOperation,
  changeContourPositionOnOperation,
  removeContour,
  removeContourFromOperation,
} from 'state/part/partSlice';
import { ContourType } from 'types/part';

import { CardProps } from './interface';
import {
  Container,
  ContentLeft,
  ContentRight,
  Edit,
  IconEdit,
  IconMenu,
  Name,
  Menu,
  Type,
  SubMenuDown,
  SubButton,
  LinkStyled,
  Toggle,
  IconToggle,
  Remove,
  IconRemove,
  Up,
  Down,
  IconUpDown,
  UpDownContainer,
  Drag,
  IconDrag,
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

  const addToOperation = () => {
    dispatch(addContourToOperation(content.id));
  };

  const removeFromOperation = () => {
    dispatch(removeContourFromOperation(content.id));
  };

  const handleMoveUp = () => {
    dispatch(
      changeContourPositionOnOperation({
        contourId: content.id,
        direction: 'up',
      }),
    );
  };

  const handleMoveDown = () => {
    dispatch(
      changeContourPositionOnOperation({
        contourId: content.id,
        direction: 'down',
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
          <>
            <Toggle onClick={() => toggleCard()}>
              {isCardActive ? (
                <IconToggle className="icon-panorama_fisheye" />
              ) : (
                <IconToggle className="icon-check_circle" />
              )}
            </Toggle>
            <UpDownContainer>
              <Up onClick={() => handleMoveUp()}>
                <IconUpDown className="icon-expand_less" />
              </Up>
              <Down onClick={() => handleMoveDown()}>
                <IconUpDown className="icon-expand_more" />
              </Down>
            </UpDownContainer>
          </>
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
                <SubButton onClick={() => addToOperation()}>
                  Adicionar à Sequência
                </SubButton>
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
          <Remove onClick={() => removeFromOperation()}>
            <IconRemove className="icon-x" />
          </Remove>
        )}
      </ContentRight>
    </Container>
  );
};

export default Card;
