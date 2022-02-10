/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import '@App/components/SeletorTempoHora/estilo.css';
import {
  ItemHistoricoTempoHora,
  RowHistoricoTempoHora,
} from '@App/components/HistoricoTempoHora/type';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  DataGrid,
  GridActionsCellItem,
  GridCellEditCommitParams,
  GridColumns,
  GridRenderCellParams,
  GridRowModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { HistoricoTempoHoraHelper } from './helper';

interface HistoricoTempoHoraProps {
  valor: ItemHistoricoTempoHora[];
  onRemove: (row: RowHistoricoTempoHora) => void;
  onEdit: (row: ItemHistoricoTempoHora) => void;
}

function craeteRow(item: ItemHistoricoTempoHora): RowHistoricoTempoHora {
  return HistoricoTempoHoraHelper.craeteRow(item);
}

function TableSpanCopy(props: { texto: string }) {
  const onDoubleClick = () => {
    navigator.clipboard.writeText(props.texto);
  };
  return (
    <span
      style={{
        userSelect: 'none',
      }}
      onDoubleClick={onDoubleClick}
    >
      <Tooltip TransitionComponent={Zoom} title="click duas vezes para copiar">
        <span>{props.texto}</span>
      </Tooltip>
    </span>
  );
}
function renderSpanTableCellCopy(params: GridRenderCellParams<string>) {
  return <TableSpanCopy texto={params.value} />;
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
  const { onEdit, valor: listaHitorico } = props;
  function getRows(): RowHistoricoTempoHora[] {
    return listaHitorico.map(craeteRow);
  }
  const handleDeleteClick = (row: GridRowModel) => () => {
    // event.stopPropagation();
    const item = row as RowHistoricoTempoHora;
    props.onRemove(item);
  };

  function CreateDataTables() {
    const rows = getRows();
    const columns: GridColumns = [
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: (p) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(p.row)}
            color="inherit"
          />,
        ],
      },
      {
        field: 'inicio',
        headerName: 'Inicio',
        renderCell: renderSpanTableCellCopy,
      },
      {
        field: 'tipoAcao',
        headerName: 'Ação',
      },
      {
        field: 'final',
        headerName: 'Final',
        renderCell: renderSpanTableCellCopy,
      },
      {
        field: 'total',
        headerName: 'Total',
      },
      {
        field: 'fJira',
        headerName: 'f. jira',
        renderCell: renderSpanTableCellCopy,
      },
      {
        field: 'fDecimal',
        headerName: 'f. decimal',
        renderCell: renderSpanTableCellCopy,
      },
      {
        field: 'dataInclusao',
        headerName: 'Inclusão',
        type: 'dateTime',
        minWidth: 150,
      },
      {
        field: 'subtrair',
        headerName: 'subtrair',
        editable: true,
        type: 'number',
      },
      {
        field: 'tag',
        headerName: 'Tag',
        editable: true,
        renderCell: renderSpanTableCellCopy,
      },
    ];

    const handleCellEditCommit = useCallback(
      (params: GridCellEditCommitParams) => {
        const item = listaHitorico.find((x) => x.id === params.id);
        if (!item) return;
        switch (params.field) {
          case 'tag':
            item.tag = params.value as string;
            break;
          case 'subtrair':
            item.subtrair = params.value as number;
            break;
          default:
            break;
        }
        onEdit(item);
      },
      [listaHitorico]
    );

    function calcularHorasTotais() {
      return rows
        .reduce((partialSum, a) => partialSum + parseFloat(a.fDecimal), 0)
        ?.toFixed(2);
    }

    return (
      <div style={{ height: 400, width: 800 }}>
        <div>
          <span>Horas Totais: </span>
          <b>{calcularHorasTotais()}</b>
        </div>
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                dataInclusao: false,
                tipoAcao: false,
                subtrair: false,
              },
            },
          }}
          onCellEditCommit={handleCellEditCommit}
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
