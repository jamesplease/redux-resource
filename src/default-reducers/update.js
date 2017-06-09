import {
  updateResourceMeta, upsertResource, xhrStatuses
} from '../utils';

export function update(idAttr, state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {updateXhrStatus: xhrStatuses.PENDING},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    meta,
  };
}

export function updateFail(idAttr, state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {updateXhrStatus: xhrStatuses.FAILED},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    meta,
  };
}

export function updateSucceed(idAttribute, state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {updateXhrStatus: xhrStatuses.SUCCEEDED},
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
    meta,
    resources
  };
}

export function updateAbort(idAttr, state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {updateXhrStatus: xhrStatuses.NULL},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    meta,
  };
}

export function updateReset(idAttr, state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {updateXhrStatus: xhrStatuses.NULL},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    meta,
  };
}
