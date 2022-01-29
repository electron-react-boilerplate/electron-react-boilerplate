import Master from '@App/components/Master/Master';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import { AppProvider } from './reducer/context';

const theme = createTheme();

export default function App() {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Master />
      </ThemeProvider>
    </AppProvider>
  );
}
