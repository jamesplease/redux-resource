import updateMetaHelper from '../utils/update-meta-helper';
import cruReducerHelper from '../utils/cru-reducer-helper';
import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';

export function update(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    label: action.label,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.PENDING,
    crudAction: 'update',
    state
  });
}

export function updateFail(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    label: action.label,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.FAILED,
    crudAction: 'update',
    state
  });
}

export function updateNull(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    label: action.label,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.NULL,
    crudAction: 'update',
    state
  });
}

export function updateSucceed(state, action, options) {
  return cruReducerHelper(state, action, options, {
    ...initialResourceMetaState,
    updateStatus: requestStatuses.SUCCEEDED
  });
}
