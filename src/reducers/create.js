import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';
import setResourceMeta from '../utils/set-resource-meta';
import upsertResources from '../utils/upsert-resources';

function updateMeta(state, action, requestStatus) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      createManyStatus: requestStatus
    }
  };
}

export function create(state, action) {
  return updateMeta(state, action, requestStatuses.PENDING);
}

export function createFail(state, action) {
  return updateMeta(state, action, requestStatuses.FAILED);
}

export function createReset(state, action) {
  return updateMeta(state, action, requestStatuses.NULL);
}

export function createSucceed(state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r.id);

  const newResources = upsertResources({
    resources: state.resources,
    replace: false,
    newResources: resources,
  });

  return {
    ...state,
    resources: newResources,
    // We have new resources, so we need to update their meta state with the
    // initial meta state.
    meta: setResourceMeta({
      meta: state.meta,
      replace: false,
      newMeta: initialResourceMetaState,
      ids
    }),
    listMeta: {
      ...state.listMeta,
      createManyStatus: requestStatuses.SUCCEEDED
    }
  };
}
