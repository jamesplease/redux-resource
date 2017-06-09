import {
  updateResourceMeta, upsertResource, requestStatuses
} from '../utils';

export function read(idAttr, state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {readXhrStatus: requestStatuses.PENDING},
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
    newMeta: {readXhrStatus: requestStatuses.FAILED},
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
    newMeta: {readXhrStatus: requestStatuses.SUCCEEDED},
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
    newMeta: {readXhrStatus: requestStatuses.NULL},
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
    newMeta: {readXhrStatus: requestStatuses.NULL},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    meta,
  };
}
