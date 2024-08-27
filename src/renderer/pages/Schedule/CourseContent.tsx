import styled from '@emotion/styled';
import {
  Button,
  createStyles,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import React from 'react';

const PaperCourseContent = styled(Paper)({
  position: 'fixed',
  inset: '0',
  margin: 'auto',
  width: '550px',
  height: '400px',
  zIndex: '2',
});

const BackroundBlur = styled('div')({
  position: 'fixed',
  inset: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(2px)',
  zIndex: '1',
});

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: 'white',
  color: 'black',
  width: '100%',
  fontSize: '18px',
}));

function CourseContent1({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ backdropFilter: 'blur(0px)', position: 'fixed', inset: '0' }}
      animate={{ backdropFilter: 'blur(1px)' }}
      transition={{ type: 'spring', stiffness: 70 }}
    >
      <BackroundBlur>
        <motion.div
          initial={{ opacity: 0, scale: 0, position: 'fixed', inset: '0' }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: 'spring', stiffness: 70 }}
        >
          <PaperCourseContent elevation={3}>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                display: 'flex',
                justifyContent: 'center',
              }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 70, delay: 0.2 }}
            >
              <Grid
                container
                spacing={1}
                columns={10}
                sx={{
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  width: '550px',
                  height: '400px',
                  marginLeft: '20px',
                  marginRight: '20px',
                }}
              >
                <Grid item xs={11} display="flex" justifyContent="center">
                  <Typography variant="h5">1 курс</Typography>
                </Grid>
                <Grid item xs={2}>
                  <CustomButton variant="contained">1А</CustomButton>
                </Grid>
                <Grid item xs={2}>
                  <CustomButton variant="contained">1Б</CustomButton>
                </Grid>
                <Grid item xs={2}>
                  <CustomButton variant="contained">1Д</CustomButton>
                </Grid>
                <Grid item xs={2}>
                  <CustomButton variant="contained">1ПД-1</CustomButton>
                </Grid>
                <Grid item xs={2}>
                  <CustomButton variant="contained">1ПД-2</CustomButton>
                </Grid>
                <Grid item xs={2}>
                  <CustomButton variant="contained">1ТГ-1</CustomButton>
                </Grid>
                <Grid item xs={2}>
                  <CustomButton variant="contained">1ТГ-2</CustomButton>
                </Grid>
                <Grid item xs={2}>
                  <CustomButton variant="contained">1ИС-1</CustomButton>
                </Grid>
                <Grid item xs={2}>
                  <CustomButton variant="contained">1ИС-2</CustomButton>
                </Grid>
                <Grid item xs={2}>
                  <CustomButton variant="contained">1ПДО</CustomButton>
                </Grid>
                <Grid item xs={2}>
                  <CustomButton variant="contained">1ТД</CustomButton>
                </Grid>
                <Grid item xs={2}>
                  <CustomButton variant="contained">1Э</CustomButton>
                </Grid>
                <Grid item xs={2}>
                  <CustomButton variant="contained">1П</CustomButton>
                </Grid>
                <Grid item xs={11} display="flex" justifyContent="center">
                  <IconButton aria-label="delete" size="large" onClick={onBack}>
                    <KeyboardBackspaceIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </motion.div>
          </PaperCourseContent>
        </motion.div>
      </BackroundBlur>
    </motion.div>
  );
}

function CourseContent2({ onBack }: { onBack: () => void }) {
  return (
    <PaperCourseContent elevation={3}>
      <Typography variant="h5">Содержимое для 2 курса</Typography>
      <Button variant="contained" onClick={onBack} sx={{ marginTop: '20px' }}>
        Назад
      </Button>
    </PaperCourseContent>
  );
}

function CourseContent3({ onBack }: { onBack: () => void }) {
  return (
    <PaperCourseContent elevation={3}>
      <Typography variant="h5">Содержимое для 3 курса</Typography>
      <Button variant="contained" onClick={onBack} sx={{ marginTop: '20px' }}>
        Назад
      </Button>
    </PaperCourseContent>
  );
}

function CourseContent4({ onBack }: { onBack: () => void }) {
  return (
    <PaperCourseContent elevation={3}>
      <Typography variant="h5">Содержимое для 4 курса</Typography>
      <Button variant="contained" onClick={onBack} sx={{ marginTop: '20px' }}>
        Назад
      </Button>
    </PaperCourseContent>
  );
}

export { CourseContent1, CourseContent2, CourseContent3, CourseContent4 };
