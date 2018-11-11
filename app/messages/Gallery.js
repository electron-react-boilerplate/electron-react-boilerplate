/*
 * Gallery Messages
 *
 * This contains all the text for the Gallery component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.Gallery.header',
    defaultMessage: 'Test Masonry',
  },
  noResults: {
    id: 'app.containers.App.noResults',
    defaultMessage: 'Nothing to see here.',
  },
  onError: {
    id: 'app.containers.App.onError',
    defaultMessage: 'Oh noes! An unexpected error occured.',
  },
  endOfSCroll: {
    id: 'app.containers.App.endOfSCroll',
    defaultMessage: "That's all folks!",
  },
});
