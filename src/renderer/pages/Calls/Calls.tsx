import { Box } from '@mui/material';
import calls from './calls.png';

function Calls() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Box
        sx={{
          marginInline: 'auto',
          marginBlockStart: '50vh',
          transform: 'translateY(-50%)',
          backgroundColor: 'primary',
          padding: '16px',
        }}
      >
        <img
          src={calls}
          alt=" "
          style={{ maxWidth: '100%', height: '700px', borderRadius: '16px' }}
        />
      </Box>
    </Box>
  );
}

export default Calls;
