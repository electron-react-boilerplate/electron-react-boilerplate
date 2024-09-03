import styled from 'styled-components';
import { colors } from 'styles/global.styles';

export const Container = styled.div`
  padding: 16px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
  padding: 16px 0;
  border-bottom: 1px solid ${colors.greyDark};

  &:first-child {
    padding-top: 0;
  }
`;

export const ProgramCode = styled.p`
  font-weight: bold;
  margin-bottom: 4px;
`;

export const Result = styled.p`
  color: ${colors.red};
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ResultDescription = styled.p`
  color: ${colors.greyFont};
`;
