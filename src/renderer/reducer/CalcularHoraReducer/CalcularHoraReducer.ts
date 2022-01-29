import { ItemHistoricoTempoHora } from '@App/components/HistoricoTempoHora/type';

export interface CalcularHoraReducerStateType {
  valores: ItemHistoricoTempoHora[];
}

export const initialState: CalcularHoraReducerStateType = {
  valores: [],
};

export type CalcularHoraReducerAction = {
  type: 'Add';
  item: ItemHistoricoTempoHora;
};

export function calcularHoraReducer(
  state: CalcularHoraReducerStateType,
  action: CalcularHoraReducerAction
): CalcularHoraReducerStateType {
  switch (action.type) {
    case 'Add':
      return { valores: [...state.valores, action.item] };
    default:
      throw Error('error');
  }
}
