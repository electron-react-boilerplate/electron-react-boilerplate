import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default class App extends React.Component<Props> {
  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}
