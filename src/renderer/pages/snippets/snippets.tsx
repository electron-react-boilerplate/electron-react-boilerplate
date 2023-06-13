import React from 'react';
import * as S from './snippets.styled';
import InputTextArea from 'components/textarea/textarea';
import { data, activeElement } from 'atoms/atoms';
import { useAtom } from 'jotai';

const SnippetsPage: React.FC = () => {
  const [selected, setSelected] = useAtom(activeElement);
  const [contentValue, setContentValue] = useAtom(data);
  return (
    <S.SnippetsPage>
      <InputTextArea
        value={
          contentValue.find((element) => element.keyword === selected.keyword)
            ?.text
        }
        onChange={(newContent: string) => {
          const newData = contentValue.map((element) => {
            if (element.keyword === selected.keyword)
              return { ...element, text: newContent };
            return element;
          });
          setContentValue(newData);
          setSelected(selected);
        }}
      />
    </S.SnippetsPage>
  );
};

export default SnippetsPage;
