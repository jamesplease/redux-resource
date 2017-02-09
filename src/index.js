import generateReducer from './reducer';
import generateActionTypes from './action-types';
import generateActionCreators from './action-creators';
import {generateDefaultInitialState, resourceStatuses} from './utils';

const allowAllCrudOperations = {
  create: true,
  readOne: true,
  readMany: true,
  update: true,
  del: true
};

// resourceName: a string representing the name of the resource. For instance,
//  "books". This will be the name of the store slice in Redux.
// options: a list of options to configure the resource. Refer to the docs
//  for the complete list of options
function simpleResource(resourceName, options = {}) {
  const {initialState, idAttribute, customHandlers, pluralForm, allowedOperations} = options;
  const initial = Object.assign({}, generateDefaultInitialState(), initialState);
  const idAttr = idAttribute || 'id';
  const handlers = customHandlers || {};
  const pluralName = pluralForm ? pluralForm : resourceName + 's';
  const allowedCrudOperations = {
    ...allowAllCrudOperations,
    ...allowedOperations
  };

  const types = generateActionTypes(resourceName, pluralName, allowedCrudOperations);

  return {
    actionTypes: types,
    initialState: initial,
    reducer: generateReducer({
      pluralForm: pluralName,
      allowedOperations: allowedCrudOperations,
      idAttr, initialState, handlers, types, resourceName
    }),
    actionCreators: generateActionCreators(idAttr),
    pluralForm: pluralName
  };
}

simpleResource.resourceStatuses = resourceStatuses;

export default simpleResource;
