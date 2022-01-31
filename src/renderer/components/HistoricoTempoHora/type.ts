import { AcoesCalculoData } from '@App/components/CalcularHoraContainer/types';
import { ValueSeletorTempoHora } from '../SeletorTempoHora/type';

export type ItemHistoricoTempoHora = {
  inicio: ValueSeletorTempoHora;
  final: ValueSeletorTempoHora;
  tipoAcao: AcoesCalculoData;
  dataInclusao: Date;
  tag: string;
};

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
  id: number;
  tag: string;
};
