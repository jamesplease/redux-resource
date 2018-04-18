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
          `your reducer configuration. ` +
          `For more information, refer to the documentation at: ` +
          `https://redux-resource.js.org/docs/requests/request-actions.html`,
        'INVALID_RESOURCE_TYPE_PASSED'
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
            `For more information, refer to the documentation on plugins: ` +
            `https://redux-resource.js.org/docs/other-guides/plugins.html`,
          'BAD_PLUGIN_INITIALIZED'
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
            `We recommend that you use a different type to avoid conflict. ` +
            `For more information, refer to the documentation at: ` +
            `https://redux-resource.js.org/docs/api-reference/action-types.html#reserved-action-types`,
          'RESERVED_ACTION_TYPE_USED'
        );
      }

      if (action.resourceName && typeof action.resourceName === 'string') {
        warning(
          `You dispatched an action of type ${
            action.type
          } with a "resourceName" property. This property has been deprecated in ` +
            `favor of a new property, "resourceType." This new property serves ` +
            `the same function; it has simply been renamed. The old property ` +
            `will continue to work until the next major release of Redux Resource (v4). ` +
            `Please update your action creators. For more information, refer to ` +
            `the request action documentation at: ` +
            `https://redux-resource.js.org/docs/requests/request-actions.html\n\n` +
            `Also, the migration guide to Redux Resource v3 can be found at: ` +
            `https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource/docs/migration-guides/2-to-3.md`,
          'DEPRECATED_RESOURCE_NAME_SPECIFIED'
        );
      }

      if (action.request && typeof action.request !== 'string') {
        warning(
          `An invalid request property was included in an action with type ` +
            `"${action.type}". The request property must be a string. ` +
            `For more information, refer to the documentation at: ` +
            `https://redux-resource.js.org/docs/requests/request-actions.html`,
          'INVALID_REQUEST_NAME_PASSED'
        );
      }

      if (action.requestKey && typeof action.requestKey !== 'string') {
        warning(
          `An invalid requestKey property was included in an action with type ` +
            `"${action.type}". The requestKey property must be a string. ` +
            `For more information, refer to the documentation at: ` +
            `https://redux-resource.js.org/docs/requests/request-keys.html`,
          'INVALID_REQUEST_KEY_PASSED'
        );
      }

      if (action.requestName && typeof action.requestName !== 'string') {
        warning(
          `An invalid requestName property was included in an action with type ` +
            `"${action.type}". The requestName property must be a string. ` +
            `For more information, refer to the documentation at: ` +
            `https://redux-resource.js.org/docs/requests/request-names.html`,
          'INVALID_REQUEST_NAME_PASSED'
        );
      }

      if (action.list && typeof action.list !== 'string') {
        warning(
          `An invalid list was included in an action with type ` +
            `"${action.type}". Lists must be strings.` +
            `For more information, refer to the documentation at: ` +
            `https://redux-resource.js.org/docs/resources/lists.html`,
          'INVALID_LIST_NAME_PASSED'
        );
      }
    }

    return composeReducers(computedPlugins)(state, action);
  };
}
