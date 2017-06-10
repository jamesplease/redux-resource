import generateReducer from './generate-reducer';
import actionTypes from './action-types';
import {
  generateDefaultInitialState, requestStatuses, updateResourceMeta,
  updateManyResourceMetas, upsertResource, upsertManyResources
} from './utils';

// Create a resource reducer.
//
// `resourceName`: the plural name of your resource. For instance, "books".
// `options`: configure the reducer. Refer to the API documentation for
//   all of the supported options.
function resourceReducer(resourceName, options = {}) {
  const {initialState = {}, idAttribute} = options;
  const idAttr = idAttribute || 'id';

  const defaultInitialState = generateDefaultInitialState();
  const initial = {
    ...defaultInitialState,
    ...initialState,
    listMeta: {
      ...defaultInitialState.listMeta,
      ...initialState.listMeta
    }
  };

  return generateReducer({
    initialState: initial,
    idAttr,
    resourceName
  });
}

export {
  resourceReducer,
  requestStatuses,
  updateResourceMeta,
  updateManyResourceMetas,
  upsertResource,
  upsertManyResources,
  actionTypes
};
