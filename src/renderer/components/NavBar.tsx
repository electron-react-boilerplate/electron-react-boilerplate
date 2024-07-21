// src/renderer/components/Navbar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // Import Link
import dashboardIcon from '../../../assets/icons/dashboard-icon.png';
import tasksIcon from '../../../assets/icons/task-icon.png';
import profilesIcon from '../../../assets/icons/profiles-icon.png';
import proxiesIcon from '../../../assets/icons/proxies-icon.png';
import settingsIcon from '../../../assets/icons/settings-icon.png';
import logo from '../../../assets/icons/256x256.png';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-container mt-3 ">
        <img className="logo" src={logo} alt="" />
        <div className="logoname">
          <span className="h1 shadow-lg shadow-cyan-500/50">
            <strong>Quantum</strong>
          </span>{' '}
          {/* Add your website name or any text here */}
        </div>
      </div>
      <NavLink to="/dashboard" className="btn btn-lg" activeClassName="active">
        <img src={dashboardIcon} alt="" className="img-logo" />
        Dashboard
      </NavLink>
      <NavLink to="/tasks" className="btn btn-lg" activeClassName="active">
        <img src={tasksIcon} alt="" className="img-logo" />
        Tasks
      </NavLink>
      <NavLink to="/profiles" className="btn btn-lg" activeClassName="active">
        <img src={profilesIcon} alt="" className="img-logo" />
        Profiles
      </NavLink>
      <NavLink to="/proxies" className="btn btn-lg" activeClassName="active">
        <img src={proxiesIcon} alt="" className="img-logo" />
        Proxies
      </NavLink>
      <NavLink to="/settings" className="btn btn-lg" activeClassName="active">
        <img src={settingsIcon} alt="" className="img-logo" />
        Settings
      </NavLink>
    </div>
  );
};

export default Navbar;
