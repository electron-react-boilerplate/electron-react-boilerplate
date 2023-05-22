/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  // faChevronDown,
  // faChevronUp,
  // faChevronLeft,
  // faChevronRight,
  // faCircleDot,
} from '@fortawesome/free-solid-svg-icons';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

function FirstContainerSettingPage() {
  const [LicenseKey, setLicenseKey] = useState(false);
  const [webhook, setWebhook] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hashedText =
    'asdasdasdasdasdasdasdasdasdasdasdassdaKLFwnfNWDNFOnsdfonSODFNodfoNSDOFNsdnfNSDFNSD';
  const [isActive, setIsActive] = useState(false);
  const [isActivetest, setIsActiveTest] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibletest, setVisibleTest] = useState(false);

  const toggleLicenseVisibility = () => {
    setLicenseKey(!LicenseKey);
  };
  const toggleWebhookVisibility = () => {
    setWebhook(!webhook);
  };
  const handleClick = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setIsActive(false);
    setVisible(false);
  };
  const handleContinue = () => {
    // Handle the continue action here
    setIsActive(true);
    setVisible(false);
  };
  const handleClickTest = () => {
    setVisibleTest(true);
  };
  const handleCancelTest = () => {
    setIsActiveTest(false);
    setVisibleTest(false);
  };
  const handleContinueTest = () => {
    // Handle the continue action here
    setIsActiveTest(true);
    setVisibleTest(false);
  };
  return (
    <div className="columnTwoBars">
      <div className="textFirstBar">License Key</div>
      <div className="First-RowBar">
        <input
          type={LicenseKey ? 'text' : 'password'}
          value={hashedText}
          className="inputBarfirst"
          placeholder="Enter your password"
          readOnly
        />
        <button className="eyeButton" onClick={toggleLicenseVisibility}>
          {LicenseKey ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </button>
        <button
          className={`BackBtnDeactivate ${isActive ? 'greenBackground' : ''}`}
          onClick={handleClick}
        >
          {isActive ? 'Activate License' : 'Deactivate License'}
        </button>
        <Modal
          title={
            <div style={{ backgroundColor: '#0f1015', color: '#a2a2b1' }}>
              Active the License
            </div>
          }
          open={visible}
          onCancel={handleCancel}
          closeIcon={<CloseOutlined style={{ color: '#a2a2b1' }} />}
          footer={[
            <Button
              key="cancel"
              className="btnCancel"
              onClick={handleCancel}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>,
            <Button
              key="continue"
              className="btnContinue"
              type="primary"
              onClick={handleContinue}
            >
              Continue
            </Button>,
          ]}
          // Set the background color of the Modal content
          wrapClassName="custom-modal" // Add a custom class to the Modal wrapper for additional styling
        >
          <p>Are you sure ?</p>
        </Modal>
      </div>
      <div className="textFirstBar">Discord Webhook </div>
      <div className="First-RowBar">
        <input
          type={webhook ? 'text' : 'password'}
          value={hashedText}
          className="inputBarfirst"
          placeholder="Enter your password"
          readOnly
        />
        <button className="eyeButton" onClick={toggleWebhookVisibility}>
          {webhook ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </button>
        <button
          className={`BackBtnDeactivate ${
            isActivetest ? 'greenBackground' : ''
          }`}
          onClick={handleClickTest}
        >
          {isActivetest ? 'Testing ...' : 'Test Webhook'}
        </button>
        {/* <button className="BackBtnDeactivate">Test Webhook</button> */}
        <Modal
          title={
            <div style={{ backgroundColor: '#0f1015', color: '#a2a2b1' }}>
              Test Webhook
            </div>
          }
          open={visibletest}
          onCancel={handleCancelTest}
          closeIcon={<CloseOutlined style={{ color: '#a2a2b1' }} />}
          footer={[
            <Button
              key="cancel"
              className="btnCancel"
              onClick={handleCancelTest}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>,
            <Button
              key="continue"
              className="btnContinue"
              type="primary"
              onClick={handleContinueTest}
            >
              Continue
            </Button>,
          ]}
          // Set the background color of the Modal content
          wrapClassName="custom-modal" // Add a custom class to the Modal wrapper for additional styling
        >
          <p>Are you sure ?</p>
        </Modal>
      </div>
    </div>
  );
}

export default FirstContainerSettingPage;
