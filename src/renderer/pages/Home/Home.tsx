import { useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import '../../App.css';
import React, { useMemo } from 'react';
import Slide1 from './Slides/Prezentatsia_obychnye_dni_2_semestr_00001.png';
import Slide2 from './Slides/Prezentatsia_obychnye_dni_2_semestr_00002.png';
import Slide3 from './Slides/Prezentatsia_obychnye_dni_2_semestr_00003.png';
import Slide4 from './Slides/Prezentatsia_obychnye_dni_2_semestr_00004.png';
import Slide5 from './Slides/Prezentatsia_obychnye_dni_2_semestr_00005.png';
import Slide6 from './Slides/Prezentatsia_obychnye_dni_2_semestr_00006.png';
import Slide7 from './Slides/Prezentatsia_obychnye_dni_2_semestr_00007.png';
import Slide8 from './Slides/Prezentatsia_obychnye_dni_2_semestr_00008.png';
import Slide9 from './Slides/Prezentatsia_obychnye_dni_2_semestr_00009.png';
import Slide10 from './Slides/Prezentatsia_obychnye_dni_2_semestr_00010.png';
import Slide11 from './Slides/Prezentatsia_obychnye_dni_2_semestr_00011.png';
import Slide12 from './Slides/Prezentatsia_obychnye_dni_2_semestr_00012.png';
import Slide13 from './Slides/Prezentatsia_obychnye_dni_2_semestr_00013.png';
import Slide14 from './Slides/Prezentatsia_obychnye_dni_2_semestr_00014.png';
import Slide15 from './Slides/Prezentatsia_obychnye_dni_2_semestr_00015.png';
import Slide16 from './Slides/Prezentatsia_obychnye_dni_2_semestr_00016.png';

function Home() {
  const navigate = useNavigate();

  // Мемоизация анимационных параметров
  const motionVariants = useMemo(
    () => ({
      initial: { opacity: 0, scale: 0, y: 500 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0, y: -500 },
      transition: { type: 'spring', stiffness: 50 },
    }),
    [],
  );

  // Мемоизация слайдов
  const slides = useMemo(
    () => [
      Slide1,
      Slide2,
      Slide3,
      Slide4,
      Slide5,
      Slide6,
      Slide7,
      Slide8,
      Slide9,
      Slide10,
      Slide11,
      Slide12,
      Slide13,
      Slide14,
      Slide15,
      Slide16,
    ],
    [],
  );

  return (
    <Box
      className="absolute-center"
      sx={{
        width: '1500px',
        borderRadius: '16px',
      }}
    >
      <motion.div
        initial={motionVariants.initial}
        animate={motionVariants.animate}
        exit={motionVariants.exit}
        transition={motionVariants.transition}
      >
        <Paper elevation={5}>
          <Carousel
            interval={5000}
            autoPlay
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            infiniteLoop
            showThumbs={false}
            stopOnHover={false}
            swipeable
            emulateTouch
          >
            {slides.map((slide, index) => (
              <div key={index}>
                <img src={slide} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default React.memo(Home);
