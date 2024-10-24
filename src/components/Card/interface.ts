type Variations = 'contour' | 'operation';

export interface CardData {
  operationId?: number;
  id: number;
  name: string;
  type: string;
}

export interface CardProps {
  content: CardData;
  variation: Variations;
  removeFromOperation?: () => void;
  onToggle?: (isActive: boolean) => void;
}
