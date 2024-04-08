import styled from 'styled-components';
import { PageContent, ContentBlock } from 'styles/Components';
import { colors } from 'styles/global.styles';

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled(PageContent)``;

export const Title = styled.input`
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 24px;
  color: ${colors.greyFont};
`;

export const Block = styled(ContentBlock)`
  background-color: ${colors.grey};
  width: 100%;
  height: 100%;
  padding: 15px 10px;
  box-sizing: border-box;
`;

export const TableWrapper = styled.div``;

export const Table = styled.table`
  width: 100%;
  table-layout: auto;
`;

export const TableHead = styled.thead`
  text-align: left;
  font-size: 18px;
  font-weight: bold;
`;

export const TableH = styled.th`
  padding: 0 2px 10px 2px;
`;

export const HText = styled.p`
  padding: 5px;
  border-bottom: 1px solid ${colors.greyMedium};
  color: ${colors.greyLogo};
`;

export const TableBody = styled.tbody`
  width: auto;
`;

export const TableD = styled.td`
  padding: 2px;
`;

export const TableIdText = styled.p`
  color: ${colors.greyFont};
  padding: 5px;
`;

export const TableDivision = styled.p`
  color: ${colors.greyDark};
  padding: 5px;
`;

export const TableInputText = styled.input`
  background-color: ${colors.white};
  border: 1px solid ${colors.greyMedium};
  box-sizing: border-box;
  padding: 10px 10px;
  width: 100%;
  font-size: 16px;
`;

export const TableSelect = styled.select`
  background-color: ${colors.white};
  border: 1px solid ${colors.greyMedium};
  box-sizing: border-box;
  padding: 10px 10px;
  width: 100%;
  min-width: 200px;
  font-size: 16px;
  appearance: none; /* Remove a seta padrão */
  background-image: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: 50%;
`;

export const TableSelectOption = styled.option`
  height: 40px;
  line-height: 40px;
`;

export const TableDContent = styled.div`
  position: relative;
  height: 40px;
  width: 100%;
`;

export const TableInputTextLabeled = styled.input`
  background-color: ${colors.white};
  border: 1px solid ${colors.greyMedium};
  box-sizing: border-box;
  padding: 10px 10px 10px 35px;
  height: 40px;
  width: 100%;
  font-size: 16px;

  &:disabled {
    background-color: ${colors.greyMedium};
    opacity: 0.3;
  }
`;

export const TableInputLabel = styled.label`
  position: absolute;
  top: 0;
  width: 30px;
  line-height: 30px;
  background-color: ${colors.greyMedium};
  border-radius: 5px 0 0 5px;
  color: ${colors.greyLogo};
  padding: 5px;
  height: 100%;
  box-sizing: border-box;
  font-weight: bold;
  text-align: center;
`;

export const AddBtn = styled.button`
  background-color: ${colors.green};
  border: 0;
  color: ${colors.white};
  font-size: 18px;
  line-height: 18px;
  width: 30px;
  height: 30px;
  padding: 5px 0;
  vertical-align: middle;
  border-radius: 100%;
  font-weight: bolder;
  cursor: pointer;
`;

export const DeleteBtn = styled.button`
  background-color: ${colors.red};
  border: 0;
  color: ${colors.white};
  font-size: 24px;
  line-height: 24px;
  width: 40px;
  height: 40px;
  padding: 5px 0;
  vertical-align: middle;
  border-radius: 5px;
  cursor: pointer;
`;
