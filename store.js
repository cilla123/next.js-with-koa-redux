import Immutable from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import index_reducer from './ducks/index.js';
import root_saga from './sagas/root.js';

const initial_state = new Immutable.Map();

export const initStore = (state = initial_state) => {
  const saga_middleware = createSagaMiddleware();

  const store = createStore(index_reducer, applyMiddleware(saga_middleware));
  saga_middleware.run(root_saga);

  return store;
}