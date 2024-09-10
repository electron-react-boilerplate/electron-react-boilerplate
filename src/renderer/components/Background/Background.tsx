import './Background.css';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import ContrastIcon from '@mui/icons-material/Contrast';
import BackgroundCircle from './Backgrounds/Background-circle';
import BackgroundGradient from './Backgrounds/Background-gradient';
import BackGroundWave from './Backgrounds/Background_wave';

const Backgrounds: JSX.Element[] = [
  <BackgroundCircle />,
  <BackGroundWave />,
  <BackgroundGradient />,
];

function Background() {
  const [iBackground, setIBackground] = useState(0);

  function nextBackground() {
    let temp = iBackground + 1;

    if (temp >= Backgrounds.length) {
      temp = 0;
    }

    setIBackground(temp);
  }

  return (
    <div className="Background">
      <IconButton
        aria-label="Theme"
        size="large"
        onClick={nextBackground}
        className="Background__Button-theme"
        sx={{
          borderRadius: '100%',
          border: 'solid 1px black',
          borderColor: 'rgba(0, 0, 0, 0.12)',
          boxShadow:
            '0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
        }}
      >
        <ContrastIcon />
      </IconButton>
      <div className="Background__Background">{Backgrounds[iBackground]}</div>
    </div>
  );
}

export default Background;
