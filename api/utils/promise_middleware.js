module.exports = function promiseMiddleware () {
  return next => action => {
    const action_copy = Object.assign({}, action);
    action_copy.promise = undefined;
    const promise = action.promise;
    const type = action.type;

    if (!promise) return next(action);

    const SUCCESS = type;

    const REQUEST = `${type}_REQUEST`;
    const FAILURE = `${type}_FAILURE`;

    action_copy.type = REQUEST;
    next(action_copy);

    return promise
      .then(res => {
        action_copy.type = SUCCESS;
        action_copy.res = res;
        next(action_copy);

        return true;
      })
      .catch(error => {
        action_copy.type = FAILURE;
        action_copy.error = error;
        next(action_copy);
        if (error.request) {
          console.log(error.status || '', error.data || error.statusText, error.config.url);
        } else {
          console.log(error.message);
        }

        return false;
      });
  };
};