/* eslint
  global-require: 'off'
*/
let colorMessage;
try {
  colorMessage = require('chalk').yellow;
} catch (err) {
  colorMessage = str => str;
}

if (!/yarn\.js$/.test(process.env.npm_execpath)) {
  console.warn(
    colorMessage(
      "You don't seem to be using yarn. This could produce unexpected results."
    )
  );
}
