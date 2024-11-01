// Types
export type ContourType = 'Internal' | 'External';

// Interfaces
export interface ActivitiyItem {
  id: number;
  xaxis: string;
  zaxis: string;
  fvalue: string;
  actionCode: string;
  aParamId: string;
  aParamValue: string | null;
  bParamId: string;
  bParamValue: string | null;
  cParamId: string;
  cParamValue: string | null;
}

export interface Activities extends Array<ActivitiyItem> {}

export interface ContourItem {
  id: number;
  name: string;
  type: ContourType;
  activities: Activities;
}

export interface Contours extends Array<ContourItem> {}

export interface OperationItem {
  id: number;
  name: string;
  toolId: number;
  bAxisAngle: number;
  contoursIds: number[];
  contoursIdsExcluded?: number[];
}

export interface Operations extends Array<OperationItem> {}

export interface Part {
  id: string;
  contours: Contours;
  operations: Operations;
}
