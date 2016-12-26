import actionTypes from './action-types';

// "handlers" are the functions that compute the new state given the existing
// state and the action. This function merges in the default handlers, which
// handle basic CRUD actions, with your customHandlers, which you pass in
// when creating a resource.
function getHandlers(customHandlers) {
  const defaultHandlers = {

  };

  return {
    ...defaultHandlers,
    ...customHandlers
  }
}

export default function generateReducers(idType, initialState, customHandlers) {
  const handlers = getHandlers(customHandlers);

  return function reducer(state = initialState, action) {
    const handler = handlers[types];
    return handler ? handler(state, action) : state;
  }
}
