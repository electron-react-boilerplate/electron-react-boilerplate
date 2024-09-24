// Card.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'components/Modal';
import ConfirmAction from 'components/ConfirmAction';
import Icon from 'components/Icon';
import MoreMenu from 'components/MoreMenu';
import GrindingTypeLabel from 'components/GrindingTypeLabel';

import { colors } from 'styles/global.styles';

import {
  addContour,
  addContourToOperation,
  changeContourPositionAtOperation,
  removeContour,
} from 'state/part/partSlice';
import { ContourType, Operations } from 'types/part';
import { MenuItem } from 'components/MoreMenu/interface';
import { CardProps } from './interface';

import {
  Container,
  ContentLeft,
  ContentRight,
  Edit,
  Name,
  LinkStyled,
  Toggle,
  Remove,
  Up,
  Down,
  UpDownContainer,
  Drag,
} from './styles';

const Card: React.FC<CardProps> = ({
  content,
  variation,
  removeFromOperation,
}) => {
  const dispatch = useDispatch();
  const operations = useSelector(
    (state: { part: { operations: Operations } }) => state.part.operations,
  );
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

  const moreMenuItems: MenuItem[] = [
    {
      name: 'Adicionar à Sequência',
      subItems: operations.map((operation) => ({
        name: operation.name,
        action: () =>
          dispatch(
            addContourToOperation({
              operationId: operation.id,
              contourId: content.id,
            }),
          ),
      })),
    },
    { name: 'Duplicar', action: duplicateContour },
    { name: 'Excluir', action: () => setIsModalOpen(true) },
  ];

  const handleMoveUp = () => {
    if (content.operationId) {
      dispatch(
        changeContourPositionAtOperation({
          contourId: content.id,
          direction: 'up',
          operationId: content.operationId,
        }),
      );
    }
  };

  const handleMoveDown = () => {
    if (content.operationId) {
      dispatch(
        changeContourPositionAtOperation({
          contourId: content.id,
          direction: 'down',
          operationId: content.operationId,
        }),
      );
    }
  };

  return (
    <Container isActive={isCardActive} isOperation={variation}>
      <Modal
        title="Deseja excluir contorno?"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variation="danger"
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
        <GrindingTypeLabel
          contourType={content.type as ContourType}
          fontSize="14px"
        />
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
          <MoreMenu menuItems={moreMenuItems as MenuItem[]} />
        ) : (
          <Remove onClick={removeFromOperation}>
            <Icon className="icon-x" color={colors.white} fontSize="28px" />
          </Remove>
        )}
      </ContentRight>
    </Container>
  );
};

export default Card;
