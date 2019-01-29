/** @jsx jsx */
import * as React from 'react';
import { jsx, css } from '@emotion/core';
import DevTools from 'mobx-react-devtools';

export default class HomePage extends React.Component {
  render() {
    const styles = css({
      display: 'flex',
      justifyContent: 'center'
    });

    return (
      <div>
        {process.env.NODE_ENV === 'development' ? <DevTools /> : null}
        <div css={styles}>Electron-Mobx-Boilerplate</div>
      </div>
    );
  }
}
