import {
  upsertResource, requestStatuses, updateResourceMeta, initialResourceMetaState
} from '../utils';

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
