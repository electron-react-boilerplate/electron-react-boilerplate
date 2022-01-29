import {
  EventSeletorTempoHora,
  ValueSeletorTempoHora,
} from '@App/components/SeletorTempoHora/type';
import { useState } from 'react';
import { Grid } from '@mui/material';
import SeletorTempoHora from '@App/components/SeletorTempoHora';
import { SeletorTempoHoraHelper } from '../SeletorTempoHora/helper';

export default function CalcularHoraParaDecimal() {
  const [valorHora, setValorHora] = useState<ValueSeletorTempoHora>({
    hora: 10,
    minuto: 20,
  });
  function onChangeHora(event: EventSeletorTempoHora) {
    setValorHora(event.valor);
  }
  function calcularData(): string {
    return SeletorTempoHoraHelper.formatarUnicaDecimal(valorHora);
  }
  return (
    <Grid container spacing={2}>
      <Grid item>
        <SeletorTempoHora valor={valorHora} onChange={onChangeHora} />
      </Grid>
      <Grid item alignItems={'center'} display="flex">
        <div>
          <strong>Resultado:</strong> {calcularData()}
        </div>
      </Grid>
    </Grid>
  );
}
