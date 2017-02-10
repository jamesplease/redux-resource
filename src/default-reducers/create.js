import {
  upsertResource, xhrStatuses
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

export function createFailure(idAttr, state) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      creatingStatus: xhrStatuses.FAILED
    }
  };
}

export function createSuccess(idAttr, state, action) {
  const resources = upsertResource(state.resources, action.resource, action[idAttr], idAttr);
  return {
    ...state,
    resources,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      creatingStatus: xhrStatuses.SUCCEEDED
    }
  };
}

export function createAborted(idAttr, state) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      creatingStatus: xhrStatuses.ABORTED
    }
  };
}

export function createResetResolution(idAttr, state) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      creatingStatus: xhrStatuses.NULL
    }
  };
}
