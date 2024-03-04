import React from 'react';
import HeaderMenu from 'components/HeaderMenu';

import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.header}>
      adasdasds
      <HeaderMenu />
      {children}
    </div>
  );
};

export default Layout;
