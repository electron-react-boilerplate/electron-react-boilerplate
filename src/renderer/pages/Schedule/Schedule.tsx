import {
  Box,
  Button,
  ButtonProps,
  Paper,
  styled,
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

const CursesButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'black',
  width: '100%',
  fontSize: '18px',
}));

function Schedule() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const renderCourseContent = () => {
    switch (selectedCourse) {
      case 1:
        return <CourseContent1 onBack={() => setSelectedCourse(null)} />;
      case 2:
        return <CourseContent2 onBack={() => setSelectedCourse(null)} />;
      case 3:
        return <CourseContent3 onBack={() => setSelectedCourse(null)} />;
      case 4:
        return <CourseContent4 onBack={() => setSelectedCourse(null)} />;
      default:
        return null;
    }
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
          }}
        >
          <Typography sx={{ marginTop: '35px' }} variant="h4">
            Курсы
          </Typography>
          <Paper
            elevation={0}
            sx={{
              width: '550px',
              height: '400px',
              position: 'fixed',
              inset: '0',
              margin: 'auto',
            }}
          >
            <Paper
              elevation={3}
              sx={{ height: '70px', display: 'flex', marginTop: '50px' }}
            >
              <CursesButton
                variant="text"
                size="large"
                onClick={() => setSelectedCourse(1)}
              >
                1 курс
              </CursesButton>
            </Paper>
            <Paper
              elevation={3}
              sx={{ height: '70px', display: 'flex', marginTop: '20px' }}
            >
              <CursesButton
                variant="text"
                size="large"
                onClick={() => setSelectedCourse(2)}
              >
                2 курс
              </CursesButton>
            </Paper>
            <Paper
              elevation={3}
              sx={{ height: '70px', display: 'flex', marginTop: '20px' }}
            >
              <CursesButton
                variant="text"
                size="large"
                onClick={() => setSelectedCourse(3)}
              >
                3 курс
              </CursesButton>
            </Paper>
            <Paper
              elevation={3}
              sx={{ height: '70px', display: 'flex', marginTop: '20px' }}
            >
              <CursesButton
                variant="text"
                size="large"
                onClick={() => setSelectedCourse(4)}
              >
                4 курс
              </CursesButton>
            </Paper>
          </Paper>
        </Paper>
        {renderCourseContent()}
      </motion.div>
    </Box>
  );
}

export default Schedule;
