import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import TodayIcon from '@mui/icons-material/Today';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Paper } from '@mui/material';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = React.useState(location.pathname);

  // Update value when location changes
  React.useEffect(() => {
    if (location.pathname === '/') {
      setValue('Main');
    } else if (location.pathname === '/news') {
      setValue('News');
    } else if (location.pathname === '/schedule') {
      setValue('Schedule');
    } else if (location.pathname === '/calls') {
      setValue('Calls');
    } else if (location.pathname === '/other') {
      setValue('Other');
    }
  }, [location.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: '15px',
        position: 'absolute',
        zIndex: '1',
        bottom: '20px',
        left: '50%',
        transform: 'translate(-50%)',
      }}
    >
      <BottomNavigation
        sx={{
          width: 700,
          height: 80,
          borderRadius: '15px',
          position: 'absolute',
          bottom: '0px',
          left: '50%',
          transform: 'translate(-50%)',
        }}
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Главная"
          value="Main"
          onClick={() => navigate('/')}
          icon={<HomeIcon fontSize="large" />}
        />
        <BottomNavigationAction
          label="Новости"
          value="News"
          onClick={() => navigate('/news')}
          icon={<FeedIcon fontSize="large" />}
        />
        <BottomNavigationAction
          label="Расписание"
          value="Schedule"
          onClick={() => navigate('/schedule')}
          icon={<TodayIcon fontSize="large" />}
        />
        <BottomNavigationAction
          label="Звонки"
          value="Calls"
          onClick={() => navigate('/calls')}
          icon={<NotificationsActiveIcon fontSize="large" />}
        />
        <BottomNavigationAction
          label="Прочее"
          value="Other"
          onClick={() => navigate('/other')}
          icon={<MoreHorizIcon fontSize="large" />}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default Navbar;
