import { ItemHistoricoTempoHora } from '@App/components/HistoricoTempoHora/type';
import { ValueSeletorTempoHora } from '@App/components/SeletorTempoHora/type';

export interface CalcularHoraReducerStateType {
  valores: ItemHistoricoTempoHora[];
  horaInicial: ValueSeletorTempoHora;
  horaFinal: ValueSeletorTempoHora;
}

export const initialState: CalcularHoraReducerStateType = {
  valores: [],
  horaInicial: { hora: 9, minuto: 0 },
  horaFinal: { hora: 10, minuto: 0 },
};

export type CalcularHoraReducerAction =
  | {
      type: 'AdicionarItemHistorico';
      payload: {
        item: ItemHistoricoTempoHora;
      };
    }
  | {
      type: 'removerItemHistorico';
      payload: {
        item: ItemHistoricoTempoHora;
      };
    }
  | {
      type: 'alterarHoraInicial';
      payload: {
        horaInicial: ValueSeletorTempoHora;
      };
    }
  | {
      type: 'alterarHoraFinal';
      payload: {
        horaFinal: ValueSeletorTempoHora;
      };
    }
  | {
      type: 'inverterValoresHoras';
    };

export function calcularHoraReducer(
  state: CalcularHoraReducerStateType,
  action: CalcularHoraReducerAction
): CalcularHoraReducerStateType {
  switch (action.type) {
    case 'AdicionarItemHistorico':
      return {
        valores: [...state.valores, action.payload.item],
        horaFinal: state.horaFinal,
        horaInicial: state.horaInicial,
      };
    case 'removerItemHistorico':
      // eslint-disable-next-line no-case-declarations
      const a = [...state.valores];
      a.splice(state.valores.indexOf(action.payload.item), 1);
      return {
        valores: a,
        horaFinal: state.horaFinal,
        horaInicial: state.horaInicial,
      };
    case 'alterarHoraInicial':
      return {
        ...state,
        horaInicial: action.payload.horaInicial,
      };
    case 'alterarHoraFinal':
      return {
        ...state,
        horaFinal: action.payload.horaFinal,
      };
    case 'inverterValoresHoras':
      return {
        ...state,
        horaFinal: state.horaInicial,
        horaInicial: state.horaFinal,
      };
    default:
      throw Error('error');
  }
}
