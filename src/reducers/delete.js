import requestStatuses from '../utils/request-statuses';
import updateResourceMeta from '../utils/update-resource-meta';

export function del(state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {deleteStatus: requestStatuses.PENDING},
    id: action.id,
    replace: false
  });

  return {
    ...state,
    meta,
  };
}

export function delFail(state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {deleteStatus: requestStatuses.FAILED},
    id: action.id,
    replace: false
  });

  return {
    ...state,
    meta,
  };
}

export function delSucceed(state, action) {
  const id = action.id;

  // Remove this resource from the resources meta.
  const meta = {
    // Shallow clone the meta
    ...state.meta,
    [id]: null
  };

  // Shallow clone the existing resource array, removing the deleted resource
  const resources = state.resources.filter(r => r.id !== id);

  return {
    ...state,
    meta,
    resources
  };
}

export function delReset(state, action) {
  const meta = updateResourceMeta({
    meta: state.meta,
    newMeta: {deleteStatus: requestStatuses.NULL},
    id: action.id,
    replace: false
  });

  return {
    ...state,
    meta,
  };
}
