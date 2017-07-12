import actionReducers from './action-reducers';
import generateDefaultInitialState from './utils/generate-default-initial-state';
import composeReducers from './utils/compose-reducers';
import warning from './utils/warning';

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

  if (process.env.NODE_ENV !== 'production') {
    if (typeof resourceName !== 'string') {
      warning(
        `The value of "resourceName" that you passed to resourceReducer was ` +
        `not a string. The resource name must be a string. You should check ` +
        `your reducer configuration.`
      );
    }
  }

  const computedPlugins = plugins.map(plugin => {
    const result = plugin(resourceName, options);
    if (process.env.NODE_ENV !== 'production') {
      if (typeof result !== 'function') {
        warning(
          `A plugin was initialized that did not return a function. Plugins ` +
          `should return a function with the same signature as a reducer. ` +
          `For more, refer to the documentation on plugins: ` +
          `https://resourceful-redux.js.org/docs/guides/plugins.html`
        );
      }
    }
    return result;
  });

  return function reducer(state = initial, action) {
    const actionReducer = actionReducers[action.type];

    if (process.env.NODE_ENV !== 'production') {
      if (actionReducer && !action.resourceName) {
        warning(
          `A resourceName was not included in an action with type ` +
          `"${action.type}". Without a resourceName, Resourceful Redux will ` +
          `not be able to update a slice of your store. For more, refer to ` +
          `the guide on CRUD Actions: ` +
          `https://resourceful-redux.js.org/docs/guides/crud-actions.html`
        );
      }

      if (action.label && typeof action.label !== 'string') {
        warning(
          `An invalid label was included in an action with type ` +
          `"${action.type}". Labels must be strings.`
        );
      }
    }

    // We only call the built-in reducers if the action type matches one,
    // and if the resource name in the action matches the name of the resource
    // in this state slice.
    const callActionReducer = actionReducer && action.resourceName === resourceName;

    // Compute the state from the built-in reducers
    const defaultResult = callActionReducer ? actionReducer(state, action, options) : state;

    // Compute the state from any additional reducer plugins
    const customResult = composeReducers(computedPlugins)(defaultResult, action);

    return customResult ? customResult : state;
  };
}
