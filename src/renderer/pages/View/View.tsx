import { Button, ButtonProps, CircularProgress, Paper, styled } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './View.css';
import "../../App.css"

const CustomButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: 'white',
  boxShadow:
    '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
  color: 'black',
  width: '150px',
  fontSize: '18px',
}));

function getNextMondayTimestamp() {
  const now = new Date();
  const currentDay = now.getDay();
  const daysUntilMonday = currentDay === 0 ? 0 : 7 - currentDay;
  const nextMonday = new Date(
    now.getTime() + daysUntilMonday * 24 * 60 * 60 * 1000,
  );
  nextMonday.setHours(0, 0, 0, 0);
  return nextMonday.getTime();
}

function Parse(group: string, handleChange: Function) {
  const url = `https://skoipt.ru/images/rs/Schedule_htm/${group}.htm`;

  console.log(`request: ${url}`);

  axios
    .get(url, { responseType: 'arraybuffer' })
    .then((response) => {
      /*
       * schedule - matrix
       * [i] - rows
       * [j] - cells
       *
       * [i][j] -> [
       *  text, width, height, colspan, rowspan
       * ]
       */
      const schedule: any = [];
      const decoder = new TextDecoder('windows-1251');
      const decodedData = decoder.decode(new Uint8Array(response.data));
      const htmlDoc = new DOMParser().parseFromString(decodedData, 'text/html');
      console.log(htmlDoc);
      const table = htmlDoc.querySelectorAll('.MsoNormalTable')[1];

      const rows = table.querySelectorAll('tr');
      for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll('td');
        schedule[i] = [];
        for (let j = 0; j < cells.length; j++) {
          const style: any = [];

          style.push(cells[j].outerText);
          style.push(cells[j].style.width);
          style.push(cells[j].style.height);
          style.push(cells[j].colSpan);
          style.push(cells[j].rowSpan);

          schedule[i][j] = style;
        }
      }

      handleChange(schedule);

      const schedules = JSON.parse(localStorage.getItem('schedules') ?? '{}');

      schedules[group] = {};
      schedules[group].expires = getNextMondayTimestamp();
      schedules[group].schedule = schedule;

      localStorage.setItem('schedules', JSON.stringify(schedules));
    })
    .catch((error) => {
      console.log(`load failed: ${error}`);
    });
}

function Load(group: string, handleChange: Function) {
  const schedules = JSON.parse(localStorage.getItem('schedules') ?? '0');

  if (
    schedules == null ||
    schedules[group] == null ||
    schedules[group].expires < Date.now()
  ) {
    Parse(group, handleChange);
  } else {
    handleChange(schedules[group].schedule);
  }
}

export default function View() {
  const [schedule, setSchedule] = React.useState(
    <CircularProgress sx={{ marginTop: '280px' }} />
  );
  const ref = useRef(null);
  const [scale, setScale] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function changeSchedule(newSchedule) {
    const rows = [];

    newSchedule.forEach((trs, i) => {
      const tr = [];

      trs.forEach((td, j) => {
        tr.push(
          <motion.td
            key={j}
            colSpan={td[3]}
            rowSpan={td[4]}
            style={{
              width: td[1],
              height: td[2],
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + j * 0.05 }}
          >
            {td[0]}
          </motion.td>
        );
      });

      rows.push(
        <motion.tr key={i}>
          {tr}
        </motion.tr>
      );
    });

    setSchedule(<tbody className="View__table">{rows}</tbody>);
  }

  useEffect(() => {
    Load(searchParams.get('group') ?? '', changeSchedule);
  }, []);

  useEffect(() => {
    if (ref.current) {
      const elementHeight = ref.current.offsetHeight;  // Получение высоты элемента

      // Проверка высоты и изменение scale
      if (elementHeight > 500) {
        setScale(1.20);
      } else {
        setScale(1.5);
      }
    }
  }, [schedule]);

  return (
    <motion.div
      initial={{ opacity: '0' }}
      animate={{ opacity: '1' }}
      transition={{ type: 'spring', stiffness: 50, delay: '0.1' }}
    >
      <Paper
        className='absolute-center'
        ref={ref}
        sx={{
          minWidth: '1030px',
          minHeight: '200px',
          height: 'fit-content',
          textAlign: 'center',
          padding: '15px',
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        {schedule}
      </Paper>
      <motion.div
        initial={{ opacity: '0' }}
        animate={{ opacity: '1' }}
        transition={{ type: 'spring', stiffness: 50, delay: '0.1' }}
      >
        <CustomButton
          onClick={() => navigate('/schedule')}
          variant="contained"
          sx={{
            position: 'absolute',
            width: 240,
            height: 75,
            borderRadius: '15px',
            left: 'calc(50% - 700px)',
            bottom: '30px',
          }}
        >
          Назад
        </CustomButton>
      </motion.div>
    </motion.div>
  );
}
