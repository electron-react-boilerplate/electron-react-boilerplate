// Types
export type OperationType = 'Internal' | 'External';

// Interfaces
export interface Activities {
  id: number;
  xaxis: string;
  zaxis: string;
  fvalue: string;
  actionValue: string;
  aParamId: string | null;
  aParamValue: string | null;
  bParamId: string | null;
  bParamValue: string | null;
  cParamId: string | null;
  cParamValue: string | null;
}

export interface Operations {
  id: number;
  name: string;
  type: OperationType;
  activities: Activities[];
}

export interface Part {
  id: number;
  name: string;
  operations: Operations;
}
