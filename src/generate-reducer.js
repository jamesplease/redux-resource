import actionReducers from './action-reducers';
import {composeReducers} from './utils';

export default function generateReducers(options) {
  const {initialState, resourceName, plugins} = options;

  return function reducer(state = initialState, action) {
    const actionReducer = actionReducers[action.type];
    if (action.resourceName !== resourceName) {
      return state;
    }

    // Compute the state from the built-in reducers
    const defaultResult = actionReducer ? actionReducer(state, action) : state;
    // Compute the state from any additional reducer plugins
    const customResult = composeReducers(plugins)(defaultResult, action);

    return customResult ? customResult : state;
  };
}
