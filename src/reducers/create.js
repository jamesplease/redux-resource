import updateMetaHelper from '../utils/update-meta-helper';
import requestStatuses from '../utils/request-statuses';
import upsertResources from '../utils/upsert-resources';

export function create(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    requestLabel: action.requestLabel,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.PENDING,
    crudAction: 'create',
    state
  });
}

export function createFail(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    requestLabel: action.requestLabel,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.FAILED,
    crudAction: 'create',
    state
  });
}

export function createNull(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    requestLabel: action.requestLabel,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.NULL,
    crudAction: 'create',
    state
  });
}

export function createSucceed(state, action) {
  const resources = action.resources;
  const mergeResources = action.mergeResources;

  const newResources = upsertResources(state.resources, resources, mergeResources);

  return {
    ...state,
    resources: newResources
  };
}
