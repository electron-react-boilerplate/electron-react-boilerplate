<<<<<<< Updated upstream
import './Navbar.css';
import news from './Icons/News.png';
import calls from './Icons/Calls.png';
import schedule from './Icons/Schedule.png';

function Navbar() {
  return (
    <div className="Navbar-main">
      <div className="Navbar-children">
        <div className="Navbar-Button-Section">
          <div className="Navbar-Button Navbar-Button-News">
            <img src={news} alt="" className="Navbar-Icons" />
            <span>Новости</span>
          </div>
        </div>
        <div className="Navbar-Button-Section">
          <div className="Navbar-Button Navbar-Button-Schedule">
            <img src={schedule} alt="" className="Navbar-Icons" />
            <span>Расписание</span>
          </div>
        </div>
        <div className="Navbar-Button-Section">
          <div className="Navbar-Button Navbar-Button-Schedule">
            <img src={calls} alt="" className="Navbar-Icons" />
            <span>Звонки</span>
          </div>
        </div>
      </div>
    </div>
=======
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
>>>>>>> Stashed changes
  );
}

export default Navbar;
