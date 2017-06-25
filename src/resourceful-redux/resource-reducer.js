import actionReducers from './action-reducers';
import generateDefaultInitialState from './utils/generate-default-initial-state';
import composeReducers from './utils/compose-reducers';

// Create a resource reducer.
//
// `resourceName`: the plural name of your resource. For instance, "books".
// `options`: pass options to change the behavior of the reducer. See the docs
//   for more information on the available options.
export default function resourceReducer(resourceName, options = {}) {
  const {plugins = [], initialState = {}} = options;
  const defaultInitialState = generateDefaultInitialState();
  const initial = {
    ...defaultInitialState,
    ...initialState
  };

  return function reducer(state = initial, action) {
    const actionReducer = actionReducers[action.type];

    // We only call the built-in reducers if the action type matches one,
    // and if the resource name in the action matches the name of the resource
    // in this state slice.
    const callActionReducer = actionReducer && action.resourceName === resourceName;

    // Compute the state from the built-in reducers
    const defaultResult = callActionReducer ? actionReducer(state, action, options) : state;

    // Compute the state from any additional reducer plugins
    const customResult = composeReducers(plugins)(defaultResult, action, {
      ...options,
      resourceName
    });

    return customResult ? customResult : state;
  };
}
