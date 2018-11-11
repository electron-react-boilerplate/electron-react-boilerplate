import * as globalActions from './global';
import * as galleryActions from './gallery';
import * as languageActions from './language';

const actions = {
  ...globalActions,
  ...galleryActions,
  ...languageActions,
};

export default actions;
