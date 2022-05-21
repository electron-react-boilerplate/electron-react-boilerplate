
import { HomeState, StoreTypes, StoreType } from "./type"


export const HomeStore :HomeState = {
  sideSheetVis: false,
  sideSheetShow: false,
}

export function HomeReducer (state: HomeState, action: StoreTypes) {
  switch (action.type) {
    case StoreType.onAddConnection:
      return { state: !state.sideSheetVis}
    case StoreType.checkConnection:
      return { state: !state.sideSheetShow}
    default:
      return state
  }
}
