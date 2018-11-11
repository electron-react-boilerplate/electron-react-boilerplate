import * as counterActions from './counter';
import * as languageActions from './language';

const actions = {
  ...counterActions,
  ...languageActions
};

export default actions;
