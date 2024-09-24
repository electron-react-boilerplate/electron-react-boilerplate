import styled from 'styled-components';
import { colors } from 'styles/global.styles';

export const Container = styled.div`
  padding: 8px 16px 0 16px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
  padding: 16px 0;
  border-top: 1px solid ${colors.greyDark};

  &:first-child {
    border-top: 0;
    padding-top: 0;
  }
`;

export const ProgramCode = styled.p`
  font-size: 19px;
  margin-bottom: 20px;
`;

export const Name = styled.span`
  color: ${colors.blue};
`;

export const Result = styled.p`
  color: ${colors.red};
  margin-bottom: 10px;
`;

export const ResultDescription = styled.p`
  color: ${colors.greyFont};
`;
