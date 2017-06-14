import initialResourceMetaState from '../utils/initial-resource-meta-state';
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
        readStatus: requestStatus
      }
    };
  }

  return {
    ...state,
    meta: setResourceMeta({
      meta: state.meta,
      newMeta: {readStatus: requestStatus},
      replace: false,
      ids
    })
  };
}

export function read(state, action) {
  return updateMeta(state, action, requestStatuses.PENDING);
}

export function readFail(state, action) {
  return updateMeta(state, action, requestStatuses.FAILED);
}

export function readReset(state, action) {
  return updateMeta(state, action, requestStatuses.NULL);
}

export function readSucceed(state, action) {
  const resources = action.resources;
  const ids = action.ids || [];

  const responseIds = resources.map(r => r.id);
  const defaultReplace = !ids.length;
  const replace = typeof action.replace !== 'undefined' ? action.replace : defaultReplace;

  let newResources;
  if (!replace) {
    newResources = upsertResources({
      resources: state.resources,
      newResources: resources,
      replace: false,
    });
  } else {
    newResources = resources;
  }

  let listMeta;
  if (!ids.length) {
    listMeta = {
      ...state.listMeta,
      readStatus: requestStatuses.SUCCEEDED
    };
  } else {
    listMeta = {
      ...state.listMeta
    };
  }

  let meta;
  if (!ids.length) {
    meta = setResourceMeta({
      meta: state.meta,
      newMeta: initialResourceMetaState,
      ids: responseIds,
      replace
    });
  } else {
    meta = setResourceMeta({
      meta: state.meta,
      newMeta: {readStatus: requestStatuses.SUCCEEDED},
      ids: responseIds,
      replace: false
    });
  }

  return {
    ...state,
    resources: newResources,
    // We have new resources, so we need to update their meta state with the
    // initial meta state.
    meta,
    listMeta
  };
}
