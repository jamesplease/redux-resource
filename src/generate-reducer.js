import * as defaultReducers from './default-reducers';

// "handlers" are the functions that compute the new state given the existing
// state and the action. This function merges in the default handlers, which
// handle basic CRUD actions, with your customHandlers, which you pass in
// when creating a resource.
function getHandlers({customHandlers, resourceName, pluralForm, supportedActions, idAttr}) {
  const capitalResourceName = resourceName.toUpperCase();
  const capitalPluralName = pluralForm.toUpperCase();
  const {create, readOne, readMany, update, del} = supportedActions;

  const createHandlers = create ? {
    [`CREATE_${capitalResourceName}`]: defaultReducers.create.bind(null, idAttr),
    [`CREATE_${capitalResourceName}_FAIL`]: defaultReducers.createFail.bind(null, idAttr),
    [`CREATE_${capitalResourceName}_SUCCEED`]: defaultReducers.createSucceed.bind(null, idAttr),
    [`CREATE_${capitalResourceName}_ABORT`]: defaultReducers.createAbort.bind(null, idAttr),
    [`CREATE_${capitalResourceName}_RESET`]: defaultReducers.createReset.bind(null, idAttr)
  } : {};

  const readOneHandlers = readOne ? {
    [`READ_ONE_${capitalResourceName}`]: defaultReducers.retrieveOne.bind(null, idAttr),
    [`READ_ONE_${capitalResourceName}_FAIL`]: defaultReducers.retrieveOneFail.bind(null, idAttr),
    [`READ_ONE_${capitalResourceName}_SUCCEED`]: defaultReducers.retrieveOneSucceed.bind(null, idAttr),
    [`READ_ONE_${capitalResourceName}_ABORT`]: defaultReducers.retrieveOneAbort.bind(null, idAttr),
    [`READ_ONE_${capitalResourceName}_RESET`]: defaultReducers.retrieveOneReset.bind(null, idAttr)
  } : {};

  const readManyHandlers = readMany ? {
    [`READ_MANY_${capitalPluralName}`]: defaultReducers.retrieveMany.bind(null, idAttr),
    [`READ_MANY_${capitalPluralName}_FAIL`]: defaultReducers.retrieveManyFail.bind(null, idAttr),
    [`READ_MANY_${capitalPluralName}_SUCCEED`]: defaultReducers.retrieveManySucceed.bind(null, idAttr),
    [`READ_MANY_${capitalPluralName}_ABORT`]: defaultReducers.retrieveManyAbort.bind(null, idAttr),
    [`READ_MANY_${capitalPluralName}_RESET`]: defaultReducers.retrieveManyReset.bind(null, idAttr)
  } : {};

  const updateHandlers = update ? {
    [`UPDATE_${capitalResourceName}`]: defaultReducers.update.bind(null, idAttr),
    [`UPDATE_${capitalResourceName}_FAIL`]: defaultReducers.updateFail.bind(null, idAttr),
    [`UPDATE_${capitalResourceName}_SUCCEED`]: defaultReducers.updateSucceed.bind(null, idAttr),
    [`UPDATE_${capitalResourceName}_ABORT`]: defaultReducers.updateAbort.bind(null, idAttr),
    [`UPDATE_${capitalResourceName}_RESET`]: defaultReducers.updateReset.bind(null, idAttr)
  } : {};

  const deleteHandlers = del ? {
    [`DELETE_${capitalResourceName}`]: defaultReducers.del.bind(null, idAttr),
    [`DELETE_${capitalResourceName}_FAIL`]: defaultReducers.delFail.bind(null, idAttr),
    [`DELETE_${capitalResourceName}_SUCCEED`]: defaultReducers.delSucceed.bind(null, idAttr),
    [`DELETE_${capitalResourceName}_ABORT`]: defaultReducers.delAbort.bind(null, idAttr),
    [`DELETE_${capitalResourceName}_RESET`]: defaultReducers.delReset.bind(null, idAttr)
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
  const {idAttr, initialState, customHandlers, resourceName, pluralForm, supportedActions} = options;
  const handlers = getHandlers({customHandlers, resourceName, pluralForm, supportedActions, idAttr});

  return function reducer(state = initialState, action) {
    const handler = handlers[action.type];
    if (!handler) {
      return state;
    }
    const result = handler(state, action);
    return result ? result : state;
  };
}
