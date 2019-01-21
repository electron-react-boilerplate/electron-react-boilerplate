// @flow
import { CREATE_DATABASE } from '../actions/serverConfig';

const { exec } = require('child_process');

const initialState = {
  dialect: '',
  hostname: '',
  port: '',
  database: ''
};

export default function serverConfig(state = initialState, action) {
  switch (action.type) {
    case CREATE_DATABASE:
      console.log('Create Database action triggered');
      console.log(action);

      console.log('Exec');
      console.log(exec);

      exec(`createdb ${action.database}`, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          throw err;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });

      return {
        ...state,
        dialect: action.dialect,
        hostname: action.hostname,
        port: action.port,
        database: action.database
      };
    default:
      return state;
  }
}
