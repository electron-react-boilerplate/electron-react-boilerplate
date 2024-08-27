import * as React from 'react';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import skoipt from './skoipt.png';
import weather from './weather.svg';
import axios from 'axios';
import Weather from '../Weather/Weather';

const logoStyle = {
  width: '140px',
  height: 'auto',
};

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const Months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
const apiKey = 'temp_a591e999826f5d62a01b893c50ebc5f9';

function Head() {
  const [curTime, setCurTime] = useState('00:00');
  const [curDate, setCurDate] = useState('Пн. 0 Январь');

  const updateTime = () => {
    const today = new Date();
    const hours = today.getHours().toString();
    const minutes = today.getMinutes().toString();

    setCurTime(
      `${(hours.length === 1 ? '0' : '') + hours}:${(minutes.length === 1 ? '0' : '') + minutes}`,
    );
  };
  const updateDate = () => {
    const today = new Date();
    const parser = new DOMParser();

    setCurDate(
      `${daysOfWeek[today.getDay()]}. ${today.getDate()} ${Months[today.getMonth()]}`,
    );
  };

  useEffect(() => {
    setInterval(updateTime, 1000);

    return () => {
      clearInterval(updateTime);
    };
  }, []);

  useEffect(() => {
    updateDate();
    setInterval(updateDate, 1000 * 60 * 60);
    return () => {
      clearInterval(updateDate);
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      <AppBar
        position="static"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '999px',
            bgcolor:
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.4)'
                : 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(24px)',
            width: '1500px',
            marginLeft: 'auto',
            marginRight: 'auto',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
          })}
        >
          <img src={skoipt} alt="" style={logoStyle} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={weather} alt="" />
            <Typography variant="body1" color="#000000">
              <Weather interval={1000*60*60}/>
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <AccessTimeFilledIcon
              sx={{
                color: '#000000',
                width: '30px',
                height: 'auto',
                marginRight: '5px',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="body1" color="#000000">
                {curTime}
              </Typography>
              <Typography variant="body1" color="#000000">
                {curDate}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Head;
