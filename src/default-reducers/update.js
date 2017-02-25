import {
  updateResourcesMeta, upsertResource, xhrStatuses
} from '../utils';

export function update(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta({
    resourcesMeta: state.resourcesMeta,
    newMeta: {updatingStatus: xhrStatuses.PENDING},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourcesMeta,
  };
}

export function updateFail(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta({
    resourcesMeta: state.resourcesMeta,
    newMeta: {updatingStatus: xhrStatuses.FAILED},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourcesMeta,
  };
}

export function updateSucceed(idAttribute, state, action) {
  const resourcesMeta = updateResourcesMeta({
    resourcesMeta: state.resourcesMeta,
    newMeta: {updatingStatus: xhrStatuses.SUCCEEDED},
    id: action[idAttribute],
    replace: false
  });

  const replace = typeof action.replace !== 'undefined' ? action.replace : true;
  const resources = upsertResource({
    resources: state.resources,
    resource: action.resource,
    id: action[idAttribute],
    idAttribute, replace
  });

  return {
    ...state,
    resourcesMeta,
    resources
  };
}

export function updateAbort(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta({
    resourcesMeta: state.resourcesMeta,
    newMeta: {updatingStatus: xhrStatuses.ABORTED},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourcesMeta,
  };
}

export function updateReset(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta({
    resourcesMeta: state.resourcesMeta,
    newMeta: {updatingStatus: xhrStatuses.NULL},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourcesMeta,
  };
}
