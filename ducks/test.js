import Immutable from 'immutable';

const initial_state = new Immutable.Map();

export const DO_TEST = 'DO_TEST';

export const doTest = (data) => {
  return {
    type: DO_TEST,
    payload: data
  }
}

export default function (state = initial_state, action) {
  console.log(action, '<this is the action!');
  switch (action.type) {
    case `${DO_TEST}_SUCCESS`:
      return state.set('time', action.data.time);
  }

  return state;
}