import styled from 'styled-components';
import { PageTitle, PageContent } from 'styles/Components';
import { colors } from 'styles/global.styles';

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled(PageContent)``;

export const Title = styled(PageTitle)``;

export const Block = styled.div`
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
  border: 0;
  box-sizing: border-box;
  padding: 10px 10px;
  width: 100%;
  font-size: 16px;
`;

export const TableSelect = styled.select`
  background-color: ${colors.white};
  border: 0;
  box-sizing: border-box;
  padding: 10px 10px;
  width: 100%;
  min-width: 200px;
  font-size: 16px;
`;

export const TableDContent = styled.div`
  position: relative;
  height: 40px;
  width: 100%;
`;

export const TableInputTextLabeled = styled.input`
  background-color: ${colors.white};
  border: 0;
  box-sizing: border-box;
  padding: 10px 10px 10px 35px;
  width: 100%;
  font-size: 16px;
`;

export const TableInputLabel = styled.label`
  position: absolute;
  top: 0;
  width: 30px;
  height: 40px;
  line-height: 30px;
  background-color: ${colors.greyMedium};
  color: ${colors.greyFont};
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
`;
