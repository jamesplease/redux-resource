import updateMetaHelper from './update-meta-helper';
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
  let newMeta, newListMeta, newLabels;

  const meta = state.meta;
  const listMeta = state.listMeta;
  const labels = state.labels;

  const hasIds = ids && ids.length;

  if (requestLabel) {
    newListMeta = listMeta;

    const existingLabel = state.labels[requestLabel] || {};
    const existingLabelIds = existingLabel.ids || [];

    let newLabelIds = existingLabelIds.filter(r => !ids.includes(r));

    newLabels = {
      ...labels,
      [requestLabel]: {
        ...existingLabel,
        ids: newLabelIds,
        status: requestStatuses.SUCCEEDED
      }
    };

    let nullMeta = {};
    if (ids) {
      nullMeta = ids.reduce((memo, id) => {
        memo[id] = null;
        return memo;
      }, {});
    }

    newMeta = {
      ...meta,
      ...nullMeta
    };
  }

  else if (!hasIds) {
    newMeta = meta;
    newListMeta = {
      ...listMeta,
      deleteStatus: requestStatuses.SUCCEEDED
    };
    newLabels = labels;
  }

  else {
    const nullMeta = ids.reduce((memo, id) => {
      memo[id] = null;
      return memo;
    }, {});

    newMeta = {
      ...meta,
      ...nullMeta
    };

    newListMeta = listMeta;
    newLabels = labels;
  }

  // Shallow clone the existing resource array, removing the deleted resource
  let resources;
  if (ids) {
    resources = state.resources.filter(r => !ids.includes(r.id));
  } else {
    resources = [...state.resources];
  }

  return {
    ...state,
    meta: newMeta,
    labels: newLabels,
    listMeta: newListMeta,
    resources
  };
}
