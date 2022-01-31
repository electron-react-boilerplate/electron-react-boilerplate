import '@App/components/SeletorTempoHora/estilo.css';
import TableCell from '@mui/material/TableCell';
import { SeletorTempoHoraHelper } from '@App/components/SeletorTempoHora/helper';
import { AcoesCalculoData } from '@App/components/CalcularHoraContainer/types';
import { DateHelper } from '@App/helper/DateHelper';
import {
  ItemHistoricoTempoHora,
  RowHistoricoTempoHora,
} from '@App/components/HistoricoTempoHora/type';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';

interface HistoricoTempoHoraProps {
  valor: ItemHistoricoTempoHora[];
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
    dataInclusao: item.dataInclusao,
    id: item.dataInclusao.getTime(),
    tag: item.tag,
  };
}

function TableCellCopy(props: { texto: string }) {
  const onDoubleClick = () => {
    navigator.clipboard.writeText(props.texto);
  };
  return (
    <TableCell
      style={{
        userSelect: 'none',
      }}
      onDoubleClick={onDoubleClick}
      align="right"
    >
      <Tooltip TransitionComponent={Zoom} title="click duas vezes para copiar">
        <span>{props.texto}</span>
      </Tooltip>
    </TableCell>
  );
}
function renderCellTableCellCopy(params: GridRenderCellParams<string>) {
  return <TableCellCopy texto={params.value} />;
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarExport
        csvOptions={{
          fileName: 'data',
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}

export default function HistoricoTempoHora(props: HistoricoTempoHoraProps) {
  function getRows(): RowHistoricoTempoHora[] {
    return props.valor.map(craeteRow);
  }

  function CreateDataTables() {
    const rows = getRows();
    const columns: GridColDef[] = [
      {
        field: 'inicio',
        headerName: 'Inicio',
      },
      {
        field: 'tipoAcao',
        headerName: 'Ação',
      },
      {
        field: 'final',
        headerName: 'Final',
      },
      {
        field: 'total',
        headerName: 'Total',
      },
      {
        field: 'fJira',
        headerName: 'f. jira',
        renderCell: renderCellTableCellCopy,
      },
      {
        field: 'fDecimal',
        headerName: 'f. decimal',
        renderCell: renderCellTableCellCopy,
      },
      {
        field: 'dataInclusao',
        headerName: 'Inclusão',
        type: 'dateTime',
        minWidth: 150,
      },
      {
        field: 'tag',
        headerName: 'Tag',
      },
    ];

    return (
      <div style={{ height: 400, width: 800 }}>
        <DataGrid
          columnVisibilityModel={{
            dataInclusao: false,
            tipoAcao: false,
          }}
          rows={rows}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    );
  }
  return <div className="HistoricoTempoHora">{CreateDataTables()}</div>;
}
