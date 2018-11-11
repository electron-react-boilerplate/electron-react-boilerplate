/*
 *
 * LanguageProvider actions
 *
 */
export const CHANGE_LOCALE = 'CHANGE_LOCALE';

export function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale
  };
}
