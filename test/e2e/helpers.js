/* eslint import/prefer-default-export: 0 */
import { ClientFunction } from 'testcafe';

export const getPageUrl = ClientFunction(() => window.location.href);
