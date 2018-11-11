/**
 * Gets the next batch of items
 */
import { put, select, takeLatest, all, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  increment,
  INCREMENT_ASYNC,
  INCREMENT_IF_ODD
} from '../actions/counter';
import { makeSelectCounter } from '../selectors/counter';

/**
 * Items request/response handler
 */
export function* incrementAsync() {
  yield call(delay, 500);

  yield put(increment());
}

/**
 * Items request/response handler
 */
export function* incrementIfOdd() {
  const counter = yield select(makeSelectCounter());

  if (counter % 2 !== 0) {
    yield put(increment());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* counterSaga() {
  yield all([
    takeLatest(INCREMENT_ASYNC, incrementAsync),
    takeLatest(INCREMENT_IF_ODD, incrementIfOdd)
  ]);
}
