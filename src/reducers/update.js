import {
  updateResourceMeta, upsertResource, requestStatuses
} from '../utils';

export function update(idAttr, state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {updateStatus: requestStatuses.PENDING},
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
    newMeta: {updateStatus: requestStatuses.FAILED},
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
    newMeta: {updateStatus: requestStatuses.SUCCEEDED},
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

export function updateReset(idAttr, state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {updateStatus: requestStatuses.NULL},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    meta,
  };
}
