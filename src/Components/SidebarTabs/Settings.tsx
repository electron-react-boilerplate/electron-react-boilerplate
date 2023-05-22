/* eslint-disable react/button-has-type */
import React from 'react';
import Header from 'Components/SettingsPage/Header';
import BarSettingPage from 'Components/SettingsPage/SecondContainerSettingPage';
import FirstContainerSettingPage from 'Components/SettingsPage/FirstContainerSettingPage';

function Settings() {
  return (
    <>
      <Header />
      <FirstContainerSettingPage />
      <BarSettingPage />
    </>
  );
}

export default Settings;
