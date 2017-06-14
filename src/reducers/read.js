import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';
import setResourceMeta from '../utils/set-resource-meta';
import upsertResources from '../utils/upsert-resources';

export function read(state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      readStatus: requestStatuses.PENDING
    }
  };
}

export function readFail(state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      readStatus: requestStatuses.FAILED
    }
  };
}

export function readSucceed(state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r.id);
  const replace = typeof action.replace !== 'undefined' ? action.replace : true;

  let newResources;
  if (!replace) {
    newResources = upsertResources({
      resources: state.resources,
      replace: false,
      newResources: resources,
    });
  } else {
    newResources = resources;
  }

  return {
    ...state,
    resources: newResources,
    // We have new resources, so we need to update their meta state with the
    // initial meta state.
    meta: setResourceMeta({
      meta: state.meta,
      newMeta: initialResourceMetaState,
      ids, replace
    }),
    listMeta: {
      ...state.listMeta,
      readStatus: requestStatuses.SUCCEEDED
    }
  };
}

export function readReset(state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      readStatus: requestStatuses.NULL
    }
  };
}
