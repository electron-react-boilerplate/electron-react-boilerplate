import styled from '@emotion/styled';
import { Button, createStyles, Paper, Typography } from '@mui/material';
import React from 'react';

const PaperCourseContent = styled(Paper)({
  position: 'fixed',
  inset: '0',
  margin: 'auto',
  width: '550px',
  height: '400px',
  '&::before': {
    content: "''",
    position: 'absolute',
    top: '-500px',
    left: '-500px',
    right: '0',
    bottom: '0',
    width: '10000px',
    height: '10000px',
    filter: 'blur(50px)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: '-1',
  },
});

function CourseContent1({ onBack }: { onBack: () => void }) {
  return (
    <PaperCourseContent elevation={3}>
      <Typography variant="h5">Содержимое для 1 курса</Typography>
      <Button variant="contained" onClick={onBack} sx={{ marginTop: '20px' }}>
        Назад
      </Button>
    </PaperCourseContent>
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
