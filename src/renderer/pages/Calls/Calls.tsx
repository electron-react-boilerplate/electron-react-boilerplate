import { Box } from '@mui/material';
import calls from './calls.png';

function Calls() {
  return (
    <Box sx={{ width: '100px', height: '100px' }}>
      <title>Расписание звонков</title>
      <img src={calls} alt=" " />
    </Box>
  );
}

export default Calls;
