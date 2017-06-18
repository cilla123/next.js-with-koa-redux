import { fork, all } from 'redux-saga/effects';

import test from './test.js';

export default function * rootSaga() {
  yield fork(test);
};