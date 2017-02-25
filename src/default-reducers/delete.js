import {updateResourcesMeta, xhrStatuses} from '../utils';

export function del(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta({
    resourcesMeta: state.resourcesMeta,
    newMeta: {deletingStatus: xhrStatuses.PENDING},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourcesMeta,
  };
}

export function delFail(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta({
    resourcesMeta: state.resourcesMeta,
    newMeta: {deletingStatus: xhrStatuses.FAILED},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourcesMeta,
  };
}

export function delSucceed(idAttr, state, action) {
  const id = action[idAttr];

  // Remove this resource from the resources meta.
  const resourcesMeta = {
    // Shallow clone the meta
    ...state.resourcesMeta,
    [id]: null
  };

  // Shallow clone the existing resource array, removing the deleted resource
  const resources = state.resources.filter(r => r[idAttr] !== id);

  return {
    ...state,
    resourcesMeta,
    resources
  };
}

export function delAbort(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta({
    resourcesMeta: state.resourcesMeta,
    newMeta: {deletingStatus: xhrStatuses.ABORTED},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourcesMeta,
  };
}

export function delReset(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta({
    resourcesMeta: state.resourcesMeta,
    newMeta: {deletingStatus: xhrStatuses.NULL},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourcesMeta,
  };
}
