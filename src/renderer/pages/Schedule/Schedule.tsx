import {
  Box,
  Button,
  ButtonProps,
  Pagination,
  Paper,
  styled,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { delay, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  CourseContent1,
  CourseContent2,
  CourseContent3,
  CourseContent4,
} from './CourseContent';

const CountCource = 4
const CourceUrls = [
  "https://skoipt.ru/en/112-statichnye-stranitsy/studentu/raspisanie/raspisanie-zanyatij/340-1-kurs",
  "https://skoipt.ru/en/112-statichnye-stranitsy/studentu/raspisanie/raspisanie-zanyatij/341-2-kurs",
  "https://skoipt.ru/en/112-statichnye-stranitsy/studentu/raspisanie/raspisanie-zanyatij/342-3-kurs",
  "https://skoipt.ru/en/112-statichnye-stranitsy/studentu/raspisanie/raspisanie-zanyatij/343-4-kurs"
]

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

/** return null if failed */
function LoadGroups(handleChange : Function)
{
  let cources = JSON.parse(localStorage.getItem("cources") ?? "0");

  if (cources == 0 || cources.time - Date.now() < 0)
  {
    // init
    const parser = new DOMParser();
    cources = {}
    cources.time = Date.now() + 1000 * 60 * 60 * 24 * 30; // next update
    let isSuccessfully: boolean = true;
    cources["groups"] = []

    for (let groupI = 0; groupI < 4; groupI++)
    {
      cources["groups"][groupI] = {}

      axios
        .get(CourceUrls[groupI])
        .then((response) => {
          const htmlDoc = parser.parseFromString(response.data, 'text/html');

          
          let groupsDoc = htmlDoc
            .querySelector("[itemprop=\"articleBody\"]")
            ?.querySelectorAll("a")

            console.log(2)
            console.log(groupsDoc)
          groupsDoc?.forEach(element => {
            cources["groups"][groupI][element.querySelector("img")?.alt ?? ""] = element.href;
          });

          if (groupI == CountCource)
          {
            // handle
          }
        })
        .catch((error) => {
          console.log("load groups failed")
          isSuccessfully = false;
        });
    }

    if (isSuccessfully) // if loads groups is successfully
    {
      localStorage.setItem("cources", JSON.stringify(cources));
    }
  }
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function Schedule() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState( 0 );
  const [cources, setCources] = React.useState( ["Загрузка...", "Загрузка...", "Загрузка...", "Загрузка...",] );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  //LoadGroups(setCources)

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: '0px',
        margin: 'auto',
        width: '600px',
        height: '550px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 500 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <Paper
          elevation={5}
          sx={{
            width: '600px',
            height: '550px',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ width: '600px' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              sx={{ margin: '15px' }}
            >
              <Tab label="1 курс" {...a11yProps(0)} sx={{ color: 'black' }} />
              <Tab label="2 курс" {...a11yProps(1)} sx={{ color: 'black' }} />
              <Tab label="3 курс" {...a11yProps(2)} sx={{ color: 'black' }} />
              <Tab label="4 курс" {...a11yProps(3)} sx={{ color: 'black' }} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {cources[0]}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {cources[1]}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {cources[2]}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {cources[3]}
          </TabPanel>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default Schedule;
