import updateMetaHelper from './update-meta-helper';
import successMetaHelper from './success-meta-helper';
import requestStatuses from '../utils/request-statuses';

export function del(state, action) {
  return updateMetaHelper({
    ids: action.ids,
    requestLabel: action.requestLabel,
    requestStatus: requestStatuses.PENDING,
    crudAction: 'delete',
    state
  });
}

export function delFail(state, action) {
  return updateMetaHelper({
    ids: action.ids,
    requestLabel: action.requestLabel,
    requestStatus: requestStatuses.FAILED,
    crudAction: 'delete',
    state
  });
}

export function delNull(state, action) {
  return updateMetaHelper({
    ids: action.ids,
    requestLabel: action.requestLabel,
    requestStatus: requestStatuses.NULL,
    crudAction: 'delete',
    state
  });
}

export function delSucceed(state, action) {
  const ids = action.ids;
  const requestLabel = action.requestLabel;

  const allMeta = successMetaHelper({
    crudAction: 'delete',
    requestLabel,
    state,
    ids
  });

  // Shallow clone the existing resource array, removing the deleted resource
  const resources = state.resources.filter(r => !ids.includes(r.id));

  let labels = state.labels;
  if (requestLabel) {
    const newLabel = state.labels[requestLabel] || {};
    const existingIds = newLabel ? newLabel.ids : [];
    newLabel.id = existingIds.filter(r => !ids.includes(r.id));
    labels[requestLabel] = newLabel;
  }

  return {
    ...state,
    ...allMeta,
    labels,
    resources
  };
}
