import { takeEvery } from 'redux-saga';
import { take, fork, put } from 'redux-saga/effects';

import * as TEST_ACTIONS from '../ducks/test';

export function * doTest () {
  const time = Date.now();
  yield put({type: `${TEST_ACTIONS.DO_TEST}_SUCCESS`, data: {time}})
}

function * observerDoTest () {
  yield * takeEvery(TEST_ACTIONS.DO_TEST, doTest);
}

export default function * watchTest () {
  yield fork(observerDoTest);
}