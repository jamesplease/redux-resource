import {
  updateManyResourceMetas, requestStatuses, initialResourceMetaState,
  upsertManyResources
} from '../utils';

export function createMany(idAttr, state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      createManyStatus: requestStatuses.PENDING
    }
  };
}

export function createManyFail(idAttr, state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      createManyStatus: requestStatuses.FAILED
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
    meta: updateManyResourceMetas({
      meta: state.meta,
      replace: false,
      newMeta: initialResourceMetaState,
      ids
    }),
    listMeta: {
      ...state.listMeta,
      createManyStatus: requestStatuses.SUCCEEDED
    }
  };
}

export function createManyReset(idAttr, state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      createManyStatus: requestStatuses.NULL
    }
  };
}
