import actionReducers from './action-reducers';

export default function generateReducers(options) {
  const {initialState, resourceName} = options;

  return function reducer(state = initialState, action) {
    const actionReducer = actionReducers[action.type];
    if (!actionReducer || action.resourceName !== resourceName) {
      return state;
    }

    const result = actionReducer(state, action);
    return result ? result : state;
  };
}
