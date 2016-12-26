import generateReducer from './reducer';
import generateActionTypes from './action-types';
import generateActionCreators from './action-creators';
import {generateDefaultInitialState} from './utils';

// resourceName: a string representing the name of the resource. For instance,
//  "books". This will be the name of the store slice in Redux.
// options: a list of options to configure the resource. Refer to the docs
//  for the complete list of options
function reduxInconsistentApi(resourceName, options = {}) {
  const {initialState, idAttribute, customHandlers} = options;
  const initial = initialState || generateDefaultInitialState();
  const idAttr = idAttribute || 'id';
  const handlers = customHandlers || {};

  const types = generateActionTypes(resourceName);

  return {
    actionTypes: types,
    initialState: initial,
    reducer: generateReducer(idAttr, initialState, handlers),
    actionCreators: generateActionCreators(idAttr),
  };
}

export default reduxInconsistentApi;
