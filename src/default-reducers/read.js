import {
  updateResourceMeta, upsertResource, xhrStatuses
} from '../utils';

export function read(idAttr, state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {readXhrStatus: xhrStatuses.PENDING},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    meta,
  };
}

export function readFail(idAttr, state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {readXhrStatus: xhrStatuses.FAILED},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    meta,
  };
}

export function readSucceed(idAttribute, state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {readXhrStatus: xhrStatuses.SUCCEEDED},
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

export function readAbort(idAttr, state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {readXhrStatus: xhrStatuses.NULL},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    meta,
  };
}

export function readReset(idAttr, state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {readXhrStatus: xhrStatuses.NULL},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    meta,
  };
}
