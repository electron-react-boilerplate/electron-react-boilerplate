import React, { startTransition } from 'react';
import * as S from './navbar.styled';
import logo from '/assets/icons/CustomSnippetTrans.png';
import { useAtom } from 'jotai';
import { tabSelected } from 'atoms/atoms';

const tabs = [
  {
    id: 'snippets',
    value: 'Snippets',
  },
  {
    id: 'autocompletes',
    value: 'Autocompletes',
  },
  {
    id: 'contact',
    value: 'Contact',
  },
];

const NavBar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useAtom(tabSelected);

  return (
    <S.NavBarWrapper>
      <S.MainLogo>
        <img alt="CustomSnippet logo" src={logo} />
      </S.MainLogo>
      <S.Tabs>
        {tabs.map((tab) => (
          <S.Tab
            selected={selectedTab === tab.id}
            key={tab.id}
            onClick={() => {
              startTransition(() => {
                setSelectedTab(tab.id);
              });
            }}
          >
            {tab.value}
          </S.Tab>
        ))}
      </S.Tabs>
    </S.NavBarWrapper>
  );
};

export default NavBar;
