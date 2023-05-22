/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // faChevronDown,
  // faChevronUp,
  faChevronLeft,
  faChevronRight,
  faRightFromBracket,
  faCircleDot,
} from '@fortawesome/free-solid-svg-icons';
import { Switch } from 'antd';
import shoeImg from '../../../assets/SB Dunk Neckface.png';
import LineChartComponent from './LineChartComponent';

interface Option {
  value: string;
  label: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const options: Option[] = [
  { value: '2', label: 'Option 1' },
  { value: '4', label: 'Option 2' },
  { value: '4', label: 'Option 3' },
];
const data = [
  { month: 'January', checkouts: 75, failures: 95 },
  { month: 'February', checkouts: 60, failures: 240 },
  { month: 'March', checkouts: 80, failures: 20 },
  { month: 'April', checkouts: 25, failures: 40 },
  { month: 'May', checkouts: 25, failures: 37 },
  { month: 'June', checkouts: 40, failures: 140 },
  { month: 'July', checkouts: 120, failures: 220 },
  { month: 'Augest', checkouts: 100, failures: 65 },
  { month: 'September', checkouts: 230, failures: 75 },
  { month: 'October', checkouts: 30, failures: 45 },
  { month: 'November', checkouts: 130, failures: 145 },
  { month: 'December', checkouts: 75, failures: 95 },
];
interface ShoeCardProps {
  name: string;
  image: React.ReactNode;
  description: string;
}
const shoeData = [
  {
    name: 'Shoe 1',
    image: shoeImg,
    description1: 'Successfully Check Out',
    description2: 'Nike SB Dunk Low Pro ',
    description3: 'Neckface | us12.5',
  },
  {
    name: 'Shoe 2',
    image: shoeImg,
    description1: 'Successfully Check Out',
    description2: 'Nike SB Dunk Low Pro ',
    description3: 'Neckface | us12.5',
  },
  {
    name: 'Shoe 3',
    image: shoeImg,
    description1: 'Successfully Check Out',
    description2: 'Nike SB Dunk Low Pro ',
    description3: 'Neckface | us12.5',
  },
  {
    name: 'Shoe 4',
    image: shoeImg,
    description1: 'Successfully Check Out',
    description2: 'Nike SB Dunk Low Pro ',
    description3: 'Neckface | us12.5',
  },
  {
    name: 'Shoe 5',
    image: shoeImg,
    description1: 'Successfully Check Out',
    description2: 'Nike SB Dunk Low Pro ',
    description3: 'Neckface | us12.5',
  },

  // Add more shoe items as needed
];

function BarSettingPage() {
  const [selectedOption, setSelectedOption] = useState('');
  const [numberbrowsers, setNumberBrowsers] = useState(10);
  const [numberHarvester, setNumberHarvester] = useState(10);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: { target: { value: any } }) => {
    setSelectedOption(event.target.value);
  };

  const handleDecrementBroweser = () => {
    setNumberBrowsers(numberbrowsers - 1);
  };

  const handleIncrementBroweser = () => {
    setNumberBrowsers(numberbrowsers + 1);
  };
  const handleDecrementHarvester = () => {
    setNumberHarvester(numberHarvester - 1);
  };

  const handleIncrementHarvester = () => {
    setNumberHarvester(numberHarvester + 1);
  };

  const onChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <>
      <div className="Container">
        <div className="firstContainerColumn">
          <div className="rowBars">
            <div className="columnSelect">
              <span className="titlesBar">Default Nike Region</span>
              <select
                className="select-optionDrop"
                id="select-optionDrop"
                value={selectedOption}
                onChange={handleChange}
              >
                <option
                  className="select-optionDrop-placeholder"
                  value=""
                  disabled
                >
                  Choose One
                </option>
                {options.map((option, index) => (
                  <option
                    key={index}
                    value={option.value}
                    className="select-optionDrop-item"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="columnArrowBox">
              <span className="titlesBar"> Open Browsers</span>
              <div className="arrow-boxesOne">
                <div onClick={handleDecrementBroweser}>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="hoverArrows"
                  />
                </div>
                <div>{numberbrowsers}</div>
                <div onClick={handleIncrementBroweser}>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="hoverArrows"
                  />
                </div>
              </div>
            </div>
            <div className="columnArrowBox">
              <span className="titlesBar"> Open Harvesters</span>
              <div className="arrow-boxesOne">
                <div onClick={handleDecrementHarvester}>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="hoverArrows"
                  />
                </div>
                <div>{numberHarvester}</div>
                <div onClick={handleIncrementHarvester}>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="hoverArrows"
                  />
                </div>
              </div>
            </div>
            <div className="ResetButton">Reset BG Processor</div>
          </div>
          <div className="chartWrap">
            <div className="flexHeaderChart">
              <div>
                <div className="licenseTtext">Your License's</div>
                <div className="textStat">Statistics</div>
              </div>
              <div>
                <div className="space">
                  <FontAwesomeIcon icon={faCircleDot} className="greenDot" />
                  Check Outs
                </div>
                <div className="space">
                  <FontAwesomeIcon icon={faCircleDot} className="redDot" />
                  Failures
                </div>
              </div>
            </div>
            <LineChartComponent data={data} />
          </div>
        </div>
        <div className="SecondContainerColumn">
          <div className="rowTwoButtons">
            <div className="cookieBtn">Cookie Jar</div>
            <div className="switchWrap">
              <div className="textDrkLight">
                <span className="titlesBar">Dark</span>
                <span className="titlesBar">White</span>
              </div>
              {/* <div className="SwitchBtn">switch</div> */}
              <Switch
                checked={isChecked}
                onChange={onChange}
                checkedChildren="ON"
                unCheckedChildren="OFF"
                className={isChecked ? 'white-switch' : 'blue-switch'}
              />
            </div>
          </div>
          <div className="CardsWrap">
            <div className="styleNotf">Notifications</div>
            <div className="CardsContainer">
              {shoeData.map((shoe, index) => (
                <div className="ShoeCard" key={`shoe-${index}`}>
                  <img className="imgCard" src={shoe.image} alt={shoe.name} />
                  <div className="descriptionFlex">
                    <div className="colorDes1">{shoe.description1}</div>
                    <div className="colorDes2">{shoe.description2}</div>
                    <div className="colorDes2">{shoe.description3}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="buttonsContainerRow">
        <div className="space">
          <button className="contactbtn">Contact Support</button>
          <button className="logbtn">
            <FontAwesomeIcon icon={faRightFromBracket} /> Log Out
          </button>
        </div>

        <div className="space">
          <button className="contactbtn">Export</button>
          <button className="contactbtn">Import</button>
        </div>
      </div>
    </>
  );
}

export default BarSettingPage;
