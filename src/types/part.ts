// Types
export type OperationType = 'Internal' | 'External';

// Interfaces

export interface Activities {
  id: number;
  xaxis: string;
  zaxis: string;
  tvalue: string;
  action: string;
  aParamId: string;
  aParamValue: string;
  bParamId: string;
  bParamValue: string;
  cParamId: string;
  cParamValue: string;
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
