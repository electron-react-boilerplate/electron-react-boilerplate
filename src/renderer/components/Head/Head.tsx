import skoipt from './skoipt.png';
import weather from './weather.svg';
import './Head.css';

function Head() {
  return (
    <div className="Head">
      <div className="Head-child">
        <img src={skoipt} className="Head-logo" alt="" />
        <div className="Head-weather">
          <img src={weather} className="Head-weather-icon" alt="" />
          <div className="Head-temperature" />
        </div>
        <div className="Head-date-container">
          <div className="Head-time" />
          <div className="Head-date" />
        </div>
      </div>
    </div>
  );
}

export default Head;
