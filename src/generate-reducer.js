import * as defaultReducers from './default-reducers';

// "handlers" are the functions that compute the new state given the existing
// state and the action. This function merges in the default handlers, which
// handle basic CRUD actions, with your customHandlers, which you pass in
// when creating a resource.
function getHandlers({customHandlers, resourceName, pluralForm, allowedOperations, idAttr}) {
  const capitalResourceName = resourceName.toUpperCase();
  const capitalPluralName = pluralForm.toUpperCase();
  const {create, readOne, readMany, update, del} = allowedOperations;

  const createHandlers = create ? {
    [`CREATE_${capitalResourceName}`]: defaultReducers.create.bind(null, idAttr),
    [`CREATE_${capitalResourceName}_FAILURE`]: defaultReducers.createFailure.bind(null, idAttr),
    [`CREATE_${capitalResourceName}_SUCCESS`]: defaultReducers.createSuccess.bind(null, idAttr),
    [`CREATE_${capitalResourceName}_ABORTED`]: defaultReducers.createAborted.bind(null, idAttr),
    [`CREATE_${capitalResourceName}_RESET_RESOLUTION`]: defaultReducers.createResetResolution.bind(null, idAttr)
  } : {};

  const readOneHandlers = readOne ? {
    [`RETRIEVE_${capitalResourceName}`]: defaultReducers.retrieveOne.bind(null, idAttr),
    [`RETRIEVE_${capitalResourceName}_FAILURE`]: defaultReducers.retrieveOneFailure.bind(null, idAttr),
    [`RETRIEVE_${capitalResourceName}_SUCCESS`]: defaultReducers.retrieveOneSuccess.bind(null, idAttr),
    [`RETRIEVE_${capitalResourceName}_ABORTED`]: defaultReducers.retrieveOneAborted.bind(null, idAttr),
    [`RETRIEVE_${capitalResourceName}_RESET_RESOLUTION`]: defaultReducers.retrieveOneResetResolution.bind(null, idAttr)
  } : {};

  const readManyHandlers = readMany ? {
    [`RETRIEVE_${capitalPluralName}`]: defaultReducers.retrieveMany.bind(null, idAttr),
    [`RETRIEVE_${capitalPluralName}_FAILURE`]: defaultReducers.retrieveManyFailure.bind(null, idAttr),
    [`RETRIEVE_${capitalPluralName}_SUCCESS`]: defaultReducers.retrieveManySuccess.bind(null, idAttr),
    [`RETRIEVE_${capitalPluralName}_ABORTED`]: defaultReducers.retrieveManyAborted.bind(null, idAttr),
    [`RETRIEVE_${capitalPluralName}_RESET_RESOLUTION`]: defaultReducers.retrieveManyResetResolution.bind(null, idAttr)
  } : {};

  const updateHandlers = update ? {
    [`UPDATE_${capitalResourceName}`]: defaultReducers.update.bind(null, idAttr),
    [`UPDATE_${capitalResourceName}_FAILURE`]: defaultReducers.updateFailure.bind(null, idAttr),
    [`UPDATE_${capitalResourceName}_SUCCESS`]: defaultReducers.updateSuccess.bind(null, idAttr),
    [`UPDATE_${capitalResourceName}_ABORTED`]: defaultReducers.updateAborted.bind(null, idAttr),
    [`UPDATE_${capitalResourceName}_RESET_RESOLUTION`]: defaultReducers.updateResetResolution.bind(null, idAttr)
  } : {};

  const deleteHandlers = del ? {
    [`DELETE_${capitalResourceName}`]: defaultReducers.del.bind(null, idAttr),
    [`DELETE_${capitalResourceName}_FAILURE`]: defaultReducers.delFailure.bind(null, idAttr),
    [`DELETE_${capitalResourceName}_SUCCESS`]: defaultReducers.delSuccess.bind(null, idAttr),
    [`DELETE_${capitalResourceName}_ABORTED`]: defaultReducers.delAborted.bind(null, idAttr),
    [`DELETE_${capitalResourceName}_RESET_RESOLUTION`]: defaultReducers.delResetResolution.bind(null, idAttr)
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
  };
}

export default function generateReducers(options) {
  const {idAttr, initialState, customHandlers, resourceName, pluralForm, allowedOperations} = options;
  const handlers = getHandlers({customHandlers, resourceName, pluralForm, allowedOperations, idAttr});

  return function reducer(state = initialState, action) {
    const handler = handlers[action.type];
    if (!handler) {
      return state;
    }
    const result = handler(state, action);
    return result ? result : state;
  };
}
