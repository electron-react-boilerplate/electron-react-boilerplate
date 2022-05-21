

export enum StoreType {
  onAddConnection = 'onAddConnection',
  checkConnection = 'checkConnection',
}

export interface StoreTypes {
  type: StoreType;
  payload?: any;
}

export interface HomeState {
  // 滑动侧边栏的状态
  sideSheetVis: boolean;
  // 是否显示侧边栏
  sideSheetShow: boolean;
}

export interface HomeAction {
  type: StoreTypes;
  payload?: any;
}
