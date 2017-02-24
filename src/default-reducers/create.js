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

export function createSucceed(idAttr, state, action) {
  const newResourceId = action.resource[idAttr];
  const resources = upsertResource(state.resources, action.resource, action[idAttr], idAttr);
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, initialResourceMetaState, newResourceId);

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
