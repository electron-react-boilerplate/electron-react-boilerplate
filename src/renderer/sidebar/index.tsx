import React from 'react';
import * as S from './sidebar.styled';
import InputSearch from 'components/input-search/input-search';
import CreateButton from './create-button/create-button';

const Sidebar: React.FC = () => {
  return (
    <S.SideBar>
      <CreateButton />
      <InputSearch />
    </S.SideBar>
  );
};

export default Sidebar;
