import {
  updateResourcesMeta, updateManyResourcesMeta, createOrUpdateResource,
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

  const resources = createOrUpdateResource(state.resources, action.resource, action[idAttr], idAttr);

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
      retrievingStatus: resourceStatuses.PENDING
    }
  };
}

export function retrieveManyFailure(idAttr, state, action) {
  return {
    ...state,
    resourcesListMeta: {
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
      retrievingStatus: resourceStatuses.SUCCEEDED
    }
  };
}

export function retrieveManyAborted(idAttr, state, action) {
  return {
    ...state,
    resourcesListMeta: {
      retrievingStatus: resourceStatuses.ABORTED
    }
  };
}

export function retrieveManyResetResolution(idAttr, state, action) {
  return {
    ...state,
    resourcesListMeta: {
      retrievingStatus: resourceStatuses.NULL
    }
  };
}

// Update reducers
export function update(idAttr, state, action) {
  console.log('update');
}

export function updateFailure(idAttr, state, action) {
  console.log('update_failure');
}

export function updateSuccess(idAttr, state, action) {
  console.log('update_success');
}

export function updateAborted(idAttr, state, action) {
  console.log('update_aborted');
}

export function updateResetResolution(idAttr, state, action) {
  console.log('update_reset_resolution');
}

// Delete reducers
export function del(idAttr, state, action) {
  console.log('del');
}

export function delFailure(idAttr, state, action) {
  console.log('del_failure');
}

export function delSuccess(idAttr, state, action) {
  console.log('del_success');
}

export function delAborted(idAttr, state, action) {
  console.log('del_aborted');
}

export function delResetResolution(idAttr, state, action) {
  console.log('del_reset_resolution');
}
