import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import TodayIcon from '@mui/icons-material/Today';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function Navbar() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState('Main');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <BottomNavigation
      sx={{
        width: 700,
        height: 75,
        borderRadius: '15px',
        position: 'absolute',
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
  );
}

export default Navbar;
