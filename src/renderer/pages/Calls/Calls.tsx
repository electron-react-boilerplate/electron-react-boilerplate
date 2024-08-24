import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import calls from './calls.png';

function Calls() {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: '0px',
        margin: 'auto',
        width: '600px',
        height: '800px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 500, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <img
          src={calls}
          alt=" "
          style={{ maxWidth: '100%', height: '800px', borderRadius: '16px' }}
        />
      </motion.div>
    </Box>
  );
}

export default Calls;
