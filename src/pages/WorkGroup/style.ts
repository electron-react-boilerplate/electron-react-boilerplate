import styled from 'styled-components';
import { PageTitle, PageContent, ContentBlock } from 'styles/Components';
import { colors, measures, shadows } from 'styles/global.styles';

export const Container = styled.div`
  height: 100%;
`;

export const Block = styled.div`
  width: 100%;
`;

export const Content = styled(PageContent)`
  display: flex;
  flex-flow: row nowrap;
  gap: 18px;
  height: 100%;
  max-height: calc(100vh - ${measures.contentBellowBtnToHeader});
`;

export const OpWrapper = styled.div`
  max-height: calc(100vh - ${measures.contentBellowBtnToHeader});
  overflow-y: auto;
`;

export const OpItemHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid ${colors.greyMedium};
`;

export const OpItemHeaderTitle = styled.h3`
  font-size: 20px;
  color: ${colors.blue};
`;

export const OpItemHeaderSubTitle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

export const OpItemHeaderContent = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

export const WheelText = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.black};
`;

export const BAxisAngleText = styled.p`
  font-size: 14px;
  color: ${colors.black};
`;

export const OpItemCards = styled.div`
  min-height: 56px;
  background-color: ${colors.greyPreMedium};
  border: 1px dashed ${colors.greyDark};
`;

export const CContentBlock = styled(ContentBlock)`
  height: calc(100vh - ${measures.contentBellowBtnToHeader});
  overflow: visible;
`;

export const SContentBlock = styled(ContentBlock)`
  margin-bottom: 15px;
`;

export const Title = styled(PageTitle)`
  margin: 0;
  margin-bottom: 24px;
`;

export const ContourBtnsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export const AddBtn = styled.div`
  height: 48px;
  font-size: 16px;
  margin-bottom: 15px;
  width: 100%;
`;

export const IconBtn = styled.div`
  height: 48px;
  font-size: 16px;
`;

export const Wrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;

export const TextAdd = styled.p`
  margin-left: 5px;
  line-height: 100%;
  font-size: 18px;
`;

export const SButton = styled.button`
  border: 0;
  padding: 0;
  margin-right: 10px;
  background-color: transparent;

  &:last-child {
    margin-right: 0;
  }
`;

export const IconButton = styled.button<{ bgColor: string; shadow?: boolean }>`
  margin: 0 10px 0 0;
  padding: 0;
  border: 0;
  background-color: ${({ bgColor }) => bgColor};
  cursor: pointer;
  padding: 7px;
  border-radius: ${measures.borderRadius};
  box-shadow: ${({ shadow }) => (shadow ? shadows.std : 'none')};
  border: 1px solid ${colors.yellow};
`;
