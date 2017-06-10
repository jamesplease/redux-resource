import generateReducer from './generate-reducer';
import actionTypes from './action-types';
import generateDefaultInitialState from './utils/generate-default-initial-state';
import requestStatuses from './utils/request-statuses';
import updateResourceMeta from './utils/update-resource-meta';
import updateManyResourceMetas from './utils/update-many-resource-metas';
import upsertResource from './utils/upsert-resource';
import upsertManyResources from './utils/upsert-many-resources';
import getStatus from './utils/get-status';

// Create a resource reducer.
//
// `resourceName`: the plural name of your resource. For instance, "books".
// `initialState`: additional initial state to include on this resource
function resourceReducer(resourceName, initialState = {}, options = {}) {
  const {plugins = []} = options;
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
    resourceName,
    plugins
  });
}

export {
  resourceReducer,
  requestStatuses,
  updateResourceMeta,
  updateManyResourceMetas,
  upsertResource,
  upsertManyResources,
  actionTypes,
  getStatus
};
