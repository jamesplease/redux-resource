import requestStatusesPlugin from './request-statuses-plugin';
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

  const allPlugins = plugins.concat(requestStatusesPlugin);

  const computedPlugins = allPlugins.map(plugin => {
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
    if (process.env.NODE_ENV !== 'production') {
      if (action.request && typeof action.request !== 'string') {
        warning(
          `An invalid request name was included in an action with type ` +
          `"${action.type}". Request names must be strings.`
        );
      }

      if (action.list && typeof action.list !== 'string') {
        warning(
          `An invalid list was included in an action with type ` +
          `"${action.type}". Lists must be strings.`
        );
      }
    }

    return composeReducers(computedPlugins)(state, action);
  };
}
