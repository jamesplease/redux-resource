import requestStatuses from '../utils/request-statuses';
import setResourceMeta from '../utils/set-resource-meta';

function updateMeta(state, action, requestStatus) {
  const ids = action.ids || [];

  if (!ids.length) {
    return {
      ...state,
      listMeta: {
        ...state.listMeta,
        deleteStatus: requestStatus
      }
    };
  }

  return {
    ...state,
    meta: setResourceMeta({
      meta: state.meta,
      newMeta: {deleteStatus: requestStatus},
      replace: false,
      ids
    })
  };
}

export function del(state, action) {
  return updateMeta(state, action, requestStatuses.PENDING);
}

export function delFail(state, action) {
  return updateMeta(state, action, requestStatuses.FAILED);
}

export function delReset(state, action) {
  return updateMeta(state, action, requestStatuses.NULL);
}

export function delSucceed(state, action) {
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
