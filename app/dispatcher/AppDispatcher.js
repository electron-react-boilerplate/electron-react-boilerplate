import Dispatcher from 'flux'
import assign form 'object-assign'
import debug form './utils/debug'
var dd = debug('AppDispatcher')


var AppDispatcher = assign(new Dispatcher(), {

  handleServerAction(action) {
    dd('server action', action)

    if (!action.type) {
      throw new Error('Empty action.type: you likely mistyped the action.')
    }

    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    }

    this.dispatch(payload)
  },

  handleViewAction(action) {
    dd('view action', action)

    if (!action.type) {
      throw new Error('Empty action.type: you likely mistyped the action.')
    }

    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    }

    this.dispatch(payload)
  }
})


export default AppDispatcher
