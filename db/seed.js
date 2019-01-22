const chalk = require('chalk');
const db = require('./models/db');
// const { db, Vegetable, Plot, Gardener } = require('./models');

(async () => {
  db.sync({ force: true });
  try {
    console.log(
      chalk`{cyan db}{white.bold .}{yellow sync}{yellowBright ()}{greenBright.bold  Executed SUCCESSFULLY!!}`
    );
  } catch (error) {
    console.error(chalk`{redBright.bold ${error.message}}`);
    console.error(chalk`{red ${error.stack}}`);
  } finally {
    db.close();
    console.log(
      chalk`{cyan db}{white.bold .}{yellow close}{yellowBright ()}{greenBright.bold  Executed SUCCESSFULLY!!}`
    );
  }
})();
