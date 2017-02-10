import {
  updateResourcesMeta, updateManyResourcesMeta, upsertResource,
  resourceStatuses, initialResourceMetaState
} from './utils';

// Create reducers
export function create(idAttr, state, action) {
  console.log('create');
}

export function createFailure(idAttr, state, action) {
  console.log('create_failure');
}

export function createSuccess(idAttr, state, action) {
  console.log('create_success');
}

export function createAborted(idAttr, state, action) {
  console.log('create_aborted');
}

export function createResetResolution(idAttr, state, action) {
  console.log('create_reset_resolution');
}

// Retrieve one reducers
export function retrieveOne(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: resourceStatuses.PENDING
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function retrieveOneFailure(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: resourceStatuses.FAILED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function retrieveOneSuccess(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: resourceStatuses.SUCCEEDED
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
    retrievingStatus: resourceStatuses.ABORTED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function retrieveOneResetResolution(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    retrievingStatus: resourceStatuses.NULL
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
      retrievingStatus: resourceStatuses.PENDING
    }
  };
}

export function retrieveManyFailure(idAttr, state, action) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      retrievingStatus: resourceStatuses.FAILED
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
      retrievingStatus: resourceStatuses.SUCCEEDED
    }
  };
}

export function retrieveManyAborted(idAttr, state, action) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      retrievingStatus: resourceStatuses.ABORTED
    }
  };
}

export function retrieveManyResetResolution(idAttr, state, action) {
  return {
    ...state,
    resourcesListMeta: {
      ...state.resourcesListMeta,
      retrievingStatus: resourceStatuses.NULL
    }
  };
}

// Update reducers
export function update(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    updatingStatus: resourceStatuses.PENDING
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function updateFailure(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    updatingStatus: resourceStatuses.FAILED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function updateSuccess(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    updatingStatus: resourceStatuses.SUCCEEDED
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
    updatingStatus: resourceStatuses.ABORTED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function updateResetResolution(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    updatingStatus: resourceStatuses.NULL
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

// Delete reducers
export function del(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    deletingStatus: resourceStatuses.PENDING
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function delFailure(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    deletingStatus: resourceStatuses.FAILED
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
    deletingStatus: resourceStatuses.ABORTED
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}

export function delResetResolution(idAttr, state, action) {
  const resourcesMeta = updateResourcesMeta(state.resourcesMeta, {
    deletingStatus: resourceStatuses.NULL
  }, action[idAttr]);

  return {
    ...state,
    resourcesMeta,
  };
}
