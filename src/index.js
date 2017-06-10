import generateReducer from './generate-reducer';
import actionTypes from './action-types';
import {
  generateDefaultInitialState, requestStatuses, updateResourceMeta,
  updateManyResourceMetas, upsertResource, upsertManyResources
} from './utils';

// Create a resource reducer.
//
// `resourceName`: the plural name of your resource. For instance, "books".
// `initialState`: additional initial state to include on this resource
function resourceReducer(resourceName, initialState = {}) {
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
