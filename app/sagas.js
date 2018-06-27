import { put, takeEvery } from 'redux-saga/effects';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// worker Saga: will be fired on 'INCREMENT_COUNTER' actions
function* incrementAsyncSaga(action) {
  yield delay(action.delay);
  yield put({ type: 'INCREMENT_COUNTER' });
}

/*
  Starts incrementAsyncSaga on each dispatched `INCREMENT_COUNTER` action.
*/
function* mySaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsyncSaga);
}

export default mySaga;
