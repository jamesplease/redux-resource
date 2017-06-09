import generateReducer from './generate-reducer';
import actionTypes from './action-types';
import {
  generateDefaultInitialState, snakeCase, requestStatuses, updateResourceMeta,
  updateManyResourceMetas, upsertResource, upsertManyResources
} from './utils';

// Create a resource.
//
// `resourceName`: a singular name for your resource. For instance, "book".
// `options`: configure this resource. Refer to the API documentation for
//   all of the supported options.
function createResource(resourceName, options = {}) {
  const {initialState = {}, idAttribute, actionReducers, pluralForm} = options;
  const defaultInitialState = generateDefaultInitialState();
  const initial = {
    ...defaultInitialState,
    ...initialState,
    listMeta: {
      ...defaultInitialState.listMeta,
      ...initialState.listMeta
    }
  };
  const idAttr = idAttribute || 'id';
  const reducers = actionReducers || [];
  const pluralName = pluralForm ? pluralForm : `${resourceName}s`;
  const snakeCasePluralName = snakeCase(pluralName);

  const mappedReducers = reducers.reduce((memo, actionReducer) => {
    memo[actionReducer.actionType] = actionReducer.reducer;
    return memo;
  }, {});

  return {
    initialState: initial,
    reducer: generateReducer({
      pluralForm: snakeCasePluralName,
      initialState: initial,
      actionReducers: mappedReducers,
      idAttr, resourceName
    }),
    pluralForm: pluralName
  };
}

export {
  requestStatuses, updateResourceMeta, updateManyResourceMetas, upsertResource,
  upsertManyResources, actionTypes
};
export default createResource;
