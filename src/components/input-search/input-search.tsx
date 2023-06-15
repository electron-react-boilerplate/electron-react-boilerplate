import React, { useState } from 'react';
import * as S from './input-search.styled';
import ResultsList from 'renderer/sidebar/results-list/results-list';
import SearchIcon from '@rsuite/icons/Search';
import Clear from '@rsuite/icons/CloseOutline';
import { Input, InputGroup } from 'rsuite';

const InputSearch: React.FC = () => {
  const [search, setSearch] = useState<string>('');

  return (
    <>
      <S.InputSearch inside>
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
        <Input
          value={search}
          placeholder="Search..."
          onChange={(newSearch) => setSearch(newSearch)}
        />
        <InputGroup.Button onClick={() => setSearch('')}>
          <Clear />
        </InputGroup.Button>
      </S.InputSearch>
      <ResultsList search={search?.toLowerCase()} />
    </>
  );
};

export default InputSearch;
