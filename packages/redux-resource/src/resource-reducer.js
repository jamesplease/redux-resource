import updateResourcesPlugin from './update-resources-plugin';
import requestStatusesPlugin from './request-statuses-plugin';
import generateDefaultInitialState from './utils/generate-default-initial-state';
import composeReducers from './utils/compose-reducers';
import warning from './utils/warning';

// Create a resource reducer.
//
// `resourceType`: the kind of resource that this slice represents. For instance, "books".
// `options`: pass options to change the behavior of the reducer. See the docs
//   for more information on the available options.
export default function resourceReducer(resourceType, options = {}) {
  const { plugins = [], initialState = {} } = options;
  const defaultInitialState = generateDefaultInitialState();
  const initial = {
    ...defaultInitialState,
    ...initialState,
    resourceType,
  };

  if (process.env.NODE_ENV !== 'production') {
    if (typeof resourceType !== 'string') {
      warning(
        `The value of "resourceType" that you passed to resourceReducer was ` +
          `not a string. The resource name must be a string. You should check ` +
          `your reducer configuration.`
      );
    }
  }

  const allPlugins = plugins.concat(
    requestStatusesPlugin,
    updateResourcesPlugin
  );

  const computedPlugins = allPlugins.map(plugin => {
    const result = plugin(resourceType, options);
    if (process.env.NODE_ENV !== 'production') {
      if (typeof result !== 'function') {
        warning(
          `A plugin was initialized that did not return a function. Plugins ` +
            `should return a function with the same signature as a reducer. ` +
            `For more, refer to the documentation on plugins: ` +
            `https://redux-resource.js.org/docs/guides/plugins.html`
        );
      }
    }
    return result;
  });

  return function reducer(state = initial, action) {
    if (process.env.NODE_ENV !== 'production') {
      if (
        action.type === 'REQUEST_PENDING' ||
        action.type === 'REQUEST_IDLE' ||
        action.type === 'REQUEST_FAILED' ||
        action.type === 'REQUEST_SUCCEEDED'
      ) {
        warning(
          `You dispatched an action with type ${
            action.type
          }. This is a reserved ` +
            `action type that will be used in a future version of Redux Resource. ` +
            `We recommend that you use a different type to avoid conflict.`
        );
      }

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
