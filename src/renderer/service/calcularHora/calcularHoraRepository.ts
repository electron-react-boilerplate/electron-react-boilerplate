import { ItemHistoricoTempoHora } from '@App/components/HistoricoTempoHora/type';

const nameHistoricoStorage = 'HistoricoHora';
class CalcularHoraRepository {
  nameHistoricoStorage = 'HistoricoHora';

  AddAllHistorico(valores: ItemHistoricoTempoHora[]) {
    localStorage.setItem(nameHistoricoStorage, JSON.stringify(valores));
    return valores;
  }

  getAllHistorico(): ItemHistoricoTempoHora[] {
    const novaLista: ItemHistoricoTempoHora[] = [];
    const json = localStorage.getItem(nameHistoricoStorage);
    if (!json) return [];
    const lista = JSON.parse(json) as any[];
    for (let index = 0; index < lista.length; index++) {
      const element = lista[index];
      element.dataInclusao = new Date(element.dataInclusao as string);
      novaLista.push({
        id: element.id,
        dataInclusao: new Date(element.dataInclusao as string),
        final: element.final,
        inicio: element.inicio,
        tag: element.tag,
        tipoAcao: element.tipoAcao,
        subtrair: element.subtrair,
      });
    }
    return novaLista;
  }
}
export { CalcularHoraRepository };
