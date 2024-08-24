import { Box } from '@mui/material';
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
      <img
        src={calls}
        alt=" "
        style={{ maxWidth: '100%', height: '800px', borderRadius: '16px' }}
      />
    </Box>
  );
}

export default Calls;
