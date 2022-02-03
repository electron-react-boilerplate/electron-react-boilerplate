import { Button, Grid, styled } from '@mui/material';
import { red, yellow } from '@mui/material/colors';

const styleButton: React.CSSProperties = {
  borderRadius: '50%',
  width: '1.15rem',
  height: '1.15rem',
  minWidth: '0',
  padding: '0.5rem',
  margin: '0.5rem 0',
  marginLeft: '0.5rem',
};
const ButtonRoundRed = styled(Button)({
  ...styleButton,
  marginRight: '0.4rem',
  backgroundColor: red[500],
  '&:hover': {
    backgroundColor: red[700],
    transform: 'scale(0.9)',
    transition: 'all 0.2s ease-out',
  },
});

const ButtonRoundYellow = styled(Button)({
  ...styleButton,
  backgroundColor: yellow[500],
  '&:hover': {
    backgroundColor: yellow[700],
    transform: 'scale(0.9)',
    transition: 'all 0.2s ease-out',
  },
});

export function MenuWindowns() {
  function closeWindow() {
    const ipcRenderer = window?.electron.ipcRenderer;
    ipcRenderer.send('closedApp');
  }

  function minimizeWindow() {
    const ipcRenderer = window?.electron.ipcRenderer;
    ipcRenderer.send('minimizeApp');
  }

  return (
    <Grid
      container
      className="drag-app-region"
      style={{ background: '#403f3f' }}
      justifyContent={'flex-end'}
    >
      <Grid item>
        <ButtonRoundYellow onClick={minimizeWindow} />
        <ButtonRoundRed onClick={closeWindow} />
      </Grid>
    </Grid>
  );
}
