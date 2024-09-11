import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  Paper,
  styled,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import React, { SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useInactivityRedirect from '../../components/Scripts/useInactivityRedirect';
import './Schedule.css';
import '../../App.css';

const CourceUrls = [
  'https://skoipt.ru/en/112-statichnye-stranitsy/studentu/raspisanie/raspisanie-zanyatij/340-1-kurs',
  'https://skoipt.ru/en/112-statichnye-stranitsy/studentu/raspisanie/raspisanie-zanyatij/341-2-kurs',
  'https://skoipt.ru/en/112-statichnye-stranitsy/studentu/raspisanie/raspisanie-zanyatij/342-3-kurs',
  'https://skoipt.ru/en/112-statichnye-stranitsy/studentu/raspisanie/raspisanie-zanyatij/343-4-kurs',
];

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
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

const CustomButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: 'white',
  boxShadow:
    '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
  margin: '15px',
  color: 'black',
  width: '150px',
  fontSize: '18px',
}));

function LoadGroups(HandleChange: Function) {
  let cources = JSON.parse(localStorage.getItem('cources') ?? '0');

  if (cources == 0 || cources.expires - Date.now() < 0) {
    // init
    const parser = new DOMParser();
    cources = {};
    cources.expires = Date.now() + 1000 * 60 * 60 * 24 * 30; // next update
    let loaded: number = 0; // count loaded cources
    cources.groups = [];

    for (let groupI = 0; groupI < 4; groupI++) {
      cources.groups[groupI] = [];

      axios
        .get(CourceUrls[groupI])
        .then((response) => {
          const htmlDoc = parser.parseFromString(response.data, 'text/html');

          const groupsDoc = htmlDoc
            .querySelector('[itemprop="articleBody"]')
            ?.querySelectorAll('img');

          groupsDoc?.forEach((element) => {
            cources.groups[groupI].push(element.alt);
          });

          // --------------
          loaded++;
          if (loaded == 4) {
            localStorage.setItem('cources', JSON.stringify(cources));
            HandleChange(cources.groups);
          }
        })
        .catch((error) => {
          console.log(`load groups failed: ${error}`);
        });
    }
  } else if (cources != 0) {
    HandleChange(cources.groups);
  }
}

export default function Schedule() {
  useInactivityRedirect();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [cources, setCources] = React.useState([
    [<CircularProgress />],
    [<CircularProgress />],
    [<CircularProgress />],
    [<CircularProgress />],
  ]);

  function HandleChangeCources(array: Array<Array<string>>) {
    const cources: JSX.Element[][] = array.map((group) =>
      group.map((element, index) => (
        <motion.div
          key={element}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <CustomButton
            variant="contained"
            onClick={() => navigate(`/view?group=${element}`)}
          >
            {element}
          </CustomButton>
        </motion.div>
      )),
    );
    setCources(cources);
  }

  const handleChange = (event: SyntheticEvent, newValue: number) =>
    setValue(newValue);

  useEffect(() => {
    LoadGroups(HandleChangeCources);
  });

  return (
    <Box
      className="absolute-center"
      sx={{
        width: '600px',
        height: '550px',
      }}
    >
      <motion.div
        key="schedule"
        initial={{ opacity: 0, scale: 0, y: 500 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0, y: -500 }}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            >
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
            </motion.div>
          </Box>
          <TabPanel value={value} index={0}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}
            >
              {cources[0]}
            </motion.div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}
            >
              {cources[1]}
            </motion.div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}
            >
              {cources[2]}
            </motion.div>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}
            >
              {cources[3]}
            </motion.div>
          </TabPanel>
        </Paper>
      </motion.div>
    </Box>
  );
}
