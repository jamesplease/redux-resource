import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';
import updateResourceMeta from '../utils/update-resource-meta';
import upsertResource from '../utils/upsert-resource';

export function create(state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      createStatus: requestStatuses.PENDING
    }
  };
}

export function createFail(state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      createStatus: requestStatuses.FAILED
    }
  };
}

export function createSucceed(state, action) {
  const newResourceId = action.resource.id;
  const resources = upsertResource({
    resources: state.resources,
    resource: action.resource,
    id: action.id,
  });
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: initialResourceMetaState,
    id: newResourceId,
    replace: false
  });

  return {
    ...state,
    resources,
    meta,
    listMeta: {
      ...state.listMeta,
      createStatus: requestStatuses.SUCCEEDED
    }
  };
}

export function createReset(state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      createStatus: requestStatuses.NULL
    }
  };
}
