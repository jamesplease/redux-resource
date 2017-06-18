import updateMetaHelper from '../utils/update-meta-helper';
import cruReducerHelper from '../utils/cru-reducer-helper';
import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';

export function create(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    label: action.label,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.PENDING,
    crudAction: 'create',
    state
  });
}

export function createFail(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    label: action.label,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.FAILED,
    crudAction: 'create',
    state
  });
}

export function createNull(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    label: action.label,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.NULL,
    crudAction: 'create',
    state
  });
}

export function createSucceed(state, action, options) {
  return cruReducerHelper(state, action, options, {
    ...initialResourceMetaState,
    readStatus: requestStatuses.SUCCEEDED,
    createStatus: requestStatuses.SUCCEEDED,
  });
}
