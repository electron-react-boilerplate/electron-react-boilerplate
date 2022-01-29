import '@App/components/SeletorTempoHora/estilo.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SeletorTempoHoraHelper } from '@App/components/SeletorTempoHora/helper';
import { AcoesCalculoData } from '@App/components/CalcularHoraContainer/types';
import { DateHelper } from '@App/helper/DateHelper';
import {
  EventHistoricoTempoHora,
  ItemHistoricoTempoHora,
  RowHistoricoTempoHora,
} from './type';

interface HistoricoTempoHoraProps {
  valor: ItemHistoricoTempoHora[];
  onRemove: (event: EventHistoricoTempoHora) => void;
}

function craeteRow(item: ItemHistoricoTempoHora): RowHistoricoTempoHora {
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
  };
}

function TableCellCopy(props: { texto: string }) {
  const onDoubleClick = () => {
    navigator.clipboard.writeText(props.texto);
  };
  return (
    <TableCell onDoubleClick={onDoubleClick} align="right">
      {props.texto}
    </TableCell>
  );
}

export default function HistoricoTempoHora(props: HistoricoTempoHoraProps) {
  function getRows(): RowHistoricoTempoHora[] {
    return props.valor.map(craeteRow);
  }

  function CustomizedTables() {
    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Inicio</TableCell>
              <TableCell align="center">Ação</TableCell>
              <TableCell align="right">Final</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">f. jira</TableCell>
              <TableCell align="right">f. decimal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getRows().map((row) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.inicio}
                </TableCell>
                <TableCell align="center">{row.tipoAcao}</TableCell>
                <TableCell align="right">{row.final}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
                <TableCellCopy texto={row.fJira} />
                <TableCellCopy texto={row.fDecimal} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return <div className="HistoricoTempoHora">{CustomizedTables()}</div>;
}
