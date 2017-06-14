import updateMetaHelper from './update-meta-helper';
import requestStatuses from '../utils/request-statuses';

export function del(state, action) {
  return updateMetaHelper(state, action.ids, requestStatuses.PENDING, 'delete');
}

export function delFail(state, action) {
  return updateMetaHelper(state, action.ids, requestStatuses.FAILED, 'delete');
}

export function delReset(state, action) {
  return updateMetaHelper(state, action.ids, requestStatuses.NULL, 'delete');
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
