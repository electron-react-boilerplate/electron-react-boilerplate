import styled from 'styled-components';
import { PageTitle, PageContent } from 'styles/Components';
import { colors } from 'styles/global.styles';

export const Container = styled.div`
  width: 100%;
  opacity: 0;
  transition: all 1s;

  &.loaded {
    opacity: 1;
  }
`;

export const Text = styled.p`
  color: ${colors.blackLight};
  text-align: right;
`;

export const Content = styled(PageContent)`
  text-align: center;
  position: relative;
  /* opacity: 0.8; */

  img {
    width: 100%;
    height: calc(100vh - 180px);
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 1)
    );
  }
`;

export const Title = styled(PageTitle)``;
