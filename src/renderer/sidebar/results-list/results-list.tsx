import React, { useState } from 'react';
import * as S from './results-list.styled';
import CheckRoundIcon from '@rsuite/icons/CheckRound';
import { Input, InputGroup } from 'rsuite';
import { SnippetType } from 'types/snippets';
import { useAtom } from 'jotai';
import {
  snippetsAtom,
  changeElementAtom,
  initialElementAtom,
} from 'atoms/atoms';

type ResultListElement = SnippetType & {
  edition: boolean;
};

const ResultsList: React.FC<{ search?: string; autoCopy?: boolean }> = ({
  search,
  autoCopy,
}) => {
  const [listData, setListData] = useAtom(snippetsAtom);
  const [selected] = useAtom(initialElementAtom);
  const [, selectNewItem] = useAtom(changeElementAtom);
  let newList = listData.map((snippet) => {
    return { ...snippet, edition: false };
  });
  const [isEditing, setIsEditing] = useState(
    Array.from({ length: newList.length }, () => false)
  );
  const [editionError, setEditionError] = useState(false);

  if (search) {
    newList = newList.filter((element: SnippetType) => {
      const keywordMatch = element.keyword.toLowerCase().includes(search);

      return keywordMatch;
    });
    if (autoCopy && newList.length === 1)
      window.electron.ipcRenderer.sendMessage('autoCopy', newList[0].text);
  }

  const handleStartEditing = (index: number) => {
    const newEdition = Array.from({ length: newList.length }, () => false);
    newEdition[index] = true;
    setIsEditing(newEdition);
  };

  const [editedList, setEditList] = useState<SnippetType[]>([]);
  const handleEditKeyword = (newKeyword: string, snippet: SnippetType) => {
    const match = listData
      .map(
        (element) =>
          element.keyword === newKeyword && element.keyword !== snippet.keyword
      )
      .find((match) => match);
    if (!newKeyword.trim() || match) {
      setEditionError(true);
    } else {
      setEditionError(false);
      const newEditedList = listData.map((element) => {
        return {
          ...element,
          keyword:
            element.keyword === snippet.keyword ? newKeyword : element.keyword,
        };
      });
      setEditList(newEditedList);
    }
  };

  const handleSaveKeyword = () => {
    if (!editionError) {
      setIsEditing(Array.from({ length: newList.length }, () => false));
      editedList.length && setListData(editedList);
    }
  };

  return (
    <S.ResultsList $error={editionError} bordered={!!newList.length}>
      {newList.length ? (
        newList.map((item: ResultListElement, index) =>
          isEditing[index] ? (
            <S.InputEdit inside key={item.keyword}>
              <Input
                className="edition-input"
                name={`edit-${item.keyword}`}
                defaultValue={item.keyword}
                onChange={(newKeyword) => handleEditKeyword(newKeyword, item)}
                onBlur={handleSaveKeyword}
                autoFocus={true}
              />
              <InputGroup.Button onClick={handleSaveKeyword}>
                <CheckRoundIcon />
              </InputGroup.Button>
            </S.InputEdit>
          ) : (
            <S.ResultElement
              onClick={() => selectNewItem(item)}
              key={item.keyword}
              selected={item.keyword === selected?.keyword}
            >
              {item.keyword || '-'}
              <S.Edit onClick={() => handleStartEditing(index)} />
            </S.ResultElement>
          )
        )
      ) : (
        <S.NoMatches>Sin resultados...</S.NoMatches>
      )}
    </S.ResultsList>
  );
};

export default ResultsList;
