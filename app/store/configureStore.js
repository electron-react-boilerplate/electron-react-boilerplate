import configureStoreDev from './configureStore.dev';
import configureStoreProd from './configureStore.prod';
var selectedConfigureStore = process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;
export var configureStore = selectedConfigureStore.configureStore;
export var history = selectedConfigureStore.history;
//# sourceMappingURL=configureStore.js.map