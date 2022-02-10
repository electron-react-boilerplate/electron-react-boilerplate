import { DateHelper } from '@App/helper/DateHelper';
import { AcoesCalculoData } from '../CalcularHoraContainer/types';
import { SeletorTempoHoraHelper } from '../SeletorTempoHora/helper';
import { ItemHistoricoTempoHora, RowHistoricoTempoHora } from './type';

export class HistoricoTempoHoraHelper {
  static setarSubtarir(item: ItemHistoricoTempoHora) {
    if (item.subtrair !== undefined) return;

    const tempoEmMunitos = 20;
    const tempoEmDecimal = DateHelper.getMillisecondToDeciamlNumber(
      DateHelper.hourstoMinutesToMilliseconds(0, tempoEmMunitos)
    );

    if (
      item.inicio.hora <= 12 &&
      item.final.hora >= 12 &&
      item.final.minuto >= tempoEmMunitos
    )
      item.subtrair = tempoEmDecimal;
  }

  static craeteRow(item: ItemHistoricoTempoHora): RowHistoricoTempoHora {
    const inicio = DateHelper.msToTime(
      SeletorTempoHoraHelper.toMilliseconds(item.inicio)
    );
    const final = DateHelper.msToTime(
      SeletorTempoHoraHelper.toMilliseconds(item.final)
    );
    this.setarSubtarir(item);
    const acao =
      item.tipoAcao === AcoesCalculoData.adicao ? 'Adição' : 'Subtração';
    const total = SeletorTempoHoraHelper.calcularData(
      item.tipoAcao,
      item.final,
      item.inicio,
      item.subtrair
    );
    const fJira = SeletorTempoHoraHelper.formatarJira(
      item.tipoAcao,
      item.final,
      item.inicio,
      item.subtrair
    );
    const fDecimal = SeletorTempoHoraHelper.formatarDecimal(
      item.tipoAcao,
      item.final,
      item.inicio,
      item.subtrair
    );

    return {
      inicio,
      final,
      tipoAcao: acao,
      total,
      fJira,
      fDecimal,
      dataInclusao: item.dataInclusao,
      id: item.id,
      tag: item.tag,
      subtrair: item.subtrair,
    };
  }
}
