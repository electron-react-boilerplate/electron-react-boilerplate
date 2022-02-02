import { AppContext } from '@App/reducer/context';
import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Zoom from '@mui/material/Zoom';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import CachedIcon from '@mui/icons-material/Cached';

export function ToolbarCalcularHoraContainer() {
  const { state, dispatch } = useContext(AppContext);
  function inverterValoresHoras() {
    dispatch({
      type: 'inverterValoresHoras',
    });
  }
  function subtituirValorHoraInicio() {
    dispatch({
      type: 'alterarHoraInicial',
      payload: {
        horaInicial: state.calcularHora.horaFinal,
      },
    });
  }
  function subtituirValorHoraFinal() {
    dispatch({
      type: 'alterarHoraFinal',
      payload: {
        horaFinal: state.calcularHora.horaInicial,
      },
    });
  }
  function resetarLista() {
    dispatch({
      type: 'resetListaHistorico',
    });
  }
  return (
    <Grid container>
      <Grid sx={{ py: 1 }} item>
        <Tooltip TransitionComponent={Zoom} title="inverter horas">
          <IconButton aria-label="delete" onClick={inverterValoresHoras}>
            <CompareArrowsIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip TransitionComponent={Zoom} title="subtituir valor para inicio">
          <IconButton onClick={subtituirValorHoraInicio}>
            <FastRewindIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip TransitionComponent={Zoom} title="subtituir valor para final">
          <IconButton onClick={subtituirValorHoraFinal}>
            <FastForwardIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip TransitionComponent={Zoom} title="subtituir valor para final">
          <IconButton onClick={resetarLista}>
            <CachedIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
