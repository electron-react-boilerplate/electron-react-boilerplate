import styled from 'styled-components';
import { PageTitle, PageContent } from 'styles/Components';
import { colors } from 'styles/global.styles';

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled(PageContent)`
  text-align: center;
  position: relative;
  /* opacity: 0.8; */

  img {
    width: auto;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom left,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.7)
    );
  }
`;

export const Title = styled(PageTitle)``;
