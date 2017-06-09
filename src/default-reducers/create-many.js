import {
  updateManyResourceMetas, xhrStatuses, initialResourceMetaState,
  upsertManyResources
} from '../utils';

export function createMany(idAttr, state) {
  return {
    ...state,
    resourceListMeta: {
      ...state.resourceListMeta,
      createManyXhrStatus: xhrStatuses.PENDING
    }
  };
}

export function createManyFail(idAttr, state) {
  return {
    ...state,
    resourceListMeta: {
      ...state.resourceListMeta,
      createManyXhrStatus: xhrStatuses.FAILED
    }
  };
}

export function createManySucceed(idAttribute, state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r[idAttribute]);

  const newResources = upsertManyResources({
    resources: state.resources,
    replace: false,
    newResources: resources,
    idAttribute
  });

  return {
    ...state,
    resources: newResources,
    // We have new resources, so we need to update their meta state with the
    // initial meta state.
    resourceMeta: updateManyResourceMetas({
      resourceMeta: state.resourceMeta,
      replace: false,
      newMeta: initialResourceMetaState,
      ids
    }),
    resourceListMeta: {
      ...state.resourceListMeta,
      createManyXhrStatus: xhrStatuses.SUCCEEDED
    }
  };
}

export function createManyAbort(idAttr, state) {
  return {
    ...state,
    resourceListMeta: {
      ...state.resourceListMeta,
      createManyXhrStatus: xhrStatuses.NULL
    }
  };
}

export function createManyReset(idAttr, state) {
  return {
    ...state,
    resourceListMeta: {
      ...state.resourceListMeta,
      createManyXhrStatus: xhrStatuses.NULL
    }
  };
}
