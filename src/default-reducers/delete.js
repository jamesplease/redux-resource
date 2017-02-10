import {
  updateResourcesMeta, updateManyResourcesMeta, upsertResource,
  xhrStatuses, initialResourceMetaState
} from '../utils';

export function del(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    deletingStatus: xhrStatuses.PENDING
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function delFailure(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    deletingStatus: xhrStatuses.FAILED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function delSuccess(idAttr, state, action) {
  const id = action[idAttr];

  // Remove this resource from the resources meta.
  const resourcesMeta = {
    // Shallow clone the meta
    ...state.resourcesMeta,
    [id]: null
  };

  // Shallow clone the existing resource array, removing the deleted resource
  const resources = state.resources.filter(r => r.id !== id);

  return {
    ...state,
    resourcesMeta,
    resources
  };
}

export function delAborted(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    deletingStatus: xhrStatuses.ABORTED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function delResetResolution(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    deletingStatus: xhrStatuses.NULL
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}
