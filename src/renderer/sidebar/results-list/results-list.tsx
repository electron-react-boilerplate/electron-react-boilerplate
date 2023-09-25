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

const ResultsList: React.FC<{ search?: string; autoCopy?: boolean }> = ({
  search,
  autoCopy,
}) => {
  const [listData, setListData] = useAtom(snippetsAtom);
  const [selected] = useAtom(initialElementAtom);
  const [, selectNewItem] = useAtom(changeElementAtom);
  let newList = listData;
  const [isEditing, setIsEditing] = useState(
    Array.from({ length: newList.length }, () => false)
  );
  const [editionError, setEditionError] = useState(false);

  const searchNoCapsNoBlanks = search?.trim().toLowerCase();
  if (searchNoCapsNoBlanks) {
    newList = newList.filter((element: SnippetType) =>
      element.keyword.toLowerCase().includes(searchNoCapsNoBlanks)
    );

    if (autoCopy && newList.length === 1) {
      window.electron.ipcRenderer.sendMessage('autoCopy', newList[0].text);
      selectNewItem(newList[0]);
    }
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

  const handleSaveKeyword = (index: number) => {
    if (!editionError) {
      setIsEditing(Array.from({ length: newList.length }, () => false));
      editedList.length && setListData(editedList);
      selectNewItem(editedList[index]);
    }
  };

  return (
    <S.ResultsList $error={editionError} bordered={!!newList.length}>
      {newList.length ? (
        newList.map((item: SnippetType, index) =>
          isEditing[index] ? (
            <S.InputEdit inside key={item.keyword}>
              <Input
                className="edition-input"
                name={`edit-${item.keyword}`}
                defaultValue={item.keyword}
                onChange={(newKeyword) => handleEditKeyword(newKeyword, item)}
                onBlur={() => handleSaveKeyword(index)}
                autoFocus={true}
              />
              <InputGroup.Button onClick={() => handleSaveKeyword(index)}>
                <CheckRoundIcon />
              </InputGroup.Button>
            </S.InputEdit>
          ) : (
            <S.ResultElement
              onClick={() => selectNewItem(item)}
              key={item.keyword}
              selected={item.keyword === selected?.keyword}
            >
              <S.ResultKeyword>{item.keyword || '-'}</S.ResultKeyword>
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
