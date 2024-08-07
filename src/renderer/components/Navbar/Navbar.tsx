import './Navbar.css';

function Navbar() {
  return (
    <div className="Navbar-main">
      <div className="Navbar-children">
        <div className="Navbar-Button Navbar-Button-News">
          <span>Новости</span>
        </div>
        <div className="Navbar-Button Navbar-Button-Schedule">
          <span>Расписание</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
