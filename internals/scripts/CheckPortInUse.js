// @flow
import chalk from 'chalk';
import detectPort from 'detect-port';

(function CheckPortInUse() {
  const port = process.env.PORT || 1212;

  detectPort(port, (err, availablePort) => {
    if (port !== availablePort) {
      throw new Error(chalk.whiteBright.bgRed.bold(
        `Port "${port}" on "localhost" is already in use. Please use another port`
      ));
    }
  });
}());
