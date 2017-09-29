import actionReducersMap from './action-reducers-map';
import initialResourceMetaState from '../utils/initial-resource-meta-state';
import warning from '../utils/warning';

export default function requestStatusesPlugin(resourceName, options = {}) {
  const customInitialMeta = options.initialResourceMeta || {};
  const optionsToSend = {
    initialResourceMeta: {
      ...initialResourceMetaState,
      ...customInitialMeta
    }
  };

  return function(state, action) {
    const reducer = actionReducersMap[action.type];

    if (process.env.NODE_ENV !== 'production') {
      if (reducer && !action.resourceName) {
        warning(
          `A resourceName was not included in an action with type ` +
          `"${action.type}". Without a resourceName, Redux Resource will ` +
          `not be able to update a slice of your store. For more, refer to ` +
          `the guide on CRUD Actions: ` +
          `https://redux-resource.js.org/docs/guides/crud-actions.html`
        );
      }
    }

    if (action.resourceName !== resourceName) {
      return state;
    }

    const callActionReducer = reducer && action.resourceName === resourceName;
    return callActionReducer ? reducer(state, action, optionsToSend) : state;
  };
}
