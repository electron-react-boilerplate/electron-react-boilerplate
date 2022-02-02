import { ItemHistoricoTempoHora } from '@App/components/HistoricoTempoHora/type';
import { CalcularHoraRepository } from '@App/service/calcularHora/calcularHoraRepository';
import {
  CalcularHoraReducerAction,
  CalcularHoraReducerStateType,
} from './types';

const calcularHoraRepository = new CalcularHoraRepository();

const subescreverHistoricoStorage = (valores: ItemHistoricoTempoHora[]) => {
  return calcularHoraRepository.AddAllHistorico(valores);
};

const historicoStorage = (): ItemHistoricoTempoHora[] => {
  return calcularHoraRepository.getAllHistorico();
};

function obterCalcularHoraReducerStateStorage(): CalcularHoraReducerStateType {
  return {
    valores: historicoStorage(),
    horaInicial: { hora: 9, minuto: 0 },
    horaFinal: { hora: 10, minuto: 0 },
  };
}

export const initialState: CalcularHoraReducerStateType = {
  valores: [],
  horaInicial: { hora: 9, minuto: 0 },
  horaFinal: { hora: 10, minuto: 0 },
};

export function calcularHoraReducer(
  state: CalcularHoraReducerStateType,
  action: CalcularHoraReducerAction
): CalcularHoraReducerStateType {
  switch (action.type) {
    case 'AdicionarItemHistorico':
      return {
        valores: subescreverHistoricoStorage([
          ...state.valores,
          action.payload.item,
        ]),
        horaFinal: state.horaFinal,
        horaInicial: state.horaInicial,
      };
    case 'removerItemHistorico':
      // eslint-disable-next-line no-case-declarations
      const a = [...state.valores];
      a.splice(state.valores.indexOf(action.payload.item), 1);
      return {
        valores: subescreverHistoricoStorage(a),
        horaFinal: state.horaFinal,
        horaInicial: state.horaInicial,
      };
    case 'resetListaHistorico':
      return {
        ...state,
        valores: subescreverHistoricoStorage([]),
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
    case 'carregarValoresStorage':
      return obterCalcularHoraReducerStateStorage();
    default:
      throw Error('error');
  }
}
// ************************************************
// ************************************************
// ************************************************
// ************************************************
// da para melhor isso com objeto com enun exemplo:
// ************************************************
// ************************************************
// ************************************************
// ************************************************
// ************************************************
//
//
// enum TypeCalcularHoraReducerAction {
//   AdicionarItemHistorico = 'AdicionarItemHistorico',
// }
// export type CalcularHoraReducerAction = {
//   type: TypeCalcularHoraReducerAction.AdicionarItemHistorico;
//   payload: {
//     item: ItemHistoricoTempoHora;
//   };
// };
// const reducerAction = {
//   [TypeCalcularHoraReducerAction.AdicionarItemHistorico]: (
//     state: CalcularHoraReducerStateType,
//     action: CalcularHoraReducerAction
//   ): CalcularHoraReducerStateType => state,
// };
// export function calcularHoraReducer(
//   state: CalcularHoraReducerStateType,
//   action: CalcularHoraReducerAction
// ): CalcularHoraReducerStateType {
//   return reducerAction[action.type](sateta, action);
// }
