import styled from 'styled-components';
import { PageTitle, PageContent, ContentBlock } from 'styles/Components';
import { colors, measures } from 'styles/global.styles';

import LinkAction from 'components/LinkAction';
import Icon from 'components/Icon';

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled(PageContent)``;

export const PageHead = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${measures.gutter};
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const DressingLabelsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const DressingLabels = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  gap: ${measures.gutter};
  color: ${colors.greyFont};
`;

export const DressingItem = styled.div`
  margin-bottom: 24px;
`;

export const SLinkAction = styled(LinkAction)`
  font-weight: bold;
  color: ${colors.blueDark};
`;

export const Title = styled(PageTitle)`
  display: block;
  margin: 0;
`;

export const TitleEdit = styled.input`
  font-size: 34px;
  font-weight: bold;
  color: ${colors.greyFont};
  background-color: ${colors.grey};
  border: 0;
`;

export const TitleEditBtn = styled.button`
  background-color: inherit;
  outline: 0;
  border: 0;
  cursor: pointer;
`;

export const TitleEditIconEdit = styled.span`
  font-size: 24px;
  color: ${colors.blue};
`;

export const TitleEditIconDone = styled.span`
  font-size: 24px;
  color: ${colors.greyFont};
`;

export const CodePreviewBtn = styled.button`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  align-self: flex-end;
  background-color: ${colors.blue};
  color: ${colors.white};
  border: 0;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
  border-radius: ${measures.borderRadius};
  padding: 0 10px;
`;

export const BtnText = styled.span`
  margin-left: 5px;
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

export const TableDesc = styled.thead`
  text-align: left;
  font-size: 14px;
`;

export const TableH = styled.th`
  padding: 0 2px 10px 2px;
`;

export const HText = styled.p`
  padding: 5px;
  border-bottom: 1px solid ${colors.greyMedium};
  color: ${colors.greyLogo};
`;

export const HDesc = styled.p`
  padding: 0 5px;
  border-bottom: 0;
  color: ${colors.greyFont};
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

export const TableInput = styled.input`
  background-color: ${colors.white};
  border: 1px solid ${colors.greyMedium};
  box-sizing: border-box;
  padding: 10px 10px;
  width: 100%;
  font-size: 16px;
`;

export const TableDContent = styled.div`
  position: relative;
  height: 40px;
  width: 100%;
`;

export const TableInputLabeled = styled.input`
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

  &::placeholder {
    color: ${colors.greyMedium};
  }
`;

export const TableInputLabel = styled.label`
  position: absolute;
  top: 0;
  width: 30px;
  line-height: 30px;
  background-color: ${colors.greyMedium};
  border-radius: ${measures.borderRadius} 0 0 ${measures.borderRadius};
  color: ${colors.greyLogo};
  padding: 5px;
  height: 100%;
  box-sizing: border-box;
  font-weight: bold;
  text-align: center;
`;

export const TableScroll = styled.div``;

export const ScrollBtn = styled.button<{ color: string }>`
  background-color: ${(props) => props.color};
  border: 0;
  margin: 0;
  font-size: 22px;
  line-height: 22px;
  width: 30px;
  height: 40px;
  padding: 5px 0;
  vertical-align: middle;
  border-radius: ${measures.borderRadius};
  font-weight: bolder;
  cursor: pointer;
  box-sizing: border-box;
`;

export const RotatedIcon = styled(Icon)`
  transform: rotate(-90deg);
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
  border-radius: ${measures.borderRadius};
  cursor: pointer;
`;
