import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.scss';
import { userService } from './services/user.service';

const store = configureStore();
userService.logout().catch((error) => {
  console.log(error);
}).then(() => renderApp()).catch();

function renderApp() {
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  );

  if (module.hot) {
    module.hot.accept('./containers/Root', () => {
      const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
      render(
        <AppContainer>
          <NextRoot store={store} history={history} />
        </AppContainer>,
        document.getElementById('root')
      );
    });
  }
}
