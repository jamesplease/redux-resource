import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';
import updateManyResourceMetas from '../utils/update-many-resource-metas';
import upsertManyResources from '../utils/upsert-many-resources';

export function readMany(state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      readStatus: requestStatuses.PENDING
    }
  };
}

export function readManyFail(state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      readStatus: requestStatuses.FAILED
    }
  };
}

export function readManySucceed(state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r.id);
  const replace = typeof action.replace !== 'undefined' ? action.replace : true;

  let newResources;
  if (!replace) {
    newResources = upsertManyResources({
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
    meta: updateManyResourceMetas({
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

export function readManyReset(state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      readStatus: requestStatuses.NULL
    }
  };
}
