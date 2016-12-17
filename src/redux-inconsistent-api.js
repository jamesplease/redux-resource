import actionTypes from './action-types';
import generateReducers from './reducer';
import generateActionCreators from './action-creators';
import generateDefaultInitialState from './utils';

// resourceName: a string representing the name of the resource. For instance,
//  "books". This will be the name of the store slice in Redux.
// options: a list of options to configure the resource. Refer to the docs
//  for the complete list of options
function reduxInconsistentApi(resourceName, options = {}) {
  const initialState = options.initialState || generateDefaultInitialState();
  const idAttribute = options.idAttribute || 'id';

  return {
    initialState,
    reducer: generateReducers(idAttribute, initialState),
    actionCreators: generateActionTypes(idAttribute),
  };
}

// We attach the `actionTypes` onto the constructor as a handy reference
reduxInconsistentApi.actionTypes = asyncActionTypes;

export default reduxInconsistentApi;
