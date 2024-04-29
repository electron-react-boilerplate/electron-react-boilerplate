import React, { LegacyRef } from 'react';
import { ContentBlockProps } from './interface';
import { Block } from './styles';

const ContentBlock: React.FC<ContentBlockProps> = ({ children, ref }) => {
  return <Block ref={ref as LegacyRef<HTMLDivElement>}>{children}</Block>;
};

export default ContentBlock;
