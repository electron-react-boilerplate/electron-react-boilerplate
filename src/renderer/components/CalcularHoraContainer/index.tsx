import { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SeletorTempoHora from '@App/components/SeletorTempoHora';
import { SeletorTempoHoraHelper } from '@App/components/SeletorTempoHora/helper';
import { AppContext } from '@App/reducer/context';
import { EventSeletorTempoHora } from '@App/components/SeletorTempoHora/type';
import { Guid } from 'guid-typescript';

import SaveIcon from '@mui/icons-material/Save';
import { IconButton, TextField } from '@mui/material';
import { AcoesCalculoData } from './types';
import { HistoricoCalcularHoraContainer } from './HistoricoCalcularHoraContainer';
import { ToolbarCalcularHoraContainer } from './ToolbarCalcularHoraContainer';

const DescricaoAcoesCalculoData = [
  { value: AcoesCalculoData.adicao, text: 'Adição' },
  { value: AcoesCalculoData.subtracao, text: 'Subtração' },
];
export default function CalcularHoraContainer() {
  const { state, dispatch } = useContext(AppContext);
  const [acaoCalculo, setAcaoCalculo] = useState(AcoesCalculoData.subtracao);
  const [tag, setTag] = useState('');

  useEffect(() => {
    dispatch({ type: 'carregarValoresStorage' });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { horaInicial: valorHoraInicial, horaFinal: valorHoraFinal } =
    state.calcularHora;

  function onChangeValorInicial(event: EventSeletorTempoHora) {
    dispatch({
      type: 'alterarHoraInicial',
      payload: {
        horaInicial: event.valor,
      },
    });
  }

  function onChangeValorFinal(event: EventSeletorTempoHora) {
    dispatch({
      type: 'alterarHoraFinal',
      payload: {
        horaFinal: event.valor,
      },
    });
  }

  function onChangeAcaoCalulo(event: SelectChangeEvent<AcoesCalculoData>) {
    setAcaoCalculo(event.target.value as AcoesCalculoData);
  }

  function onAddHistiricoCalculo() {
    setTag('');
    dispatch({
      type: 'AdicionarItemHistorico',
      payload: {
        item: {
          id: Guid.create().toString(),
          final: valorHoraFinal,
          inicio: valorHoraInicial,
          tipoAcao: acaoCalculo,
          dataInclusao: new Date(),
          tag,
        },
      },
    });
  }

  function calcularData(): string {
    return SeletorTempoHoraHelper.calcularData(
      acaoCalculo,
      valorHoraFinal,
      valorHoraInicial
    );
  }

  return (
    <div style={{ marginTop: '-18px' }}>
      <ToolbarCalcularHoraContainer />
      <Grid container spacing={2}>
        <Grid item>
          <SeletorTempoHora
            valor={valorHoraInicial}
            onChange={onChangeValorInicial}
          />
        </Grid>
        <Grid item>
          <Select value={acaoCalculo} onChange={onChangeAcaoCalulo}>
            {DescricaoAcoesCalculoData.map((x) => (
              <MenuItem key={x.value} value={x.value}>
                {x.text}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <SeletorTempoHora
            valor={valorHoraFinal}
            onChange={onChangeValorFinal}
          />
        </Grid>
        <Grid item>
          <TextField
            label="tag"
            variant="outlined"
            style={{ width: '100px' }}
            value={tag}
            onChange={(value) => setTag(value.target.value)}
          />
        </Grid>
        <Grid item alignItems={'center'} display={'flex'}>
          <div>
            <strong>Resultado:</strong> {calcularData()}
          </div>
        </Grid>
        <Grid item alignItems={'center'} display={'flex'}>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={onAddHistiricoCalculo}
          >
            <SaveIcon fontSize="large" color="primary" />
          </IconButton>
        </Grid>
      </Grid>
      <HistoricoCalcularHoraContainer />
    </div>
  );
}
