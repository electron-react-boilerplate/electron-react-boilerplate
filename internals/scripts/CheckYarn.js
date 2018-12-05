const chalk = require('chalk');

if (!/yarn\.js$/.test(process.env.npm_execpath)) {
  console.warn(
    chalk.yellow(
      "You don't seem to be using yarn. This could produce unexpected results."
    )
  );
}
