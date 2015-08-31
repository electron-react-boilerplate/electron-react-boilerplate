import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import createStore from '../utils/createStore';


export default createStore({

});


AppDispatcher.register(payload => {
  var action = payload.action;
  switch (action.type) {
  case ActionTypes.ROUTE_CHANGE:
    break;
  default:

  }
});
