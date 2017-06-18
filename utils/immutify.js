import Immutable from 'immutable';

export default function immutifyState (json) {
  const result = Object.assign({}, json);

  Object.keys(result).forEach(key => {
    result[key] = Immutable.fromJS(result[key]);
  });

  return result;
};