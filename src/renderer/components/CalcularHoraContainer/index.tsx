import { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SeletorTempoHora from '@App/components/SeletorTempoHora';
import { SeletorTempoHoraHelper } from '@App/components/SeletorTempoHora/helper';
import { AppContext } from '@App/reducer/context';
import {
  EventSeletorTempoHora,
  ValueSeletorTempoHora,
} from '@App/components/SeletorTempoHora/type';

import SaveIcon from '@mui/icons-material/Save';
import { IconButton, TextField } from '@mui/material';
import HistoricoTempoHora from '../HistoricoTempoHora';
import { AcoesCalculoData } from './types';

const DescricaoAcoesCalculoData = [
  { value: AcoesCalculoData.adicao, text: 'Adição' },
  { value: AcoesCalculoData.subtracao, text: 'Subtração' },
];
export default function CalcularHoraContainer() {
  const { state, dispatch } = useContext(AppContext);
  const [acaoCalculo, setAcaoCalculo] = useState(AcoesCalculoData.subtracao);
  const [tag, setTag] = useState('');
  const [valorHoraInicial, setValorHoraInicial] =
    useState<ValueSeletorTempoHora>({ hora: 10, minuto: 20 });
  const [valorHoraFinal, setValorHoraFinal] = useState<ValueSeletorTempoHora>({
    hora: 10,
    minuto: 20,
  });

  function onChangeValorInicial(event: EventSeletorTempoHora) {
    setValorHoraInicial(event.valor);
  }

  function onChangeValorFinal(event: EventSeletorTempoHora) {
    setValorHoraFinal(event.valor);
  }

  function onChangeAcaoCalulo(event: SelectChangeEvent<AcoesCalculoData>) {
    setAcaoCalculo(event.target.value as AcoesCalculoData);
  }

  function onAddHistiricoCalculo() {
    setTag('');
    dispatch({
      type: 'Add',
      item: {
        final: valorHoraFinal,
        inicio: valorHoraInicial,
        tipoAcao: acaoCalculo,
        dataInclusao: new Date(),
        tag,
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
    <div>
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
      <Grid
        container
        spacing={2}
        sx={{
          mt: 1,
        }}
      >
        <Grid item>
          <HistoricoTempoHora valor={state.calcularHora.valores} />
        </Grid>
      </Grid>
    </div>
  );
}
