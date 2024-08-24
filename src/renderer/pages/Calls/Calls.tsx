import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import calls from './calls.png';

function Calls() {
  return (
    <motion.div
      className="animatable_calls"
      initial={{ opacity: 0, scale: 0.5, y: 1500 }}
      animate={{ opacity: 1, scale: 1, y: 450 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <Box
        sx={{
          position: 'fixed',
          inset: '0px',
          margin: 'auto',
          width: '600px',
          height: '800px',
        }}
      >
        <img
          src={calls}
          alt=" "
          className="animatable_calls"
          style={{ maxWidth: '100%', height: '800px', borderRadius: '16px' }}
        />
      </Box>
    </motion.div>
  );
}

export default Calls;
