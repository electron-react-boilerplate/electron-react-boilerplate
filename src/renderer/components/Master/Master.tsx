import AppBar from '@mui/material/AppBar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AbaConteudo from '@App/components/AbaConteudo/AbaConteudo';
import { MenuWindowns } from './MenuWindowns';

export default function Master() {
  return (
    <div>
      <MenuWindowns />
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
            pt: 3,
          }}
        >
          <Container maxWidth="xl" fixed disableGutters>
            {/* <CalcularHoraContainer /> */}
            <AbaConteudo />
          </Container>
        </Box>
      </main>
    </div>
  );
}
