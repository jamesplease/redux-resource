import actionReducersMap from './action-reducers-map';
import warning from '../utils/warning';

// Todo: cache the initial state here so that it's not computed per success
export default function requestStatusesPlugin(resourceName, options) {
  return function(state, action) {
    const reducer = actionReducersMap[action.type];

    if (process.env.NODE_ENV !== 'production') {
      if (reducer && !action.resourceName) {
        warning(
          `A resourceName was not included in an action with type ` +
          `"${action.type}". Without a resourceName, Resourceful Redux will ` +
          `not be able to update a slice of your store. For more, refer to ` +
          `the guide on CRUD Actions: ` +
          `https://resourceful-redux.js.org/docs/guides/crud-actions.html`
        );
      }
    }

    if (action.resourceName !== resourceName) {
      return state;
    }

    const callActionReducer = reducer && action.resourceName === resourceName;
    return callActionReducer ? reducer(state, action, options) : state;
  };
}
