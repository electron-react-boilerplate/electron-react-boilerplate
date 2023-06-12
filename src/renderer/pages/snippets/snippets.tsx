import React from 'react';
import * as S from './snippets.styled';
import InputTextArea from 'components/textarea/textarea';

const SnippetsPage: React.FC = () => {
  return (
    <S.SnippetsPage>
      <InputTextArea />
    </S.SnippetsPage>
  );
};

export default SnippetsPage;
