import React from 'react';
import * as S from './sidebar.styled';
import InputSearch from 'components/input-search/input-search';
import { Button } from 'rsuite';

const Sidebar: React.FC = () => {
  return (
    <S.SideBar>
      <Button
        appearance="primary"
        onClick={() => console.log('open create snippet modal')}
      >
        New Snippet
      </Button>
      <InputSearch />
    </S.SideBar>
  );
};

export default Sidebar;
