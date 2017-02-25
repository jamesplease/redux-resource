import {
  upsertResource, xhrStatuses, updateResourceMeta, initialResourceMetaState
} from '../utils';

export function create(idAttr, state) {
  return {
    ...state,
    resourceListMeta: {
      ...state.resourceListMeta,
      creatingStatus: xhrStatuses.PENDING
    }
  };
}

export function createFail(idAttr, state) {
  return {
    ...state,
    resourceListMeta: {
      ...state.resourceListMeta,
      creatingStatus: xhrStatuses.FAILED
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
  const resourceMeta = updateResourceMeta({
    resourceMeta: state.resourceMeta,
    newMeta: initialResourceMetaState,
    id: newResourceId,
    replace: false
  });

  return {
    ...state,
    resources,
    resourceMeta,
    resourceListMeta: {
      ...state.resourceListMeta,
      creatingStatus: xhrStatuses.SUCCEEDED
    }
  };
}

export function createAbort(idAttr, state) {
  return {
    ...state,
    resourceListMeta: {
      ...state.resourceListMeta,
      creatingStatus: xhrStatuses.ABORTED
    }
  };
}

export function createReset(idAttr, state) {
  return {
    ...state,
    resourceListMeta: {
      ...state.resourceListMeta,
      creatingStatus: xhrStatuses.NULL
    }
  };
}
