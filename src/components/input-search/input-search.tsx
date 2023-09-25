import React, { useEffect, useState } from 'react';
import * as S from './input-search.styled';
import ResultsList from 'renderer/sidebar/results-list/results-list';
import SearchIcon from '@rsuite/icons/Search';
import Clear from '@rsuite/icons/CloseOutline';
import { Input, InputGroup } from 'rsuite';
import { snippetsAtom } from 'atoms/atoms';
import { useAtom } from 'jotai';

const InputSearch: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const searchNoCapsNoBlanks = search?.trim().toLowerCase();

  const [isAutoCopy, setAutoCopy] = useState<any>('');
  const [snippets] = useAtom(snippetsAtom);

  useEffect(() => {
    window.electron.ipcRenderer.on('snippetWindow', (args) => {
      setAutoCopy(true);
      const newSearch = String(args).trim().toLowerCase();
      const filteredList = snippets.filter((snippet) =>
        snippet.keyword.toLowerCase().includes(newSearch)
      );

      if (filteredList.length === 1 && !searchNoCapsNoBlanks)
        window.electron.ipcRenderer.sendMessage('emit-copied-notification');
      args && setSearch(String(args));
    });
  }, []);

  return (
    <>
      <S.InputSearch inside>
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
        <Input
          value={search}
          placeholder="Search..."
          onChange={(newSearch) => {
            setSearch(newSearch);
            setAutoCopy('');
          }}
        />
        <InputGroup.Button
          onClick={() => {
            setSearch('');
            setAutoCopy('');
          }}
        >
          <Clear />
        </InputGroup.Button>
      </S.InputSearch>
      <ResultsList search={search} autoCopy={isAutoCopy} />
    </>
  );
};

export default InputSearch;
