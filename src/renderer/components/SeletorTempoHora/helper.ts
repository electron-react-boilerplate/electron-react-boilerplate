import { DateHelper } from '@App/helper/DateHelper';
import { AcoesCalculoData } from '../CalcularHoraContainer/types';
import { ValueSeletorTempoHora } from './type';

class SeletorTempoHora {
  readonly horaEmMilissegundos = 3600000;

  readonly minutoEmMilissegundos = 60000;

  toMilliseconds(valor: ValueSeletorTempoHora): number {
    let milise = 0;
    milise = this.horaEmMilissegundos * valor.hora;
    milise += this.minutoEmMilissegundos * valor.minuto;
    return milise;
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
    valorHoraInicial: ValueSeletorTempoHora
  ): string {
    let numero = this.obterValorData(
      tipoAcaoCalculo,
      valorHoraFinal,
      valorHoraInicial
    );
    const heNegativo = numero < 0;
    numero = numero < 0 ? -1 * numero : numero;
    if (!numero) return '00:00';

    return DateHelper.msToTime(numero, heNegativo);
  }

  formatarJira(
    tipoAcaoCalculo: AcoesCalculoData,
    valorHoraFinal: ValueSeletorTempoHora,
    valorHoraInicial: ValueSeletorTempoHora
  ): string {
    let numero = this.obterValorData(
      tipoAcaoCalculo,
      valorHoraFinal,
      valorHoraInicial
    );
    numero = numero < 0 ? -1 * numero : numero;
    if (!numero) return '0h 0m';

    const timeValue = DateHelper.getTimeValueByMillisecond(numero);
    const retorno: string[] = [];
    if (timeValue.hours > 0) retorno.push(`${timeValue.hours}h`);

    if (timeValue.minutes > 0) retorno.push(`${timeValue.minutes}h`);

    return retorno.join(' ');
  }

  formatarDecimal(
    tipoAcaoCalculo: AcoesCalculoData,
    valorHoraFinal: ValueSeletorTempoHora,
    valorHoraInicial: ValueSeletorTempoHora
  ): string {
    const numero = this.obterValorData(
      tipoAcaoCalculo,
      valorHoraFinal,
      valorHoraInicial
    );
    return (numero / (1000 * 60 * 60)).toFixed(2);
  }
}

export const SeletorTempoHoraHelper = new SeletorTempoHora();
