import React from 'react';

type Variations = 'contour' | 'operation';

export interface CardData {
  id: number;
  name: string;
  type: string;
}

export interface CardProps {
  content: CardData;
  variation: Variations;
  containerRef: React.RefObject<HTMLElement>;
}
