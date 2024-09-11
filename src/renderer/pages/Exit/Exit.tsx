import { Box, Paper, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import React, { Component, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

function onKeyPress(button: string, setInput: (value: string) => void, input: string) {
  console.log("Button pressed", button);

  if (button === "{bksp}") {
    setInput(input.slice(0, -1)); // Удаление последнего символа
  } else if (button === "{enter}") {
    if (input === "15128981") {
      console.log("Ok");
      window.close();
    } else {
      console.log("Неверное значение");
    }
  } else if (button !== "{shift}" && button !== "{lock}") {
    setInput(input + button); // Добавление символа в строку
  }
}

function Exit() {
  const [input, setInput] = useState<string>("");
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
              placeholder=""
              value={input} // Значение текстового поля привязано к состоянию
              onChange={(e) => setInput(e.target.value)}
              type="password"
            />
            <Keyboard
              display={{
                '{bksp}': 'Стереть',
                '{enter}': 'Готово',
              }}
              onKeyPress={(button) => onKeyPress(button, setInput, input)}
              layout={{
                default: [
                  '1 2 3',
                  '4 5 6',
                  "7 8 9",
                  "{bksp} 0 {enter}",
                ],
              }}
            />
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default Exit;
