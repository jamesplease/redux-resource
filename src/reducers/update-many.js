import requestStatuses from '../utils/request-statuses';
import updateManyResourceMetas from '../utils/update-many-resource-metas';
import upsertManyResources from '../utils/upsert-many-resources';

export function updateMany(state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r.id);

  const meta = updateManyResourceMetas({
    meta: state.meta,
    newMeta: {updateStatus: requestStatuses.PENDING},
    replace: false,
    ids
  });

  return {
    ...state,
    meta
  };
}

export function updateManyFail(state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r.id);

  const meta = updateManyResourceMetas({
    meta: state.meta,
    newMeta: {updateStatus: requestStatuses.FAILED},
    replace: false,
    ids
  });

  return {
    ...state,
    meta,
  };
}

export function updateManySucceed(state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r.id);

  const meta = updateManyResourceMetas({
    meta: state.meta,
    newMeta: {updateStatus: requestStatuses.SUCCEEDED},
    replace: false,
    ids
  });

  const replace = typeof action.replace !== 'undefined' ? action.replace : false;
  const newResources = upsertManyResources({
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

export function updateManyReset(state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r.id);

  const meta = updateManyResourceMetas({
    meta: state.meta,
    newMeta: {updateStatus: requestStatuses.NULL},
    replace: false,
    ids
  });

  return {
    ...state,
    meta,
  };
}
