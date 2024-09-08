import { CircularProgress, Paper } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import parse from 'html-react-parser';

export default function View() {
  const [schedules, setSchedules] = React.useState<JSX.Element[]>([
    <CircularProgress sx={{ marginTop: '280px' }} />,
  ]);
  const [searchParams] = useSearchParams();
  const url = `https://skoipt.ru/images/rs/Schedule_htm/${searchParams.get('group')}.htm`;

  console.log(`request: ${url}`);

  React.useEffect(() => {
    axios
      .get(url, { responseType: 'arraybuffer' })
      .then((response) => {
        // Create a TextDecoder instance for windows-1251
        const decoder = new TextDecoder('windows-1251');
        // Decode the array buffer
        const decodedData = decoder.decode(new Uint8Array(response.data));

        const htmlDoc = new DOMParser().parseFromString(
          decodedData,
          'text/html',
        );

        // Find all tables with the class 'MsoNormalTable'
        const tables = Array.from(htmlDoc.querySelectorAll('.MsoNormalTable'));

        // Convert all tables to JSX elements
        const tableElements = tables.map((table) =>
          parse(table.outerHTML)
        );

        setSchedules(tableElements);
      })
      .catch((error) => {
        console.log(`load failed ${error}`);
      });
  }, [url]);

  return (
    <Paper
      sx={{
        position: 'fixed',
        inset: '0px',
        margin: 'auto',
        width: '1200px',  // Установите фиксированную ширину
        height: '800px', // Установите фиксированную высоту
        overflow: 'auto', // Добавьте прокрутку, если содержимое превышает размеры
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        boxSizing: 'border-box', // Убедитесь, что padding и border включены в размеры
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          transform: 'scale(0.8)', // Масштабируйте содержимое
          transformOrigin: 'top left', // Масштабируйте от верхнего левого угла
        }}
      >
        {schedules}
      </div>
    </Paper>
  );
}
