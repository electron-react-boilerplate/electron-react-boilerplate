import React from 'react';
import * as S from './contact.styled';
import { ReactComponent as Instagram } from '../../../assets/Instagram.svg';
import { ReactComponent as Github } from '../../../assets/github.svg';

const SnippetsPage: React.FC = () => {
  return (
    <S.ContactPage>
      <h2>What is going on?</h2>
      <p>
        If you need to notify any bug, new feature{' '}
        <a href="mailto:lopezespinosjavier+snippetapp@gmail.com">
          send me an email
        </a>{' '}
        and I will answer as soon as posible
      </p>
      <p>You can also follow me on IG and GitHub to follow more updates:</p>
      <S.Icons>
        <a href="https://www.instagram.com/coke_javier/" target="_blank">
          <Instagram />
        </a>
        <a href="https://github.com/Jle10/customSnippet" target="_blank">
          <Github />
        </a>
      </S.Icons>
    </S.ContactPage>
  );
};

export default SnippetsPage;
