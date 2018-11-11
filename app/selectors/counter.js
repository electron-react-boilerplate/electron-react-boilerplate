import { createSelector } from 'reselect';

import { initialState } from '../reducers/counter';

/**
 * Direct selector to the counter state domain
 */
const selectCounter = state => state.get('counter', initialState);

/**
 * Select the count
 */
const makeSelectCounter = () =>
  createSelector(selectCounter, counterState => counterState.get('count'));

export { selectCounter, makeSelectCounter };
