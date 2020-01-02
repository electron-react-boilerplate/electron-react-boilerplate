var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createRootReducer from '../reducers';
import * as counterActions from '../actions/counter';
var history = createHashHistory();
var rootReducer = createRootReducer(history);
var configureStore = function (initialState) {
    // Redux Configuration
    var middleware = [];
    var enhancers = [];
    // Thunk Middleware
    middleware.push(thunk);
    // Logging Middleware
    var logger = createLogger({
        level: 'info',
        collapsed: true
    });
    // Skip redux logs in console during the tests
    if (process.env.NODE_ENV !== 'test') {
        middleware.push(logger);
    }
    // Router Middleware
    var router = routerMiddleware(history);
    middleware.push(router);
    // Redux DevTools Configuration
    var actionCreators = __assign(__assign({}, counterActions), routerActions);
    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Options: http://extension.remotedev.io/docs/API/Arguments.html
            actionCreators: actionCreators
        })
        : compose;
    /* eslint-enable no-underscore-dangle */
    // Apply Middleware & Compose Enhancers
    enhancers.push(applyMiddleware.apply(void 0, middleware));
    var enhancer = composeEnhancers.apply(void 0, enhancers);
    // Create Store
    var store = createStore(rootReducer, initialState, enhancer);
    if (module.hot) {
        module.hot.accept('../reducers', 
        // eslint-disable-next-line global-require
        function () { return store.replaceReducer(require('../reducers').default); });
    }
    return store;
};
export default { configureStore: configureStore, history: history };
//# sourceMappingURL=configureStore.dev.js.map