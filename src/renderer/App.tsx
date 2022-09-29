import { Container, Box } from '@mui/material';
import Fileupload from './Components/Fileupload/Fileupload';
import './App.css';

export default function App() {
  return (
    <>
      <Container
        maxWidth="lg"
        className="color-900"
        sx={{ display: 'flex', justifyContent: 'center', height: '500px' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Fileupload />
        </Box>
      </Container>
    </>
  );
}
