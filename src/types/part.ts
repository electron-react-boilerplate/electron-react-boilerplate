import {
  TYPE_EXTERNAL,
  TYPE_INTERNAL,
  MACHINING_GRINDING,
  MACHINING_DRESSING,
} from 'utils/constants';

// Types
export type ContourType = typeof TYPE_EXTERNAL | typeof TYPE_INTERNAL;
export type Machining = typeof MACHINING_GRINDING | typeof MACHINING_DRESSING;

// Interfaces

export interface ActionParamItem {
  id: string;
  fakeId?: string;
  placeholder: string;
}

export interface ActionParams extends Array<ActionParamItem> {}

export interface ActivitiyItem {
  id: number;
  actionCode: string;
  actionParams: ActionParams;
}

export interface Activities extends Array<ActivitiyItem> {}

export interface ContourItem {
  id: number;
  name: string;
  machining: Machining;
  type: ContourType;
  activities: Activities;
}

export interface Contours extends Array<ContourItem> {}

export interface OperationItem {
  id: number;
  name: string;
  toolId: number;
  bAxisAngle: number;
  xSafetyDistance: number;
  zSafetyDistance: number;
  contoursIds: number[];
  contoursIdsExcluded?: number[];
}

export interface Operations extends Array<OperationItem> {}

export interface Part {
  id: string;
  contours: Contours;
  operations: Operations;
}
