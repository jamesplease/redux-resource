import {
  updateManyResourceMetas, xhrStatuses, initialResourceMetaState,
  upsertManyResources
} from '../utils';

export function readMany(idAttr, state) {
  return {
    ...state,
    resourceListMeta: {
      ...state.resourceListMeta,
      readXhrStatus: xhrStatuses.PENDING
    }
  };
}

export function readManyFail(idAttr, state) {
  return {
    ...state,
    resourceListMeta: {
      ...state.resourceListMeta,
      readXhrStatus: xhrStatuses.FAILED
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
    resourceMeta: updateManyResourceMetas({
      resourceMeta: state.resourceMeta,
      newMeta: initialResourceMetaState,
      ids, replace
    }),
    resourceListMeta: {
      ...state.resourceListMeta,
      readXhrStatus: xhrStatuses.SUCCEEDED
    }
  };
}

export function readManyAbort(idAttr, state) {
  return {
    ...state,
    resourceListMeta: {
      ...state.resourceListMeta,
      readXhrStatus: xhrStatuses.ABORTED
    }
  };
}

export function readManyReset(idAttr, state) {
  return {
    ...state,
    resourceListMeta: {
      ...state.resourceListMeta,
      readXhrStatus: xhrStatuses.NULL
    }
  };
}
