import {
  updateResourcesMeta, updateManyResourcesMeta, addOrUpdateResource,
  resourceStatuses, initialResourceMetaState
} from './utils';

// Create reducers
export function create(state, action) {
  console.log('create');
}

export function createFailure(state, action) {
  console.log('create_failure');
}

export function createSuccess(state, action) {
  console.log('create_success');
}

export function createAborted(state, action) {
  console.log('create_aborted');
}

export function createResetResolution(state, action) {
  console.log('create_reset_resolution');
}

// Retrieve one reducers
export function retrieveOne(state, action) {
  const {id} = action;
  console.log('retrieveOne');
  return {
    ...state,
    id
  };
}

export function retrieveOneFailure(state, action) {
  console.log('retrieveOne_failure');
}

export function retrieveOneSuccess(state, action) {
  console.log('retrieveOne_success');
}

export function retrieveOneAborted(state, action) {
  console.log('retrieveOne_aborted');
}

export function retrieveOneResetResolution(state, action) {
  console.log('retrieve_reset_resolution');
}

// Retrieve many reducers
export function retrieveMany(state, action) {
  return {
    ...state,
    resourcesListMeta: {
      retrievingStatus: resourceStatuses.PENDING
    }
  };
}

export function retrieveManyFailure(state, action) {
  return {
    ...state,
    resourcesListMeta: {
      retrievingStatus: resourceStatuses.FAILED
    }
  };
}

export function retrieveManySuccess(state, action) {
  const resources = action.resources;
  // This needs to use `idAttr`.
  const ids = resources.map(r => r.id);
  return {
    ...state,
    resources,
    // We have new resources, so we need to update their meta state with the
    // initial meta state.
    resourcesMeta: updateManyResourcesMeta(state.resourcesMeta, initialResourceMetaState, ids),
    resourcesListMeta: {
      retrievingStatus: resourceStatuses.SUCCESS
    }
  };
}

export function retrieveManyAborted(state, action) {
  return {
    ...state,
    resourcesListMeta: {
      retrievingStatus: resourceStatuses.ABORTED
    }
  };
}

export function retrieveManyResetResolution(state, action) {
  return {
    ...state,
    resourcesListMeta: {
      retrievingStatus: null
    }
  };
}

// Update reducers
export function update(state, action) {
  console.log('update');
}

export function updateFailure(state, action) {
  console.log('update_failure');
}

export function updateSuccess(state, action) {
  console.log('update_success');
}

export function updateAborted(state, action) {
  console.log('update_aborted');
}

export function updateResetResolution(state, action) {
  console.log('update_reset_resolution');
}

// Delete reducers
export function del(state, action) {
  console.log('del');
}

export function delFailure(state, action) {
  console.log('del_failure');
}

export function delSuccess(state, action) {
  console.log('del_success');
}

export function delAborted(state, action) {
  console.log('del_aborted');
}

export function delResetResolution(state, action) {
  console.log('del_reset_resolution');
}
