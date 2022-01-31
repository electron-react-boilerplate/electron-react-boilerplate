import { DateHelper } from '@App/helper/DateHelper';
import { AcoesCalculoData } from '../CalcularHoraContainer/types';
import { SeletorTempoHoraHelper } from '../SeletorTempoHora/helper';
import { ItemHistoricoTempoHora, RowHistoricoTempoHora } from './type';

export class HistoricoTempoHoraHelper {
  static craeteRow(item: ItemHistoricoTempoHora): RowHistoricoTempoHora {
    const inicio = DateHelper.msToTime(
      SeletorTempoHoraHelper.toMilliseconds(item.inicio)
    );
    const final = DateHelper.msToTime(
      SeletorTempoHoraHelper.toMilliseconds(item.final)
    );
    const acao =
      item.tipoAcao === AcoesCalculoData.adicao ? 'Adição' : 'Subtração';
    const total = SeletorTempoHoraHelper.calcularData(
      item.tipoAcao,
      item.final,
      item.inicio
    );
    const fJira = SeletorTempoHoraHelper.formatarJira(
      item.tipoAcao,
      item.final,
      item.inicio
    );

    const fDecimal = SeletorTempoHoraHelper.formatarDecimal(
      item.tipoAcao,
      item.final,
      item.inicio
    );
    return {
      inicio,
      final,
      tipoAcao: acao,
      total,
      fJira,
      fDecimal,
      dataInclusao: item.dataInclusao,
      id: item.dataInclusao.getTime(),
      tag: item.tag,
    };
  }
}
