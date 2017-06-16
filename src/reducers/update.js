import updateMetaHelper from '../utils/update-meta-helper';
import requestStatuses from '../utils/request-statuses';
import upsertResources from '../utils/upsert-resources';
import setResourceMeta from '../utils/set-resource-meta';

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
  const mergeResources = typeof action.mergeResources !== 'undefined' ? action.mergeResources : true;
  const mergeMeta = typeof action.mergeMeta !== 'undefined' ? action.mergeMeta : true;
  const ids = action.ids;
  const hasIds = ids && ids.length;
  const requestLabel = action.requestLabel;
  let newMeta, newListMeta, newLabels;
  const meta = state.meta;
  const listMeta = state.listMeta;
  const labels = state.labels;

  if (requestLabel) {
    // Stuff
  } else if (!hasIds) {
    // Stuff
  }

  else {
    newMeta = setResourceMeta({
      ids,
      meta,
      mergeMeta,
      newMeta: {
        updateStatus: requestStatuses.SUCCEEDED,
      },
    });

    newListMeta = listMeta;
    newLabels = labels;
  }

  const newResources = upsertResources(
    state.resources,
    resources,
    mergeResources
  );

  return {
    ...state,
    meta: newMeta,
    labels: newLabels,
    listMeta: newListMeta,
    resources: newResources
  };
}
