import React, { useEffect, useState } from 'react';
import { Snackbar, Button } from '@mui/material';

const { ipcRenderer } = window.require('electron');

function UpdateNotification() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Слушаем событие от основного процесса
    ipcRenderer.on('update-downloaded', () => {
      setOpen(true);
    });

    // Удаляем слушатель при размонтировании компонента
    return () => {
      ipcRenderer.removeAllListeners('update-downloaded');
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRestart = () => {
    ipcRenderer.send('restart-app');
  };

  return (
    <Snackbar
      open={open}
      message="Обновление загружено. Перезагрузите приложение для применения обновлений."
      action={
        <Button color="secondary" size="small" onClick={handleRestart}>
          Перезагрузить
        </Button>
      }
      onClose={handleClose}
    />
  );
}

export default UpdateNotification;
