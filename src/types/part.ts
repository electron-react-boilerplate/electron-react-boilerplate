// Types
export type ContourType = 1 | 2;

// Interfaces
export interface ActivitiyItem {
  id: number;
  xaxis: string;
  zaxis: string;
  fvalue: string;
  actionCode: string;
  param1Id: string;
  param1Value: string | null;
  param2Id: string;
  param2Value: string | null;
  param3Id: string;
  param3Value: string | null;
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
