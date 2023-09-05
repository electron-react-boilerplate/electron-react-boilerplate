import React from 'react';
import * as S from './results-list.styled';
import { useAtom } from 'jotai';
import {
  snippetsAtom,
  changeElementAtom,
  initialElementAtom,
} from 'atoms/atoms';
import { SnippetType } from 'types/snippets';

const ResultsList: React.FC<{ search?: string }> = ({ search }) => {
  const [listData] = useAtom(snippetsAtom);
  const [selected] = useAtom(initialElementAtom);
  const [, selectNewItem] = useAtom(changeElementAtom);
  let newList = listData;
  if (search) {
    newList = listData.filter((element: SnippetType) => {
      const keywordMatch = element.keyword[0].toLowerCase().includes(search);

      return keywordMatch;
    });
  }

  return (
    <S.ResultsList bordered={!!newList.length}>
      {newList.length ? (
        newList.map((item: SnippetType) => (
          <S.ResultElement
            onClick={() => selectNewItem(item)}
            key={item.keyword[0]}
            selected={item.keyword === selected?.keyword}
          >
            {item.keyword || '-'}
          </S.ResultElement>
        ))
      ) : (
        <S.NoMatches>Sin resultados...</S.NoMatches>
      )}
    </S.ResultsList>
  );
};

export default ResultsList;
