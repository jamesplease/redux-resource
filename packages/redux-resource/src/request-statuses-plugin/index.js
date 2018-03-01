import actionReducersMap from './action-reducers-map';
import initialResourceMetaState from '../utils/initial-resource-meta-state';
import warning from '../utils/warning';

export default function requestStatusesPlugin(resourceType, options = {}) {
  const customInitialMeta = options.initialResourceMeta || {};
  const optionsToSend = {
    initialResourceMeta: {
      ...initialResourceMetaState,
      ...customInitialMeta,
    },
  };

  return function(state, action) {
    const reducer = actionReducersMap[action.type];

    if (process.env.NODE_ENV !== 'production') {
      if (reducer && !action.resourceName && !action.resourceType) {
        warning(
          `A resourceType was not included in an action with type ` +
            `"${action.type}". Without a resourceType, Redux Resource will ` +
            `not be able to update a slice of your store. For more information, refer to ` +
            `the guide on Request Actions: ` +
            `https://redux-resource.js.org/docs/requests/request-actions.html`,
          'MISSING_RESOURCE_TYPE'
        );
      }
    }

    const actionResourceType = action.resourceType || action.resourceName;

    if (actionResourceType !== resourceType) {
      return state;
    }

    const callActionReducer = reducer && actionResourceType === resourceType;
    return callActionReducer ? reducer(state, action, optionsToSend) : state;
  };
}
