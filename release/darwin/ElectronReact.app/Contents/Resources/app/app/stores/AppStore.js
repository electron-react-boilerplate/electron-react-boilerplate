import AppDispatcher from '../dispatcher/AppDispatcher'
import ActionTypes from '../constants/ActionTypes'
import createStore from '../utils/createStore'


export default createStore({

})


AppDispatcher.register(function(payload) {
  var action = payload.action
  switch (action.type) {

    default:

  }
})
