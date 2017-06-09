import {
  updateManyResourceMetas, xhrStatuses, upsertManyResources
} from '../utils';

export function updateMany(idAttribute, state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r[idAttribute]);

  const resourceMeta = updateManyResourceMetas({
    resourceMeta: state.resourceMeta,
    newMeta: {updateXhrStatus: xhrStatuses.PENDING},
    replace: false,
    ids
  });

  return {
    ...state,
    resourceMeta
  };
}

export function updateManyFail(idAttribute, state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r[idAttribute]);

  const resourceMeta = updateManyResourceMetas({
    resourceMeta: state.resourceMeta,
    newMeta: {updateXhrStatus: xhrStatuses.FAILED},
    replace: false,
    ids
  });

  return {
    ...state,
    resourceMeta,
  };
}

export function updateManySucceed(idAttribute, state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r[idAttribute]);

  const resourceMeta = updateManyResourceMetas({
    resourceMeta: state.resourceMeta,
    newMeta: {updateXhrStatus: xhrStatuses.SUCCEEDED},
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
    resourceMeta,
  };
}

export function updateManyAbort(idAttribute, state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r[idAttribute]);

  const resourceMeta = updateManyResourceMetas({
    resourceMeta: state.resourceMeta,
    newMeta: {updateXhrStatus: xhrStatuses.NULL},
    replace: false,
    ids
  });

  return {
    ...state,
    resourceMeta,
  };
}

export function updateManyReset(idAttribute, state, action) {
  const resources = action.resources;
  const ids = resources.map(r => r[idAttribute]);

  const resourceMeta = updateManyResourceMetas({
    resourceMeta: state.resourceMeta,
    newMeta: {updateXhrStatus: xhrStatuses.NULL},
    replace: false,
    ids
  });

  return {
    ...state,
    resourceMeta,
  };
}
