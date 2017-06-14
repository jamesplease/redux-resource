import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';
import updateManyResourceMetas from '../utils/update-many-resource-metas';
import upsertManyResources from '../utils/upsert-many-resources';

export function create(state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      createManyStatus: requestStatuses.PENDING
    }
  };
}

export function createFail(state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      createManyStatus: requestStatuses.FAILED
    }
  };
}

export function createSucceed(state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r.id);

  const newResources = upsertManyResources({
    resources: state.resources,
    replace: false,
    newResources: resources,
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

export function createReset(state) {
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      createManyStatus: requestStatuses.NULL
    }
  };
}
