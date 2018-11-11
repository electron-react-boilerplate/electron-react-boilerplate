/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */
import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

export default class LanguageProvider extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { locale, children, messages } = this.props;

    return (
      <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.defaultProps = {
  locale: undefined,
  messages: undefined
};

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired
};
