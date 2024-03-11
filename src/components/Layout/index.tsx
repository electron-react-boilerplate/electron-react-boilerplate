import React from 'react';
import SideMenu from 'components/SideMenu';
import Header from 'components/Header';

import { LayoutContainer, PageContainer, Page } from './styles';

interface LayoutProps {
  children: React.ReactChild;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <PageContainer>
        <SideMenu />
        <Page>{children}</Page>
      </PageContainer>
    </LayoutContainer>
  );
};

export default Layout;
