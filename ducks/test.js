import Immutable from 'immutable';
import request from 'superagent';

const API_URL = 'http://vacucu.ci.zaje.me:3000/v1/api'
const initial_state = new Immutable.Map();

export const DO_TEST = 'DO_TEST';

export const doTest = (data) => {
  return {
    type: DO_TEST,
    promise: request.post(`${API_URL}/tests`)
  }
}

export default function (state = initial_state, action) {
  switch (action.type) {
    case DO_TEST:
      return state.set('time', JSON.stringify(action.res.body));
    default:
      return state;
  }
}