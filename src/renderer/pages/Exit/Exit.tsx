import { Alert, Box, Paper, Snackbar, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import useInactivityRedirect from '../../components/Scripts/useInactivityRedirect';
import './Exit.css';


const PASSWORD_EXIT = '15128981';
const PASSWORD_DEVTOOL = '15128982';
const PASSWORD_RELOAD = '15128983';


function onKeyPress(
    button: string,
    setInput: (value: string) => void,
    input: string,
    setSnackbar: (message: string) => void) 
  {
  console.log('Button pressed', button);

  function handlerPassword(password: String)
  {
    switch (input)
    {
      case PASSWORD_EXIT:
        window.close();
        break;
      case PASSWORD_DEVTOOL:
        window.electron.openDevTools();
        break;
      case PASSWORD_RELOAD:
        window.location.reload();
        break;
      default:
        setSnackbar('Неверный пароль');
        break;
    }
  }

  // handle
  switch (button.trim())
  {
    case '{bksp}':
      
      setInput(input.slice(0, -1));
      break;
      
    case '{enter}':
      
      handlerPassword(input)
      break;
    
    case '{shift}' || '{lock}':
      
      break;
    
    default:

      setInput(input + button);
      break;
  }
}

function Exit() {
  useInactivityRedirect();
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null); // Для сообщений в Snackbar
  const [input, setInput] = useState<string>('');
  return (
    <Box
      className="absolute-center"
      sx={{
        width: '400px',
        height: '450px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 500 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0, y: -500 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <Paper
          elevation={5}
          sx={{
            width: '400px',
            height: '450px',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              margin: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              transform: 'scale(1.5)',
            }}
          >
            <TextField
              id="outlined-textarea"
              label="Пароль"
              inputProps={{ style: { fontSize: '1rem' } }}
              InputLabelProps={{ style: { fontSize: '1rem' } }}
              placeholder=""
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="password"
            />
            <Keyboard
              display={{
                '{bksp}': 'Стереть',
                '{enter}': 'Готово',
              }}
              onKeyReleased={(button) =>
                onKeyPress(button, setInput, input, setSnackbarMessage)
              }
              layout={{
                default: ['1 2 3', '4 5 6', '7 8 9', '{bksp} 0 {enter}'],
              }}
            />
          </Box>
        </Paper>
      </motion.div>
      <Snackbar
        sx={{ width: '100%', position: 'absolute', marginBottom: '-180px' }}
        open={!!snackbarMessage}
        autoHideDuration={4000}
        onClose={() => setSnackbarMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarMessage(null)}
          severity="warning"
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Exit;
