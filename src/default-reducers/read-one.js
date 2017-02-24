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

export function retrieveOneFail(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: xhrStatuses.FAILED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function retrieveOneSucceed(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: xhrStatuses.SUCCEEDED
  }, action[idAttr]);

  const replace = typeof action.replace !== 'undefined' ? action.replace : true;
  const resources = upsertResource(state.resources, action.resource, action[idAttr], idAttr, replace);

  return {
    ...state,
    resourcesMeta,
    resources
  };
}

export function retrieveOneAbort(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: xhrStatuses.ABORTED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function retrieveOneReset(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: xhrStatuses.NULL
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}
