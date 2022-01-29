import AppBar from '@mui/material/AppBar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CalcularHoraContainer from '@App/components/CalcularHoraContainer';
import AbaConteudo from './components/AbaConteudo/AbaConteudo';
import './App.css';

const theme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <AccessTimeIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Calcular Horario
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 5,
            pb: 6,
          }}
        >
          <Container maxWidth="xl" fixed disableGutters>
            {/* <CalcularHoraContainer /> */}
            <AbaConteudo />
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
