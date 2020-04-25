import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

import TextField from '@material-ui/core/TextField';

// import {TgMessageRouter} from '../actions/telegram_message_router/tg_mp_router';

function initTgClient() {
  console.log("initTgClient");
  // const tgClient = new TgMessageRouter(1004064, 'fcfc1e4ff68c2d0d2f95c2cada29730a', 'tharusha091', '+94710841084');

}

export default function Home() {
  return (
    <div className={styles.container} data-tid="container">
      <h2>AT4 MT4</h2>
      <div>
        <div>
          <form className={styles.username} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Username" />
          </form>
        </div>
        <div>
          {/* <PinNumber></PinNumber> */}
          <form className={styles.phoneNumber} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Phone Number" />
          </form>
        </div>
        <div className={styles.next}>
          <Link to={routes.COUNTER} onClick={initTgClient}>Next</Link>
        </div>
      </div>

    </div>
  );
}
