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
  );
}

export default Navbar;
