/* eslint-disable import/no-duplicates */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize, faClose } from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line import/no-duplicates

interface TextItem {
  label: string;
  value: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const textItems: TextItem[] = [
  { label: 'Entries', value: '0000' },
  { label: 'Poops', value: '0000' },
  { label: 'Entries', value: '0000' },
  { label: 'Failures', value: '0000' },
  { label: 'Idle Task', value: '0000' },
];
// eslint-disable-next-line react/function-component-definition
const Header: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-undef
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const minimizeWindow = () => {
    window.electron.ipcRenderer.sendMessage('minimize');
  };

  const closeWindow = () => {
    window.electron.ipcRenderer.sendMessage('close');
  };
  return (
    <div className="bar">
      <div className="titleFlex">
        <div className="titleText">Settings</div>
        <div className="subtitleText">Manage your Settings</div>
      </div>
      <div className="texts">
        {textItems.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="text" key={index}>
            <span className="texts-text"> {item.label}:</span>{' '}
            <span className="texts-numbers">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="icons">
        <div className="real-time">{currentTime}</div>
        <i className="icon" onClick={minimizeWindow}>
          <FontAwesomeIcon icon={faWindowMinimize} />
        </i>
        <i className="icon" onClick={closeWindow}>
          <FontAwesomeIcon icon={faClose} />
        </i>
      </div>
    </div>
  );
};

export default Header;
