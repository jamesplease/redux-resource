import requestStatuses from '../utils/request-statuses';
import updateManyResourceMetas from '../utils/update-many-resource-metas';

export function delMany(state, action) {
  const ids = action.ids;

  const meta = updateManyResourceMetas({
    meta: state.meta,
    newMeta: {deleteStatus: requestStatuses.PENDING},
    replace: false,
    ids
  });

  return {
    ...state,
    meta,
  };
}

export function delManyFail(state, action) {
  const ids = action.ids;

  const meta = updateManyResourceMetas({
    meta: state.meta,
    newMeta: {deleteStatus: requestStatuses.FAILED},
    replace: false,
    ids
  });

  return {
    ...state,
    meta,
  };
}

export function delManySucceed(state, action) {
  const ids = action.ids;

  const newMeta = ids.reduce((memo, id) => {
    memo[id] = null;
    return memo;
  }, {});

  // Remove this resource from the resources meta.
  const meta = {
    // Shallow clone the meta
    ...state.meta,
    ...newMeta
  };

  // Shallow clone the existing resource array, removing the deleted resource
  const newResources = state.resources.filter(r => !ids.includes(r.id));

  return {
    ...state,
    resources: newResources,
    meta,
  };
}

export function delManyReset(state, action) {
  const ids = action.ids;

  const meta = updateManyResourceMetas({
    meta: state.meta,
    newMeta: {deleteStatus: requestStatuses.NULL},
    replace: false,
    ids
  });

  return {
    ...state,
    meta,
  };
}
