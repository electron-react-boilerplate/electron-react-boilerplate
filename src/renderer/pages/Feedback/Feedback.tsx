import React, { useState } from 'react';
import { Box, Paper, TextField, Snackbar, Alert } from '@mui/material';
import Keyboard from 'react-simple-keyboard';
import { motion } from 'framer-motion';
import Grow, { GrowProps } from '@mui/material/Grow';
import './Feedback.css';

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}

function onKeyPress(
  button: string,
  setInput: (value: string) => void,
  input: string,
  lastSendTime: number,
  setLastSendTime: (time: number) => void,
  setSnackbar: (message: string) => void,
  setSnackbarSeverity: (
    severity: 'success' | 'info' | 'warning' | 'error',
  ) => void,
) {
  console.log('Button pressed', button);

  if (button === '{bksp}') {
    setInput(input.slice(0, -1)); // Удаление последнего символа
  } else if (button === '{space}') {
    setInput(`${input} `);
  } else if (button === '{enter}') {
    const currentTime = Date.now();
    const timeSinceLastSend = currentTime - lastSendTime;

    if (timeSinceLastSend < 60000) {
      setSnackbar('Сообщение можно отправить только раз в минуту.');
      setSnackbarSeverity('warning');
      return;
    }

    if (!input.trim()) {
      setSnackbar('Сообщение не может быть пустым');
      setSnackbarSeverity('warning');
      return;
    }

    const token = '6560320345:AAEAhLn5ZD9pnZ5hSIYS4VUb_WjGW6xrK1Q';
    const chatIds = ['965614231', '5065103578'];
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    chatIds.forEach(async (chatId) => {
      const res = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: input,
        }),
      });

      if (!res.ok) {
        console.error(`Ошибка при отправке сообщения в чат ${chatId}`);
      }
    });

    setInput('');
    setSnackbar('Сообщение отправлено');
    setSnackbarSeverity('success');
    setLastSendTime(currentTime); // Обновляем время последней отправки
  } else if (button !== '{shift}' && button !== '{lock}') {
    setInput(input + button); // Добавление символа в строку
  }
}

function Feedback() {
  const [input, setInput] = useState<string>('');
  const [lastSendTime, setLastSendTime] = useState<number>(0); // Время последней отправки
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('info');
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null); // Для сообщений в Snackbar

  return (
    <Box
      className="absolute-center"
      sx={{
        width: '600px',
        height: '400px',
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
            width: '600px',
            height: '400px',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            flexWrap: 'wrap',
            padding: '20px',
          }}
        >
          <TextField
            label="Опишите проблему с приложением"
            inputProps={{ style: { fontSize: '1.5rem' } }}
            InputLabelProps={{ style: { fontSize: '1.5rem' } }}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <Keyboard
            display={{
              '{bksp}': 'Стереть',
              '{space}': 'Пробел',
              '{enter}': 'Готово',
            }}
            onKeyReleased={(button) =>
              onKeyPress(
                button,
                setInput,
                input,
                lastSendTime,
                setLastSendTime,
                setSnackbarMessage,
                setSnackbarSeverity,
              )
            }
            layout={{
              default: [
                '\u0451 1 2 3 4 5 6 7 8 9 0 {bksp}',
                '\u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a \\',
                '\u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d {enter}',
                '/ \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e .',
                '{space}',
              ],
            }}
          />
        </Paper>
      </motion.div>

      {/* Snackbar для отображения сообщений */}
      <Snackbar
        sx={{ width: '100%', position: 'absolute', marginBottom: '-180px' }}
        open={!!snackbarMessage}
        autoHideDuration={4000}
        onClose={() => setSnackbarMessage(null)}
        TransitionComponent={GrowTransition}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarMessage(null)}
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Feedback;
