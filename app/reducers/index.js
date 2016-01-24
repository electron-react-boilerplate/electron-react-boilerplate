import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import counter from './counter';

const rootReducer = combineReducers({
  counter,
  routing
});

export default rootReducer;
