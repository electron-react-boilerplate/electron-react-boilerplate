import { AcoesCalculoData } from '@App/components/CalcularHoraContainer/types';
import { ValueSeletorTempoHora } from '../SeletorTempoHora/type';

export interface ItemHistoricoTempoHora {
  id: string;
  inicio: ValueSeletorTempoHora;
  final: ValueSeletorTempoHora;
  tipoAcao: AcoesCalculoData;
  dataInclusao: Date;
  tag: string;
  subtrair?: number;
}

export type EventHistoricoTempoHora = {
  itemExcluido: ItemHistoricoTempoHora;
};

export type RowHistoricoTempoHora = {
  inicio: string;
  final: string;
  tipoAcao: string;
  total: string;
  fJira: string;
  fDecimal: string;
  dataInclusao: Date;
  id: string;
  tag: string;
  subtrair?: number;
};
