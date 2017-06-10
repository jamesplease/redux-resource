import generateReducer from './generate-reducer';
import actionTypes from './action-types';
import {
  generateDefaultInitialState, snakeCase, requestStatuses, updateResourceMeta,
  updateManyResourceMetas, upsertResource, upsertManyResources
} from './utils';

// Create a resource.
//
// `resourceName`: the plural name of your resource. For instance, "books".
// `options`: configure this resource. Refer to the API documentation for
//   all of the supported options.
function createResource(resourceName, options = {}) {
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

  return {
    initialState: initial,
    reducer: generateReducer({
      initialState: initial,
      idAttr,
      resourceName
    })
  };
}

export {
  requestStatuses, updateResourceMeta, updateManyResourceMetas, upsertResource,
  upsertManyResources, actionTypes
};
export default createResource;
