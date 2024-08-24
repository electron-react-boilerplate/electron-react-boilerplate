import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import TodayIcon from '@mui/icons-material/Today';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { motion } from 'framer-motion';

function Navbar() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState('Main');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <motion.div
      className="animatable_nav"
      initial={{ opacity: 0, borderRadius: '0px' }}
      animate={{ opacity: 1, borderRadius: '16px' }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <BottomNavigation
        className="animatable_nav"
        sx={{
          width: 700,
          height: 75,
          borderRadius: '15px',
          position: 'absolute',
          zIndex: '0',
          bottom: '30px',
          left: '50%',
          transform: 'translate(-50%)',
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Главная"
          value="Main"
          onClick={() => navigate('/schedule')}
          icon={<HomeIcon fontSize="large" />}
        />
        <BottomNavigationAction
          label="Новости"
          value="News"
          icon={<FeedIcon fontSize="large" />}
        />
        <BottomNavigationAction
          label="Расписание"
          value="Schedule"
          icon={<TodayIcon fontSize="large" />}
        />
        <BottomNavigationAction
          label="Звонки"
          value="Calls"
          onClick={() => navigate('/schedule/calls')}
          icon={<NotificationsActiveIcon fontSize="large" />}
        />
      </BottomNavigation>
    </motion.div>
  );
}

export default Navbar;
