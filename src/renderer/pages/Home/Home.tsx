import { useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import "../../App.css"
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
  return (
    <Box
      className="absolute-center"
      sx={{
        width: '1500px',
        borderRadius: '16px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 500, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <Paper elevation={5}>
          <Carousel
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
            <div>
              <img src={Slide1} />
            </div>
            <div>
              <img src={Slide2} />
            </div>
            <div>
              <img src={Slide3} />
            </div>
            <div>
              <img src={Slide4} />
            </div>
            <div>
              <img src={Slide5} />
            </div>
            <div>
              <img src={Slide6} />
            </div>
            <div>
              <img src={Slide7} />
            </div>
            <div>
              <img src={Slide8} />
            </div>
            <div>
              <img src={Slide9} />
            </div>
            <div>
              <img src={Slide10} />
            </div>
            <div>
              <img src={Slide11} />
            </div>
            <div>
              <img src={Slide12} />
            </div>
            <div>
              <img src={Slide13} />
            </div>
            <div>
              <img src={Slide14} />
            </div>
            <div>
              <img src={Slide15} />
            </div>
            <div>
              <img src={Slide16} />
            </div>
          </Carousel>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default Home;
