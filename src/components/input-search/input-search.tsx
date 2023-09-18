import React, { useEffect, useState } from 'react';
import * as S from './input-search.styled';
import ResultsList from 'renderer/sidebar/results-list/results-list';
import SearchIcon from '@rsuite/icons/Search';
import Clear from '@rsuite/icons/CloseOutline';
import { Input, InputGroup } from 'rsuite';

const InputSearch: React.FC<{ initial?: string }> = ({ initial }) => {
  const [search, setSearch] = useState<string | undefined>();
  const [autoCopy, setAutoCopy] = useState(false);

  useEffect(() => {
    if (initial) {
      setSearch(initial);
      setAutoCopy(true);
    }

    return () => {
      setAutoCopy(false);
    };
  }, [initial]);
  return (
    <>
      <S.InputSearch inside>
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
        <Input
          value={search || ''}
          placeholder="Search..."
          onChange={(newSearch) => {
            setSearch(newSearch);
            autoCopy && setAutoCopy(false);
          }}
        />
        <InputGroup.Button
          onClick={() => {
            setSearch('');
            autoCopy && setAutoCopy(false);
          }}
        >
          <Clear />
        </InputGroup.Button>
      </S.InputSearch>
      <ResultsList search={search?.toLowerCase()} autoCopy={autoCopy} />
    </>
  );
};

export default InputSearch;
