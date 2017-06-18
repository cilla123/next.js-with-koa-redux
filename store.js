import Immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import immutify from './utils/immutify.js';
import promiseMiddleware from './api/utils/promise_middleware.js';
import index_reducer from './ducks/index.js';


const initial_state = new Immutable.Map();



export const initStore = (state = initial_state) => {
  const store = createStore(index_reducer, immutify(state), applyMiddleware(promiseMiddleware));
  return store;
}