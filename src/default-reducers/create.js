import {
  upsertResource, xhrStatuses, updateResourcesMeta, initialResourceMetaState
} from '../utils';

export function create(idAttr, state) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      creatingStatus: xhrStatuses.PENDING
    }
  };
}

export function createFail(idAttr, state) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
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
  const resourcesMeta = updateResourcesMeta({
    resourcesMeta: state.resourcesMeta,
    newMeta: initialResourceMetaState,
    id: newResourceId
  });

  return {
    ...state,
    resources,
    resourcesMeta,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      creatingStatus: xhrStatuses.SUCCEEDED
    }
  };
}

export function createAbort(idAttr, state) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      creatingStatus: xhrStatuses.ABORTED
    }
  };
}

export function createReset(idAttr, state) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      creatingStatus: xhrStatuses.NULL
    }
  };
}
