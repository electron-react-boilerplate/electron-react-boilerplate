import React from 'react';

export interface ContentBlockProps {
  children: React.ReactNode;
  ref: React.RefObject<HTMLElement> | null;
}
