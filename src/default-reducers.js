import {updateResourcesMeta, addOrUpdateResource} from './utils';

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
  const {id} = action;
  console.log('retrieveMany');
  return {
    ...state,
    id
  };
}

export function retrieveManyFailure(state, action) {
  console.log('retrieveMany_failure');
}

export function retrieveManySuccess(state, action) {
  console.log('retrieveMany_success');
}

export function retrieveManyAborted(state, action) {
  console.log('retrieveMany_aborted');
}

export function retrieveManyResetResolution(state, action) {
  console.log('retrieveManyset_resolution');
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
