import {
  updateResourceMeta, upsertResource, xhrStatuses
} from '../utils';

export function update(idAttr, state, action) {
  const resourceMeta = updateResourceMeta({
    resourceMeta: state.resourceMeta,
    newMeta: {updatingStatus: xhrStatuses.PENDING},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourceMeta,
  };
}

export function updateFail(idAttr, state, action) {
  const resourceMeta = updateResourceMeta({
    resourceMeta: state.resourceMeta,
    newMeta: {updatingStatus: xhrStatuses.FAILED},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourceMeta,
  };
}

export function updateSucceed(idAttribute, state, action) {
  const resourceMeta = updateResourceMeta({
    resourceMeta: state.resourceMeta,
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
    resourceMeta,
    resources
  };
}

export function updateAbort(idAttr, state, action) {
  const resourceMeta = updateResourceMeta({
    resourceMeta: state.resourceMeta,
    newMeta: {updatingStatus: xhrStatuses.ABORTED},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourceMeta,
  };
}

export function updateReset(idAttr, state, action) {
  const resourceMeta = updateResourceMeta({
    resourceMeta: state.resourceMeta,
    newMeta: {updatingStatus: xhrStatuses.NULL},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourceMeta,
  };
}
