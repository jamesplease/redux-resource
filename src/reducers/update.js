import updateMetaHelper from './update-meta-helper';
import requestStatuses from '../utils/request-statuses';
import setResourceMeta from '../utils/set-resource-meta';
import upsertResources from '../utils/upsert-resources';

export function update(state, action) {
  return updateMetaHelper({
    ids: action.ids,
    requestLabel: action.requestLabel,
    requestStatus: requestStatuses.PENDING,
    crudAction: 'update',
    state
  });
}

export function updateFail(state, action) {
  return updateMetaHelper({
    ids: action.ids,
    requestLabel: action.requestLabel,
    requestStatus: requestStatuses.FAILED,
    crudAction: 'update',
    state
  });
}

export function updateNull(state, action) {
  return updateMetaHelper({
    ids: action.ids,
    requestLabel: action.requestLabel,
    requestStatus: requestStatuses.NULL,
    crudAction: 'update',
    state
  });
}

export function updateSucceed(state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r.id);

  const meta = setResourceMeta({
    meta: state.meta,
    newMeta: {updateStatus: requestStatuses.SUCCEEDED},
    replace: false,
    ids
  });

  const replace = typeof action.replace !== 'undefined' ? action.replace : false;
  const newResources = upsertResources({
    resources: state.resources,
    newResources: resources,
    replace
  });

  return {
    ...state,
    resources: newResources,
    meta,
  };
}
