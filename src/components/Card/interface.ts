import React from 'react';

export interface CardData {
  name: string;
  type: string;
}

export interface CardProps {
  content: CardData;
  containerRef: React.RefObject<HTMLElement>;
}
