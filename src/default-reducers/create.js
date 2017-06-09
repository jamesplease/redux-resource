import {
  upsertResource, requestStatuses, updateResourceMeta, initialResourceMetaState
} from '../utils';

export function create(idAttr, state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      createStatus: requestStatuses.PENDING
    }
  };
}

export function createFail(idAttr, state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      createStatus: requestStatuses.FAILED
    }
  };
}

export function createSucceed(idAttribute, state, action) {
  const newResourceId = action.resource[idAttribute];
  const resources = upsertResource({
    resources: state.resources,
    resource: action.resource,
    id: action[idAttribute],
    idAttribute
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

export function createAbort(idAttr, state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      createStatus: requestStatuses.NULL
    }
  };
}

export function createReset(idAttr, state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      createStatus: requestStatuses.NULL
    }
  };
}
