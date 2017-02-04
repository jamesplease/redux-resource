import actionTypes from './action-types';
import * as defaultReducers from './default-reducers';

// "handlers" are the functions that compute the new state given the existing
// state and the action. This function merges in the default handlers, which
// handle basic CRUD actions, with your customHandlers, which you pass in
// when creating a resource.
function getHandlers({customHandlers, types, resourceName, pluralForm, allowedOperations, idAttr}) {
  const capitalResourceName = resourceName.toUpperCase();
  const capitalPluralName = pluralForm.toUpperCase();
  const {create, readOne, readMany, update, del} = allowedOperations;

  const createHandlers = create ? {
    [`CREATE_${capitalResourceName}`]: defaultReducers.create,
    [`CREATE_${capitalResourceName}_FAILURE`]: defaultReducers.createFailure,
    [`CREATE_${capitalResourceName}_SUCCESS`]: defaultReducers.createSuccess,
    [`CREATE_${capitalResourceName}_ABORTED`]: defaultReducers.createAborted,
    [`CREATE_${capitalResourceName}_RESET_RESOLUTION`]: defaultReducers.createResetResolution
  } : {};

  const readOneHandlers = readOne ? {
    [`RETRIEVE_${capitalResourceName}`]: defaultReducers.retrieveOne,
    [`RETRIEVE_${capitalResourceName}_FAILURE`]: defaultReducers.retrieveOneFailure,
    [`RETRIEVE_${capitalResourceName}_SUCCESS`]: defaultReducers.retrieveOneSuccess,
    [`RETRIEVE_${capitalResourceName}_ABORTED`]: defaultReducers.retrieveOneAborted,
    [`RETRIEVE_${capitalResourceName}_RESET_RESOLUTION`]: defaultReducers.retrieveOneResetResolution
  } : {};

  const readManyHandlers = readMany ? {
    [`RETRIEVE_${capitalPluralName}`]: defaultReducers.retrieveMany,
    [`RETRIEVE_${capitalPluralName}_FAILURE`]: defaultReducers.retrieveManyFailure,
    [`RETRIEVE_${capitalPluralName}_SUCCESS`]: defaultReducers.retrieveManySuccess,
    [`RETRIEVE_${capitalPluralName}_ABORTED`]: defaultReducers.retrieveManyAborted,
    [`RETRIEVE_${capitalPluralName}_RESET_RESOLUTION`]: defaultReducers.retrieveManyResetResolution
  } : {};

  const updateHandlers = update ? {
    [`UPDATE_${capitalResourceName}`]: defaultReducers.update,
    [`UPDATE_${capitalResourceName}_FAILURE`]: defaultReducers.updateFailure,
    [`UPDATE_${capitalResourceName}_SUCCESS`]: defaultReducers.updateSuccess,
    [`UPDATE_${capitalResourceName}_ABORTED`]: defaultReducers.updateAborted,
    [`UPDATE_${capitalResourceName}_RESET_RESOLUTION`]: defaultReducers.updateResetResolution
  } : {};

  const deleteHandlers = del ? {
    [`DELETE_${capitalResourceName}`]: defaultReducers.del,
    [`DELETE_${capitalResourceName}_FAILURE`]: defaultReducers.delFailure,
    [`DELETE_${capitalResourceName}_SUCCESS`]: defaultReducers.delSuccess,
    [`DELETE_${capitalResourceName}_ABORTED`]: defaultReducers.delAborted,
    [`DELETE_${capitalResourceName}_RESET_RESOLUTION`]: defaultReducers.delResetResolution
  } : {};

  // Default handlers manage the five states of CRUD.
  const defaultHandlers = {
    ...createHandlers,
    ...readOneHandlers,
    ...readManyHandlers,
    ...updateHandlers,
    ...deleteHandlers,
  };

  return {
    ...defaultHandlers,
    ...customHandlers
  }
}

export default function generateReducers(options) {
  const {idAttr, initialState, customHandlers, types, resourceName, pluralForm, allowedOperations} = options;
  const handlers = getHandlers({customHandlers, types, resourceName, pluralForm, allowedOperations, idAttr});

  return function reducer(state = initialState, action) {
    const handler = handlers[action.type];
    const result = handler(state, action);
    return result ? result : state;
  }
}
