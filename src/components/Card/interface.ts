import { Activities, ContourType, Machining } from 'types/part';

type Variations = 'contour' | 'operation';

export interface CardData {
  operationId?: number;
  id: number;
  name: string;
  machining: Machining;
  type: ContourType;
  activities: Activities;
}

export interface CardProps {
  content: CardData;
  variation: Variations;
  removeFromOperation?: () => void;
  onToggle?: (isActive: boolean) => void;
}
