import {
  updateResourcesMeta, upsertResource, xhrStatuses
} from '../utils';

export function retrieveOne(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: xhrStatuses.PENDING
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function retrieveOneFailure(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: xhrStatuses.FAILED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function retrieveOneSuccess(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: xhrStatuses.SUCCEEDED
  }, action[idAttr]);

  const resources = upsertResource(state.resources, action.resource, action[idAttr], idAttr);

  return {
    ...state,
    resourcesMeta,
    resources
  };
}

export function retrieveOneAborted(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: xhrStatuses.ABORTED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function retrieveOneResetResolution(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: xhrStatuses.NULL
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}
