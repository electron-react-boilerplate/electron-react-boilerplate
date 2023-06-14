import React from 'react';
import * as S from './results-list.styled';
import { useAtom } from 'jotai';
import { data, changeElement, initialElement } from 'atoms/atoms';

const ResultsList: React.FC<{ search?: string }> = ({ search }) => {
  const [listData] = useAtom(data);
  const [, selectNewItem] = useAtom(changeElement);
  const [selected] = useAtom(initialElement);
  let newList = listData;
  if (search) {
    newList = listData.filter((element) => {
      const keywordMatch = element.keyword.toLowerCase().includes(search);
      // const textMatch = element.text.toLowerCase().includes(search);

      return keywordMatch;
    });
  }

  return (
    <S.ResultsList bordered={!!newList.length}>
      {newList.length ? (
        newList.map((item) => (
          <S.ResultElement
            onClick={() => selectNewItem(item)}
            key={item.keyword}
            selected={item.keyword === selected?.keyword}
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
