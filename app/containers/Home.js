import * as React from 'react';
import DevTools from 'mobx-react-devtools';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        {process.env.NODE_ENV === 'development' ? <DevTools /> : null}
        <div>Electron-Mobx-Boilerplate</div>
      </div>
    );
  }
}
