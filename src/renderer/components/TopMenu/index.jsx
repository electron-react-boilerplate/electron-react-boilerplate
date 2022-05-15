import {
  IconMoon,
  IconSun,
  IconMinimize,
  IconMaximize,
  IconClose,
  IconCalendar,
  IconMinus,
} from '@douyinfe/semi-icons';
// import { Typography } from "@douyinfe/semi-ui";
import './index.css';
import { useState, useEffect } from 'react';

function TopMenu(props) {
  const [theme, setTheme] = useState('light');
  const [isMaximize, setIsMaximize] = useState(false);
  const iconSize = 'large';
  const { APP: App } = window.electron;

  const switchMode = () => {
    const { body } = document;
    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode');
      setTheme('light');
    } else {
      body.setAttribute('theme-mode', 'dark');
      setTheme('dark');
    }
  };

  useEffect(() => {
    if (isMaximize) {
      // App.fullScreenApp();
    } else {
      // App.fullScreenExitApp();
    }
  });

  const toggleMaximize = () => setIsMaximize(!isMaximize);
  const onClose = () => {
    App.closeApp();
  };
  const onMinimize = () => {
    App.minimizeApp();
  };

  return (
    <div className="topmenu Drag">
      <div className="header-left">
        <IconCalendar size="extra-large" />
      </div>
      <div className="header-right">
        <div onClick={switchMode} className="menuBtn">
          {theme === 'dark' ? (
            <IconMoon className="noDrag btnIcon" size={iconSize} />
          ) : (
            <IconSun className="noDrag btnIcon" size={iconSize} />
          )}
        </div>
        <div className="menuBtn" onClick={toggleMaximize}>
          {isMaximize ? (
            <IconMinimize className="noDrag btnIcon" size={iconSize} />
          ) : (
            <IconMaximize className="noDrag btnIcon" size={iconSize} />
          )}
        </div>
        <div className="menuBtn" onClick={onMinimize}>
          <IconMinus size={iconSize} />
        </div>
        <div className="menuBtn" onClick={onClose}>
          <IconClose className="noDrag btnIcon" size={iconSize} />
        </div>
      </div>
    </div>
  );
}

export default TopMenu;
