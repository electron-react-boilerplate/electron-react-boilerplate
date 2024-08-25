import {
  Box,
  Button,
  ButtonProps,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { black } from '@mui/material/colors';

const CursesButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: 'black',
  width: '100%',
  fontSize: '18px',
}));

function Schedule() {
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
              <CursesButton variant="text" size="large">
                1 курс
              </CursesButton>
            </Paper>
            <Paper
              elevation={3}
              sx={{ height: '70px', display: 'flex', marginTop: '20px' }}
            >
              <CursesButton variant="text" size="large">
                2 курс
              </CursesButton>
            </Paper>
            <Paper
              elevation={3}
              sx={{ height: '70px', display: 'flex', marginTop: '20px' }}
            >
              <CursesButton variant="text" size="large">
                3 курс
              </CursesButton>
            </Paper>
            <Paper
              elevation={3}
              sx={{ height: '70px', display: 'flex', marginTop: '20px' }}
            >
              <CursesButton variant="text" size="large">
                4 курс
              </CursesButton>
            </Paper>
          </Paper>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default Schedule;
