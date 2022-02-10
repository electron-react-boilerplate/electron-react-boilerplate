import { DateHelper } from '@App/helper/DateHelper';
import { AcoesCalculoData } from '../CalcularHoraContainer/types';
import { ValueSeletorTempoHora } from './type';

class SeletorTempoHora {
  readonly horaEmMilissegundos = 3600000;

  readonly minutoEmMilissegundos = 60000;

  subtrairDecimalEmMilliseconds(subtarir: number, milliseconds: number) {
    return DateHelper.subtrairDecimalEmMilliseconds(subtarir, milliseconds);
  }

  toMilliseconds(valor: ValueSeletorTempoHora): number {
    return DateHelper.hourstoMinutesToMilliseconds(valor.hora, valor.minuto);
  }

  obterValorData(
    tipoAcaoCalculo: AcoesCalculoData,
    valorHoraFinal: ValueSeletorTempoHora,
    valorHoraInicial: ValueSeletorTempoHora
  ): number {
    switch (tipoAcaoCalculo) {
      case AcoesCalculoData.adicao:
        return (
          this.toMilliseconds(valorHoraFinal) +
          this.toMilliseconds(valorHoraInicial)
        );
      case AcoesCalculoData.subtracao:
        return (
          this.toMilliseconds(valorHoraFinal) -
          this.toMilliseconds(valorHoraInicial)
        );
      default:
        return 0;
    }
  }

  calcularData(
    tipoAcaoCalculo: AcoesCalculoData,
    valorHoraFinal: ValueSeletorTempoHora,
    valorHoraInicial: ValueSeletorTempoHora,
    subtarir?: number
  ): string {
    let numero = this.obterValorData(
      tipoAcaoCalculo,
      valorHoraFinal,
      valorHoraInicial
    );
    console.log(subtarir, numero);
    if (subtarir) numero = this.subtrairDecimalEmMilliseconds(subtarir, numero);
    const heNegativo = numero < 0;
    numero = numero < 0 ? -1 * numero : numero;
    if (!numero) return '00:00';

    return DateHelper.msToTime(numero, heNegativo);
  }

  formatarJira(
    tipoAcaoCalculo: AcoesCalculoData,
    valorHoraFinal: ValueSeletorTempoHora,
    valorHoraInicial: ValueSeletorTempoHora,
    subtarir?: number
  ): string {
    let numero = this.obterValorData(
      tipoAcaoCalculo,
      valorHoraFinal,
      valorHoraInicial
    );

    if (subtarir) numero = this.subtrairDecimalEmMilliseconds(subtarir, numero);
    numero = numero < 0 ? -1 * numero : numero;
    if (!numero) return '0h 0m';

    const timeValue = DateHelper.getTimeValueByMillisecond(numero);
    const retorno: string[] = [];
    if (timeValue.hours > 0) retorno.push(`${timeValue.hours}h`);

    if (timeValue.minutes > 0) retorno.push(`${timeValue.minutes}m`);

    return retorno.join(' ');
  }

  formatarDecimal(
    tipoAcaoCalculo: AcoesCalculoData,
    valorHoraFinal: ValueSeletorTempoHora,
    valorHoraInicial: ValueSeletorTempoHora,
    subtarir?: number
  ): string {
    let numero = this.obterValorData(
      tipoAcaoCalculo,
      valorHoraFinal,
      valorHoraInicial
    );
    if (subtarir) numero = this.subtrairDecimalEmMilliseconds(subtarir, numero);
    return DateHelper.getMillisecondToDecimalHours(numero);
  }

  formatarUnicaDecimal(valorHora: ValueSeletorTempoHora): string {
    const numero = this.toMilliseconds(valorHora);
    return DateHelper.getMillisecondToDecimalHours(numero);
  }
}

export const SeletorTempoHoraHelper = new SeletorTempoHora();
