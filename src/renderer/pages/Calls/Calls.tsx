import { Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import useInactivityRedirect from '../../components/Scripts/useInactivityRedirect';
import calls from './calls.png';
import "../../App.css"

function Calls() {
  useInactivityRedirect();
  return (
    <div className='absolute-center'>
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 500, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0, y: -500, filter: 'blur(10px)' }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <Paper
          elevation={5}
          sx={{ width: '560px', height: '800px', borderRadius: '16px' }}
        >
          <img
            src={calls}
            alt=" "
            style={{ maxWidth: '100%', height: '800px', borderRadius: '16px' }}
          />
        </Paper>
      </motion.div>
    </div>
  );
}

export default Calls;
