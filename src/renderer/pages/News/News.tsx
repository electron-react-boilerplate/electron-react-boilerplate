import React, { useEffect, useRef, useState } from 'react';
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
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import LastNews from '../../components/LastNews/LastNews';

function News() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleSliderMove = (e) => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPosition =
      ((e.clientX - containerRect.left) / containerRect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };
  useInactivityRedirect();
  return (
    // <div>
    //   <LastNews />
    // </div>
    <Box
      className="absolute-center"
      sx={{
        width: '800px',
        height: '600px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 500 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0, y: -500 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <Paper
          elevation={5}
          sx={{
            width: '800px',
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
              <div>
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage src={before1} alt="Image one" />
                  }
                  itemTwo={
                    <ReactCompareSliderImage src={after1} alt="Image two" />
                  }
                />
                <Typography variant="body1" sx={{ marginBottom: '15px' }}>
                  Новый интерфейс
                </Typography>
              </div>
              <div>
                <img src={after_new_1} alt="" />
                <Typography variant="body1" sx={{ marginBottom: '15px' }}>
                  Новая кнопка "Новости"
                </Typography>
              </div>
              <div>
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage src={before2} alt="Image one" />
                  }
                  itemTwo={
                    <ReactCompareSliderImage src={after2} alt="Image two" />
                  }
                />
                <Typography variant="body1" sx={{ marginBottom: '15px' }}>
                  Новый интерфейс выбора группы
                </Typography>
              </div>
            </Carousel>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default News;
