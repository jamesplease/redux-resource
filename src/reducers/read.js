import updateMetaHelper from '../utils/update-meta-helper';
import cruReducerHelper from '../utils/cru-reducer-helper';
import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';

export function read(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    label: action.label,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.PENDING,
    crudAction: 'read',
    state
  });
}

export function readFail(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    label: action.label,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.FAILED,
    crudAction: 'read',
    state
  });
}

export function readNull(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    label: action.label,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.NULL,
    crudAction: 'read',
    state
  });
}

export function readSucceed(state, action, options) {
  return cruReducerHelper(state, action, options, {
    ...initialResourceMetaState,
    readStatus: requestStatuses.SUCCEEDED
  });
}
