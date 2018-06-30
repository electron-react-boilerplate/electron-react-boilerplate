// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ErrorHandler from '../errorHandling/RendererProcessErrorHandler';

// TODO move to error handler middleware
const errorHandler = new ErrorHandler();
errorHandler.init();

type Props = {
  toggleErrorReporting: () => void,
  isReportingErrors: boolean
};

export default class ErrorReporting extends Component<Props> {
  props: Props;
  simulateRendererError = () => {
    throw new Error('simulated error');
  };
  simulateRendererCrash = () => {
    const shouldContinue = global.confirm(
      'This will CRASH the app, and will require a restart. use it to test whether electron crash reporter is working propertly'
    );
    if (shouldContinue) {
      // $FlowFixMe
      process.crash();
    }
  };
  simulateMainProcessError = () => {
    errorHandler.sendDangerousTestErrorToMain();
  };
  simulateMainProcessCrash = () => {
    const shouldContinue = global.confirm(
      'This will CRASH the app, and will require a restart. use it to test whether electron crash reporter is working propertly'
    );
    if (shouldContinue) {
      // $FlowFixMe
      errorHandler.sendDangerousTestCrashToMain();
    }
  };

  toggleErrorReporting = () => {
    this.props.toggleErrorReporting();
    // TODO move to error handler middleware
    if (this.props.isReportingErrors) {
      errorHandler.stopReporting();
    } else {
      errorHandler.startReporting();
    }
  };
  render() {
    const { isReportingErrors } = this.props;
    return (
      <div>
        <Link to="/">Back home</Link>
        <h1>Error Reporting Demo</h1>
        <p>Make sure your console is open!</p>
        <p>
          To test crash reporting, run `$ node app/test-crash-server.js` to
          start a dummy server that logs crash reports
        </p>
        <p>Currenty reporting errors: {String(isReportingErrors)}</p>
        <div>
          <button onClick={this.toggleErrorReporting}>
            Toggle error reporting
          </button>
        </div>
        <h6>Simulate Renderer errors</h6>
        <div>
          <button onClick={this.simulateRendererError}>
            Simulate renderer error
          </button>
        </div>
        <div>
          <button onClick={this.simulateRendererCrash}>
            Simulate renderer crash
          </button>
        </div>
        <h6>Simulate main process errors</h6>
        <div>
          <button onClick={this.simulateMainProcessError}>
            Simulate main process error
          </button>
        </div>
        <div>
          <button onClick={this.simulateMainProcessCrash}>
            Simulate main process crash
          </button>
        </div>
      </div>
    );
  }
}
