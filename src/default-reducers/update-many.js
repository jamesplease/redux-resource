import {
  updateManyResourceMetas, requestStatuses, upsertManyResources
} from '../utils';

export function updateMany(idAttribute, state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r[idAttribute]);

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

export function updateManyFail(idAttribute, state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r[idAttribute]);

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

export function updateManySucceed(idAttribute, state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r[idAttribute]);

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
    idAttribute,
    replace
  });

  return {
    ...state,
    resources: newResources,
    meta,
  };
}

export function updateManyAbort(idAttribute, state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r[idAttribute]);

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

export function updateManyReset(idAttribute, state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r[idAttribute]);

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
