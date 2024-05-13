// Card.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Modal from 'components/Modal';
import ConfirmAction from 'components/ConfirmAction';
import Icon from 'components/Icon';
import MoreMenu from 'components/MoreMenu';
import { SubMenuItem } from 'components/MoreMenu/interface';

import {
  addContour,
  addContourToOperation,
  changeContourPositionOnOperation,
  removeContour,
  removeContourFromOperation,
} from 'state/part/partSlice';

import { ContourType } from 'types/part';
import { colors } from 'styles/global.styles';
import { CardProps } from './interface';
import {
  Container,
  ContentLeft,
  ContentRight,
  Edit,
  Name,
  Type,
  LinkStyled,
  Toggle,
  Remove,
  Up,
  Down,
  UpDownContainer,
  Drag,
} from './styles';

const Card: React.FC<CardProps> = ({ content, variation }) => {
  const dispatch = useDispatch();
  const [isCardActive, setIsCardActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const moreMenuItems: SubMenuItem[] = [
    { name: 'Adicionar à Sequência', action: addToOperation },
    { name: 'Duplicar', action: duplicateContour },
    { name: 'Excluir', action: () => setIsModalOpen(true) },
  ];

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
          <Icon
            className="icon-drag_indicator"
            color={colors.greyDark}
            fontSize="24px"
          />
        </Drag>
        {variation === 'operation' && (
          <>
            <Toggle onClick={() => toggleCard()}>
              {isCardActive ? (
                <Icon
                  className="icon-panorama_fisheye"
                  color={colors.green}
                  fontSize="24px"
                />
              ) : (
                <Icon
                  className="icon-check_circle"
                  color={colors.green}
                  fontSize="24px"
                />
              )}
            </Toggle>
            <UpDownContainer>
              <Up onClick={() => handleMoveUp()}>
                <Icon
                  className="icon-expand_less"
                  color={colors.greyFont}
                  fontSize="28px"
                />
              </Up>
              <Down onClick={() => handleMoveDown()}>
                <Icon
                  className="icon-expand_more"
                  color={colors.greyFont}
                  fontSize="28px"
                />
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
              <Icon
                className="icon-create"
                color={colors.white}
                fontSize="28px"
              />
            </LinkStyled>
          </Edit>
        )}
        {variation === 'contour' ? (
          <MoreMenu submenuItems={moreMenuItems as SubMenuItem[]} />
        ) : (
          <Remove onClick={() => removeFromOperation()}>
            <Icon className="icon-x" color={colors.white} fontSize="28px" />
          </Remove>
        )}
      </ContentRight>
    </Container>
  );
};

export default Card;
