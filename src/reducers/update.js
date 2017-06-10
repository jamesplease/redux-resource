import requestStatuses from '../utils/request-statuses';
import updateResourceMeta from '../utils/update-resource-meta';
import upsertResource from '../utils/upsert-resource';

export function update(state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {updateStatus: requestStatuses.PENDING},
    id: action.id,
    replace: false
  });

  return {
    ...state,
    meta,
  };
}

export function updateFail(state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {updateStatus: requestStatuses.FAILED},
    id: action.id,
    replace: false
  });

  return {
    ...state,
    meta,
  };
}

export function updateSucceed(state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {updateStatus: requestStatuses.SUCCEEDED},
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

export function updateReset(state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {updateStatus: requestStatuses.NULL},
    id: action.id,
    replace: false
  });

  return {
    ...state,
    meta,
  };
}
