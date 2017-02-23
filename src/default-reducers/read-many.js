import {
  updateManyResourcesMeta, xhrStatuses, initialResourceMetaState
} from '../utils';

export function retrieveMany(idAttr, state) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      retrievingStatus: xhrStatuses.PENDING
    }
  };
}

export function retrieveManyFail(idAttr, state) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      retrievingStatus: xhrStatuses.FAILED
    }
  };
}

export function retrieveManySucceed(idAttr, state, action) {
  const resources = action.resources;
  // This needs to use `idAttr`.
  const ids = resources.map(r => r[idAttr]);
  return {
    ...state,
    resources,
    // We have new resources, so we need to update their meta state with the
    // initial meta state.
    resourcesMeta: updateManyResourcesMeta(state.resourcesMeta, initialResourceMetaState, ids),
    resourcesListMeta: {
      ...state.resourcesListMeta,
      retrievingStatus: xhrStatuses.SUCCEEDED
    }
  };
}

export function retrieveManyAbort(idAttr, state) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      retrievingStatus: xhrStatuses.ABORTED
    }
  };
}

export function retrieveManyReset(idAttr, state) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      retrievingStatus: xhrStatuses.NULL
    }
  };
}
