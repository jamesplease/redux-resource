import {
  updateResourcesMeta, upsertResource, xhrStatuses
} from '../utils';

export function update(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    updatingStatus: xhrStatuses.PENDING
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function updateFail(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    updatingStatus: xhrStatuses.FAILED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function updateSucceed(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    updatingStatus: xhrStatuses.SUCCEEDED
  }, action[idAttr]);

  const resources = upsertResource(state.resources, action.resource, action[idAttr], idAttr);

  return {
    ...state,
    resourcesMeta,
    resources
  };
}

export function updateAbort(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    updatingStatus: xhrStatuses.ABORTED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function updateReset(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    updatingStatus: xhrStatuses.NULL
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}
