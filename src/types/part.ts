// Types
export type OperationType = 'Internal' | 'External';

// Interfaces
export interface ActivitiyItem {
  id: number;
  xaxis: string;
  zaxis: string;
  fvalue: string;
  actionValue: string;
  aParamId: string;
  aParamValue: string | null;
  bParamId: string;
  bParamValue: string | null;
  cParamId: string;
  cParamValue: string | null;
}

export interface Activities extends Array<ActivitiyItem> {}

export interface OperationItem {
  id: number;
  name: string;
  type: OperationType;
  activities: Activities;
}

export interface Operations extends Array<OperationItem> {}

export interface Part {
  id: number;
  name: string;
  operations: Operations;
}
