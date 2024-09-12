import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider';
import { Carousel } from 'react-responsive-carousel';
import useInactivityRedirect from '../../components/Scripts/useInactivityRedirect';
import before1 from './Temp/before_1.png';
import after1 from './Temp/after_1.png';
import before2 from './Temp/before_2.png';
import after2 from './Temp/after_2.png';
import after_new_1 from './Temp/after_new_1.png';
import after_new_2 from './Temp/after_new_2.png';
import new_backround_1 from './Temp/Background_1.png';
import new_backround_2 from './Temp/Background_2.png';
import new_backround_3 from './Temp/Background_3.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import LastNews from '../../components/LastNews/LastNews';

function News() {
  const containerRef = useRef(null);

  // Мемоизация анимационных параметров
  const motionVariants = useMemo(
    () => ({
      initial: { opacity: 0, scale: 0, y: 500 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0, y: -500 },
      transition: { type: 'spring', stiffness: 50 },
    }),
    []
  );

  // Мемоизация слайдов как JSX-компонентов
  const slides = useMemo(
    () => [
      () => (
        <>
          <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={before1} alt="Image one" />}
            itemTwo={<ReactCompareSliderImage src={after1} alt="Image two" />}
          />
          <Typography variant="body1" sx={{ marginBottom: '15px' }}>
            Новый интерфейс.
          </Typography>
        </>
      ),
      () => (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <img src={new_backround_1} alt="" style={{ width: '350px' }} />
            <img src={new_backround_2} alt="" style={{ width: '350px' }} />
            <img src={new_backround_3} alt="" style={{ width: '350px' }} />
          </div>
          <Typography variant="body1" sx={{ marginBottom: '15px' }}>
            Функция смены заднего фона.🤷‍♂️
          </Typography>
        </>
      ),
      () => (
        <>
          <img src={after_new_1} alt="" />
          <Typography variant="body1" sx={{ marginBottom: '15px' }}>
            Новая кнопка "Новости".
          </Typography>
        </>
      ),
      () => (
        <>
          <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={before2} alt="Image one" />}
            itemTwo={<ReactCompareSliderImage src={after2} alt="Image two" />}
          />
          <Typography variant="body1" sx={{ marginBottom: '15px' }}>
            Новый интерфейс выбора группы.
          </Typography>
        </>
      ),
      () => (
        <>
          <img src={after_new_2} alt="" />
          <Typography variant="body1" sx={{ marginBottom: '15px' }}>
            Если нашли баг, нажмите на "Другое" и "сообщить о проблеме".
          </Typography>
        </>
      ),
    ],
    []
  );

  useInactivityRedirect();

  return (
    <Box
      className="absolute-center"
      sx={{
        width: '900px',
        height: '600px',
      }}
    >
      <motion.div
        initial={motionVariants.initial}
        animate={motionVariants.animate}
        exit={motionVariants.exit}
        transition={motionVariants.transition}
      >
        <Paper
          elevation={5}
          sx={{
            width: '900px',
            height: '600px',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              marginLeft: '15px',
              marginRight: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: '15px' }}>
              Мы обновились!
            </Typography>
            <Carousel
              autoPlay
              showArrows
              showStatus={false}
              showIndicators={false}
              infiniteLoop
              showThumbs={false}
              stopOnHover
              swipeable
              emulateTouch
            >
              {slides.map((SlideComponent, index) => (
                <div key={index}>
                  <SlideComponent />
                </div>
              ))}
            </Carousel>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default React.memo(News);
