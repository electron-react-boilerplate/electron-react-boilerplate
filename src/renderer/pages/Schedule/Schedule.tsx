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
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {
  CourseContent1,
  CourseContent2,
  CourseContent3,
  CourseContent4,
} from './CourseContent';

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

function Schedule() {
  const [value, setValue] = React.useState( null );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
            1 курс
          </TabPanel>
          <TabPanel value={value} index={1}>
            2 курс
          </TabPanel>
          <TabPanel value={value} index={2}>
            3 курс
          </TabPanel>
          <TabPanel value={value} index={3}>
            4 курс
          </TabPanel>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default Schedule;
