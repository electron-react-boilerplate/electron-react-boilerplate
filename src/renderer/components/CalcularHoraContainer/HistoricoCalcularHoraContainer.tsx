import { AppContext } from '@App/reducer/context';
import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import HistoricoTempoHora from '@App/components/HistoricoTempoHora';
import { RowHistoricoTempoHora } from '../HistoricoTempoHora/type';

export function HistoricoCalcularHoraContainer() {
  const { state, dispatch } = useContext(AppContext);
  function onRemove(item: RowHistoricoTempoHora) {
    const valorState = state.calcularHora.valores.find(
      (x) => x.dataInclusao.getTime() === item.dataInclusao.getTime()
    );
    if (valorState)
      dispatch({ type: 'removerItemHistorico', payload: { item: valorState } });
  }
  return (
    <Grid
      container
      spacing={2}
      sx={{
        mt: 1,
      }}
    >
      <Grid item>
        <HistoricoTempoHora
          onRemove={onRemove}
          valor={state.calcularHora.valores}
        />
      </Grid>
    </Grid>
  );
}
