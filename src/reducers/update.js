import updateMetaHelper from './update-meta-helper';
import successMetaHelper from './success-meta-helper';
import requestStatuses from '../utils/request-statuses';
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
  const mergeResources = action.mergeResources;
  const ids = resources.map(r => r.id);

  const allMeta = successMetaHelper({
    requestLabel: action.requestLabel,
    crudAction: 'update',
    state,
    ids
  });

  const newResources = upsertResources({
    resources: state.resources,
    newResources: resources,
    mergeResources: typeof mergeResources !== 'undefined' ? mergeResources : true
  });

  return {
    ...state,
    ...allMeta,
    resources: newResources
  };
}
