import React from 'react';
import { ContentBlockProps } from './interface';
import { Block } from './styles';

const ContentBlock: React.FC<ContentBlockProps> = ({ children }) => {
  return <Block>{children}</Block>;
};

export default ContentBlock;
