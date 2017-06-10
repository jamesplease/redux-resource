import requestStatuses from '../utils/request-statuses';
import updateResourceMeta from '../utils/update-resource-meta';
import upsertResource from '../utils/upsert-resource';

export function read(state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {readStatus: requestStatuses.PENDING},
    id: action.id,
    replace: false
  });

  return {
    ...state,
    meta,
  };
}

export function readFail(state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {readStatus: requestStatuses.FAILED},
    id: action.id,
    replace: false
  });

  return {
    ...state,
    meta,
  };
}

export function readSucceed(state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {readStatus: requestStatuses.SUCCEEDED},
    id: action.id,
    replace: false
  });

  const replace = typeof action.replace !== 'undefined' ? action.replace : true;
  const resources = upsertResource({
    resources: state.resources,
    resource: action.resource,
    id: action.id,
    replace
  });

  return {
    ...state,
    meta,
    resources
  };
}

export function readReset(state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {readStatus: requestStatuses.NULL},
    id: action.id,
    replace: false
  });

  return {
    ...state,
    meta,
  };
}
