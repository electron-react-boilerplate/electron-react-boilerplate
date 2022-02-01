import { calculatorExpressionEval } from '@App/helper/CalculatorExpression';
import {
  EventSeletorTempoHora,
  ValueSeletorTempoHora,
} from '@App/components/SeletorTempoHora/type';
import { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import SeletorTempoHora from '@App/components/SeletorTempoHora';
import { SeletorTempoHoraHelper } from '../SeletorTempoHora/helper';

export default function CalcularHoraParaDecimal() {
  const [calucarExpressao, setCalucarExpressao] = useState<string>('');
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
  function calcularExpressao(): string {
    const value = calculatorExpressionEval(calucarExpressao);

    return value.toFixed(2);
  }
  return (
    <>
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
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <TextField
            label="Calcular"
            variant="outlined"
            value={calucarExpressao}
            onChange={(value) => setCalucarExpressao(value.target.value)}
          />
        </Grid>
        <Grid item alignItems={'center'} display="flex">
          <div>
            <strong>Resultado:</strong> {calcularExpressao()}
          </div>
        </Grid>
      </Grid>
    </>
  );
}
