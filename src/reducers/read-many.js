import {
  updateManyResourceMetas, requestStatuses, initialResourceMetaState,
  upsertManyResources
} from '../utils';

export function readMany(idAttr, state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      readStatus: requestStatuses.PENDING
    }
  };
}

export function readManyFail(idAttr, state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      readStatus: requestStatuses.FAILED
    }
  };
}

export function readManySucceed(idAttribute, state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r[idAttribute]);
  const replace = typeof action.replace !== 'undefined' ? action.replace : true;

  let newResources;
  if (!replace) {
    newResources = upsertManyResources({
      resources: state.resources,
      replace: false,
      newResources: resources,
      idAttribute
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

export function readManyReset(idAttr, state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      readStatus: requestStatuses.NULL
    }
  };
}
