/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-sparse-arrays */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faList,
  faUser,
  faHouse,
  faWifi,
  faCalendar,
  faCheckCircle,
  faReorder,
  faGear,
  faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons';
import imgProfile from '../../assets/logo.svg';
import Tasks from './SidebarTabs/Tasks';
import Accounts from './SidebarTabs/Accounts';
import Profiles from './SidebarTabs/Profiles';
import Proxies from './SidebarTabs/Proxies';
import Calender from './SidebarTabs/Calender';
import Cops from './SidebarTabs/Cops';
import Orders from './SidebarTabs/Orders';
import Settings from './SidebarTabs/Settings';

type Tab = {
  id: number;
  title: React.ReactNode;
  content: React.ReactNode;
};

const tabsData: Tab[] = [
  {
    id: 1,
    title: (
      <>
        <FontAwesomeIcon icon={faList} /> Tasks
      </>
    ),
    content: <Tasks />,
  },
  {
    id: 2,
    title: (
      <>
        <FontAwesomeIcon icon={faUser} />
        Accounts
      </>
    ),
    content: <Accounts />,
  },
  {
    id: 3,
    title: (
      <>
        <FontAwesomeIcon icon={faHouse} />
        Profiles
      </>
    ),
    content: <Profiles />,
  },
  {
    id: 4,
    title: (
      <>
        <FontAwesomeIcon icon={faWifi} />
        Proxies
      </>
    ),
    content: <Proxies />,
  },
  {
    id: 5,
    title: (
      <>
        <FontAwesomeIcon icon={faCalendar} />
        Calender
      </>
    ),
    content: <Calender />,
  },
  {
    id: 6,
    title: (
      <>
        <FontAwesomeIcon icon={faCheckCircle} />
        Cops
      </>
    ),
    content: <Cops />,
  },
  {
    id: 7,
    title: (
      <>
        <FontAwesomeIcon icon={faReorder} />
        Orders
      </>
    ),
    content: <Orders />,
  },
  {
    id: 8,
    title: (
      <>
        <FontAwesomeIcon icon={faGear} />
        Settings
      </>
    ),
    content: <Settings />,
  },
];

// eslint-disable-next-line react/function-component-definition
const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabsData[0]);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app">
      <div className="sidebar">
        {/* <div className="sidebarWrap"> */}
        <div className="sidebar-content">
          <div className="ProfileSidebar">
            <img src={imgProfile} className="imgSize" />
            <div className="ProfileSidebarColumn">
              <div className="welcomeText">Welcome Back </div>
              <div className="profileCodeText">VSCO#9999</div>
            </div>
          </div>
          {tabsData.map((tab) => (
            <div
              key={tab.id}
              className={`tab ${activeTab.id === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <div className="sidebar-name">
          <div className="ProfileSidebar">
            <FontAwesomeIcon
              icon={faArrowsRotate}
              className="Refresh-Arrow-style"
            />
            <div className="ProfileSidebarColumn">
              <div className="welcomeText">Version </div>
              <div className="profileCodeText">V1.6.95</div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">{activeTab.content}</div>
    </div>
  );
};

export default Sidebar;
