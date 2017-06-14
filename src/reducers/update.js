import requestStatuses from '../utils/request-statuses';
import setResourceMeta from '../utils/set-resource-meta';
import upsertResources from '../utils/upsert-resources';

function updateMeta(state, action, requestStatus) {
  const ids = action.ids || [];

  if (!ids.length) {
    return {
      ...state,
      listMeta: {
        ...state.listMeta,
        updateStatus: requestStatus
      }
    };
  }

  return {
    ...state,
    meta: setResourceMeta({
      meta: state.meta,
      newMeta: {updateStatus: requestStatus},
      replace: false,
      ids
    })
  };
}

export function update(state, action) {
  return updateMeta(state, action, requestStatuses.PENDING);
}

export function updateFail(state, action) {
  return updateMeta(state, action, requestStatuses.FAILED);
}

export function updateReset(state, action) {
  return updateMeta(state, action, requestStatuses.NULL);
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
