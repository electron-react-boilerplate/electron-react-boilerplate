import React from 'react';
import * as S from './input-search.styled';
import SearchIcon from '@rsuite/icons/Search';
import { InputGroup } from 'rsuite';

const Sidebar: React.FC = () => {
  return (
    <InputGroup inside>
      <S.InputSearch />
      <InputGroup.Button>
        <SearchIcon />
      </InputGroup.Button>
    </InputGroup>
  );
};

export default Sidebar;
