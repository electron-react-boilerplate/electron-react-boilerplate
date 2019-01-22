const chalk = require('chalk');
const db = require('./models/db');
const Alpha = require('./models/alpha');
const Delta = require('./models/delta');

(async () => {
  await db.sync({ force: true });
  try {
    await Alpha.bulkCreate([
      { bravo: 'foxtrot', charlee: 0 },
      { bravo: 'golf', charlee: 1 }
    ]);
    await Delta.bulkCreate([
      { echo: 'hotel' },
      { echo: 'india' },
      { echo: 'juliet' }
    ]);
    await console.log(
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
