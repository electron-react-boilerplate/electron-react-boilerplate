import { ItemHistoricoTempoHora } from '@App/components/HistoricoTempoHora/type';
import { ValueSeletorTempoHora } from '@App/components/SeletorTempoHora/type';

export interface CalcularHoraReducerStateType {
  valores: ItemHistoricoTempoHora[];
  horaInicial: ValueSeletorTempoHora;
  horaFinal: ValueSeletorTempoHora;
}

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
    }
  | {
      type: 'resetListaHistorico';
    }
  | {
      type: 'carregarValoresStorage';
    };
