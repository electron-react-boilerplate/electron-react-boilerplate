import React from 'react';
import * as S from './sidebar.styled';
import InputSearch from 'components/input-search/input-search';
import ResultsList from './results-list';

const Sidebar: React.FC = () => {
  return (
    <S.SideBar>
      <S.AddSnippet onClick={() => console.log('open create snippet modal')}>
        New Snippet
      </S.AddSnippet>
      <InputSearch />
      <ResultsList />
    </S.SideBar>
  );
};

export default Sidebar;
