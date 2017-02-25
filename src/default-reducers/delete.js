import {updateResourceMeta, xhrStatuses} from '../utils';

export function del(idAttr, state, action) {
  const resourceMeta = updateResourceMeta({
    resourceMeta: state.resourceMeta,
    newMeta: {deletingStatus: xhrStatuses.PENDING},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourceMeta,
  };
}

export function delFail(idAttr, state, action) {
  const resourceMeta = updateResourceMeta({
    resourceMeta: state.resourceMeta,
    newMeta: {deletingStatus: xhrStatuses.FAILED},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourceMeta,
  };
}

export function delSucceed(idAttr, state, action) {
  const id = action[idAttr];

  // Remove this resource from the resources meta.
  const resourceMeta = {
    // Shallow clone the meta
    ...state.resourceMeta,
    [id]: null
  };

  // Shallow clone the existing resource array, removing the deleted resource
  const resources = state.resources.filter(r => r[idAttr] !== id);

  return {
    ...state,
    resourceMeta,
    resources
  };
}

export function delAbort(idAttr, state, action) {
  const resourceMeta = updateResourceMeta({
    resourceMeta: state.resourceMeta,
    newMeta: {deletingStatus: xhrStatuses.ABORTED},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourceMeta,
  };
}

export function delReset(idAttr, state, action) {
  const resourceMeta = updateResourceMeta({
    resourceMeta: state.resourceMeta,
    newMeta: {deletingStatus: xhrStatuses.NULL},
    id: action[idAttr],
    replace: false
  });

  return {
    ...state,
    resourceMeta,
  };
}
