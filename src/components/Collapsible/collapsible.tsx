import React, { useState } from 'react';
import * as S from './collapsible.styled';
import { Animation } from 'rsuite';
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';

interface CollapsibleProps {
  open?: boolean;
  title: string;
  children: React.ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  open = false,
  title,
  children,
}) => {
  const [show, setShow] = useState(open);
  return (
    <S.CollapsibleContainer>
      <S.Headline onClick={() => setShow(!show)}>
        {show ? <ArrowDownIcon /> : <ArrowRightIcon />}
        {title}
      </S.Headline>
      <S.CollapsibleContent>
        <Animation.Collapse in={show}>
          {(props, ref) => (
            <div {...props} ref={ref}>
              {children}
            </div>
          )}
        </Animation.Collapse>
      </S.CollapsibleContent>
    </S.CollapsibleContainer>
  );
};

export default Collapsible;
