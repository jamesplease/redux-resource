import {
  updateResourcesMeta, updateManyResourcesMeta, upsertResource,
  xhrStatuses, initialResourceMetaState
} from './utils';

// Create reducers
export function create(idAttr, state, action) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      creatingStatus: xhrStatuses.PENDING
    }
  };
}

export function createFailure(idAttr, state, action) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      creatingStatus: xhrStatuses.FAILED
    }
  };
}

export function createSuccess(idAttr, state, action) {
  const resources = upsertResource(state.resources, action.resource, action[idAttr], idAttr);
  return {
    ...state,
    resources,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      creatingStatus: xhrStatuses.SUCCEEDED
    }
  };
}

export function createAborted(idAttr, state, action) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      creatingStatus: xhrStatuses.ABORTED
    }
  };
}

export function createResetResolution(idAttr, state, action) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      creatingStatus: xhrStatuses.NULL
    }
  };
}

// Retrieve one reducers
export function retrieveOne(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: xhrStatuses.PENDING
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function retrieveOneFailure(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: xhrStatuses.FAILED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function retrieveOneSuccess(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: xhrStatuses.SUCCEEDED
  }, action[idAttr]);

  const resources = upsertResource(state.resources, action.resource, action[idAttr], idAttr);

  return {
    ...state,
    resourcesMeta,
    resources
  };
}

export function retrieveOneAborted(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: xhrStatuses.ABORTED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function retrieveOneResetResolution(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: xhrStatuses.NULL
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

// Retrieve many reducers
export function retrieveMany(idAttr, state, action) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      retrievingStatus: xhrStatuses.PENDING
    }
  };
}

export function retrieveManyFailure(idAttr, state, action) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      retrievingStatus: xhrStatuses.FAILED
    }
  };
}

export function retrieveManySuccess(idAttr, state, action) {
  const resources = action.resources;
  // This needs to use `idAttr`.
  const ids = resources.map(r => r[idAttr]);
  return {
    ...state,
    resources,
    // We have new resources, so we need to update their meta state with the
    // initial meta state.
    resourcesMeta: updateManyResourcesMeta(state.resourcesMeta, initialResourceMetaState, ids),
    resourcesListMeta: {
      ...state.resourcesListMeta,
      retrievingStatus: xhrStatuses.SUCCEEDED
    }
  };
}

export function retrieveManyAborted(idAttr, state, action) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      retrievingStatus: xhrStatuses.ABORTED
    }
  };
}

export function retrieveManyResetResolution(idAttr, state, action) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      retrievingStatus: xhrStatuses.NULL
    }
  };
}

// Update reducers
export function update(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    updatingStatus: xhrStatuses.PENDING
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function updateFailure(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    updatingStatus: xhrStatuses.FAILED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function updateSuccess(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    updatingStatus: xhrStatuses.SUCCEEDED
  }, action[idAttr]);

  const resources = upsertResource(state.resources, action.resource, action[idAttr], idAttr);

  return {
    ...state,
    resourcesMeta,
    resources
  };
}

export function updateAborted(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    updatingStatus: xhrStatuses.ABORTED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function updateResetResolution(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    updatingStatus: xhrStatuses.NULL
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

// Delete reducers
export function del(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    deletingStatus: xhrStatuses.PENDING
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function delFailure(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    deletingStatus: xhrStatuses.FAILED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function delSuccess(idAttr, state, action) {
  const id = action[idAttr];

  // Remove this resource from the resources meta.
  const resourcesMeta = {
    // Shallow clone the meta
    ...state.resourcesMeta,
    [id]: null
  };

  // Shallow clone the existing resource array, removing the deleted resource
  const resources = state.resources.filter(r => r.id !== id);

  return {
    ...state,
    resourcesMeta,
    resources
  };
}

export function delAborted(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    deletingStatus: xhrStatuses.ABORTED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function delResetResolution(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    deletingStatus: xhrStatuses.NULL
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}
