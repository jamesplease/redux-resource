import {updateManyResourceMetas, xhrStatuses} from '../utils';

export function delMany(idAttribute, state, action) {
  const ids = action.ids;

  const resourceMeta = updateManyResourceMetas({
    resourceMeta: state.resourceMeta,
    newMeta: {deleteXhrStatus: xhrStatuses.PENDING},
    replace: false,
    ids
  });

  return {
    ...state,
    resourceMeta,
  };
}

export function delManyFail(idAttribute, state, action) {
  const ids = action.ids;

  const resourceMeta = updateManyResourceMetas({
    resourceMeta: state.resourceMeta,
    newMeta: {deleteXhrStatus: xhrStatuses.FAILED},
    replace: false,
    ids
  });

  return {
    ...state,
    resourceMeta,
  };
}

export function delManySucceed(idAttribute, state, action) {
  const ids = action.ids;

  const newMeta = ids.reduce((memo, id) => {
    memo[id] = null;
    return memo;
  }, {});

  // Remove this resource from the resources meta.
  const resourceMeta = {
    // Shallow clone the meta
    ...state.resourceMeta,
    ...newMeta
  };

  // Shallow clone the existing resource array, removing the deleted resource
  const newResources = state.resources.filter(r => !ids.includes(r[idAttribute]));

  return {
    ...state,
    resources: newResources,
    resourceMeta,
  };
}

export function delManyAbort(idAttribute, state, action) {
  const ids = action.ids;

  const resourceMeta = updateManyResourceMetas({
    resourceMeta: state.resourceMeta,
    newMeta: {deleteXhrStatus: xhrStatuses.NULL},
    replace: false,
    ids
  });

  return {
    ...state,
    resourceMeta,
  };
}

export function delManyReset(idAttribute, state, action) {
  const ids = action.ids;

  const resourceMeta = updateManyResourceMetas({
    resourceMeta: state.resourceMeta,
    newMeta: {deleteXhrStatus: xhrStatuses.NULL},
    replace: false,
    ids
  });

  return {
    ...state,
    resourceMeta,
  };
}
