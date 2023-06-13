import React, { useState } from 'react';
import * as S from './results-list.styled';
import { useAtom } from 'jotai';
import { data, activeElement } from 'atoms/atoms';

const ResultsList: React.FC<{ search?: string }> = ({ search }) => {
  const [listData] = useAtom(data);
  const [selected, setSelected] = useAtom(activeElement);
  let newList = listData;
  if (search) {
    newList = listData.filter((element) => {
      const keywordMatch = element.keyword.toLowerCase().includes(search);
      const textMatch = element.text.toLowerCase().includes(search);

      return keywordMatch || textMatch;
    });
  }

  return (
    <S.ResultsList bordered={!!newList.length}>
      {newList.length ? (
        newList.map((item) => (
          <S.ResultElement
            onClick={() => setSelected(item)}
            key={item.keyword}
            selected={item.keyword === selected.keyword}
          >
            {item.keyword ?? '-'}
          </S.ResultElement>
        ))
      ) : (
        <S.NoMatches>Sin resultados...</S.NoMatches>
      )}
    </S.ResultsList>
  );
};

export default ResultsList;
