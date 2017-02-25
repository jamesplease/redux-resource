import snakeCase from 'lodash.snakecase';
import generateReducer from './generate-reducer';
import generateActionTypes from './generate-action-types';
import {
  generateDefaultInitialState, xhrStatuses, updateResourceMeta,
  updateManyResourceMetas, upsertResource, upsertManyResources
} from './utils';

const supportAllActions = {
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
function createResource(resourceName, options = {}) {
  const {initialState, idAttribute, actionReducers, pluralForm, supportedActions} = options;
  const initial = Object.assign({}, generateDefaultInitialState(), initialState);
  const idAttr = idAttribute || 'id';
  const reducers = actionReducers || [];
  const snakeCaseName = snakeCase(resourceName);
  const pluralName = pluralForm ? pluralForm : `${resourceName}s`;
  const snakeCasePluralName = snakeCase(pluralName);
  const supportedCrudActions = {
    ...supportAllActions,
    ...supportedActions
  };

  const mappedReducers = reducers.reduce((memo, actionReducer) => {
    memo[actionReducer.actionType] = actionReducer.reducer;
    return memo;
  }, {});

  const types = generateActionTypes(snakeCaseName, snakeCasePluralName, supportedCrudActions, Object.keys(mappedReducers));
  return {
    actionTypes: types,
    initialState: initial,
    reducer: generateReducer({
      pluralForm: pluralName,
      supportedActions: supportedCrudActions,
      initialState: initial,
      actionReducers: mappedReducers,
      idAttr, types, resourceName
    }),
    pluralForm: pluralName
  };
}

export {
  xhrStatuses, updateResourceMeta, updateManyResourceMetas, upsertResource,
  upsertManyResources
};
export default createResource;
