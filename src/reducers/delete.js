import updateMetaHelper from '../utils/update-meta-helper';
import requestStatuses from '../utils/request-statuses';

export function del(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    requestLabel: action.requestLabel,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.PENDING,
    crudAction: 'delete',
    state
  });
}

export function delFail(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    requestLabel: action.requestLabel,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.FAILED,
    crudAction: 'delete',
    state
  });
}

export function delNull(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    requestLabel: action.requestLabel,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.NULL,
    crudAction: 'delete',
    state
  });
}

export function delSucceed(state, action) {
  const requestLabel = action.requestLabel;
  const resources = action.resources;
  const ids = action.ids;

  // Find the list of IDs affected by this action
  let idList;
  if (resources) {
    idList = resources.map(r => r.id);
  } else if (ids) {
    idList = ids;
  }

  const hasIds = idList && idList.length;

  // If we have no label nor IDs, then there is nothing to update
  if (!hasIds && !requestLabel) {
    return;
  }

  let newMeta, newLabels;
  const meta = state.meta;
  const labels = state.labels;

  if (requestLabel) {
    const existingLabel = state.labels[requestLabel] || {};
    const existingLabelIds = existingLabel.ids || [];

    let newLabelIds;
    if (hasIds) {
      newLabelIds = existingLabelIds.filter(r => !idList.includes(r));
    } else {
      newLabelIds = existingLabelIds;
    }

    newLabels = {
      ...labels,
      [requestLabel]: {
        ...existingLabel,
        ids: newLabelIds,
        status: requestStatuses.SUCCEEDED
      }
    };
  } else {
    newLabels = labels;
  }

  if (hasIds) {
    const nullMeta = idList.reduce((memo, id) => {
      memo[id] = null;
      return memo;
    }, {});

    newMeta = {
      ...meta,
      ...nullMeta
    };
  } else {
    newMeta = meta;
  }

  // Shallow clone the existing resource array, removing the deleted resource
  let newResources;
  if (hasIds) {
    newResources = state.resources.filter(r => !idList.includes(r.id));
  } else {
    newResources = [...state.resources];
  }

  return {
    ...state,
    meta: newMeta,
    labels: newLabels,
    resources: newResources
  };
}
