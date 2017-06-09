import * as defaultReducers from './default-reducers';

// "action reducers" are the functions that compute the new state given the
// existin state and the action.
// They are called "action reducers" because they are associated with a given
// action type. It's sort of like `combineReducers()` in Redux, which associates
// a reducer with a particular "slice" of the store. In redux-simple-resource,
// the reducers are further split up into reducers for individual action types.
//
// This function merges in the default reducers, which handle basic CRUD
// actions, with your passed-in actionReducers, which you may pass in as an
// option when creating a resource.
function getActionReducers({actionReducers, resourceName, pluralForm, supportedActions, idAttr}) {
  const capitalResourceName = resourceName.toUpperCase();
  const capitalPluralName = pluralForm.toUpperCase();
  const {
    create, read, update, del,
    createMany, readMany, updateMany, delMany
  } = supportedActions;

  const createReducers = create ? {
    [`CREATE_${capitalResourceName}`]: defaultReducers.create.bind(null, idAttr),
    [`CREATE_${capitalResourceName}_FAIL`]: defaultReducers.createFail.bind(null, idAttr),
    [`CREATE_${capitalResourceName}_SUCCEED`]: defaultReducers.createSucceed.bind(null, idAttr),
    [`CREATE_${capitalResourceName}_ABORT`]: defaultReducers.createAbort.bind(null, idAttr),
    [`CREATE_${capitalResourceName}_RESET`]: defaultReducers.createReset.bind(null, idAttr)
  } : {};

  const readReducers = read ? {
    [`READ_${capitalResourceName}`]: defaultReducers.read.bind(null, idAttr),
    [`READ_${capitalResourceName}_FAIL`]: defaultReducers.readFail.bind(null, idAttr),
    [`READ_${capitalResourceName}_SUCCEED`]: defaultReducers.readSucceed.bind(null, idAttr),
    [`READ_${capitalResourceName}_ABORT`]: defaultReducers.readAbort.bind(null, idAttr),
    [`READ_${capitalResourceName}_RESET`]: defaultReducers.readReset.bind(null, idAttr)
  } : {};

  const updateReducers = update ? {
    [`UPDATE_${capitalResourceName}`]: defaultReducers.update.bind(null, idAttr),
    [`UPDATE_${capitalResourceName}_FAIL`]: defaultReducers.updateFail.bind(null, idAttr),
    [`UPDATE_${capitalResourceName}_SUCCEED`]: defaultReducers.updateSucceed.bind(null, idAttr),
    [`UPDATE_${capitalResourceName}_ABORT`]: defaultReducers.updateAbort.bind(null, idAttr),
    [`UPDATE_${capitalResourceName}_RESET`]: defaultReducers.updateReset.bind(null, idAttr)
  } : {};

  const deleteReducers = del ? {
    [`DELETE_${capitalResourceName}`]: defaultReducers.del.bind(null, idAttr),
    [`DELETE_${capitalResourceName}_FAIL`]: defaultReducers.delFail.bind(null, idAttr),
    [`DELETE_${capitalResourceName}_SUCCEED`]: defaultReducers.delSucceed.bind(null, idAttr),
    [`DELETE_${capitalResourceName}_ABORT`]: defaultReducers.delAbort.bind(null, idAttr),
    [`DELETE_${capitalResourceName}_RESET`]: defaultReducers.delReset.bind(null, idAttr)
  } : {};

  const createManyReducers = createMany ? {
    [`CREATE_MANY_${capitalPluralName}`]: defaultReducers.createMany.bind(null, idAttr),
    [`CREATE_MANY_${capitalPluralName}_FAIL`]: defaultReducers.createManyFail.bind(null, idAttr),
    [`CREATE_MANY_${capitalPluralName}_SUCCEED`]: defaultReducers.createManySucceed.bind(null, idAttr),
    [`CREATE_MANY_${capitalPluralName}_ABORT`]: defaultReducers.createManyAbort.bind(null, idAttr),
    [`CREATE_MANY_${capitalPluralName}_RESET`]: defaultReducers.createManyReset.bind(null, idAttr)
  } : {};

  const readManyReducers = readMany ? {
    [`READ_MANY_${capitalPluralName}`]: defaultReducers.readMany.bind(null, idAttr),
    [`READ_MANY_${capitalPluralName}_FAIL`]: defaultReducers.readManyFail.bind(null, idAttr),
    [`READ_MANY_${capitalPluralName}_SUCCEED`]: defaultReducers.readManySucceed.bind(null, idAttr),
    [`READ_MANY_${capitalPluralName}_ABORT`]: defaultReducers.readManyAbort.bind(null, idAttr),
    [`READ_MANY_${capitalPluralName}_RESET`]: defaultReducers.readManyReset.bind(null, idAttr)
  } : {};

  const updateManyReducers = updateMany ? {
    [`UPDATE_MANY_${capitalPluralName}`]: defaultReducers.updateMany.bind(null, idAttr),
    [`UPDATE_MANY_${capitalPluralName}_FAIL`]: defaultReducers.updateManyFail.bind(null, idAttr),
    [`UPDATE_MANY_${capitalPluralName}_SUCCEED`]: defaultReducers.updateManySucceed.bind(null, idAttr),
    [`UPDATE_MANY_${capitalPluralName}_ABORT`]: defaultReducers.updateManyAbort.bind(null, idAttr),
    [`UPDATE_MANY_${capitalPluralName}_RESET`]: defaultReducers.updateManyReset.bind(null, idAttr)
  } : {};

  const deleteManyReducers = delMany ? {
    [`DELETE_MANY_${capitalPluralName}`]: defaultReducers.delMany.bind(null, idAttr),
    [`DELETE_MANY_${capitalPluralName}_FAIL`]: defaultReducers.delManyFail.bind(null, idAttr),
    [`DELETE_MANY_${capitalPluralName}_SUCCEED`]: defaultReducers.delManySucceed.bind(null, idAttr),
    [`DELETE_MANY_${capitalPluralName}_ABORT`]: defaultReducers.delManyAbort.bind(null, idAttr),
    [`DELETE_MANY_${capitalPluralName}_RESET`]: defaultReducers.delManyReset.bind(null, idAttr)
  } : {};

  const allDefaultActionReducers = {
    ...createReducers,
    ...readReducers,
    ...updateReducers,
    ...deleteReducers,
    ...createManyReducers,
    ...readManyReducers,
    ...updateManyReducers,
    ...deleteManyReducers,
  };

  return {
    ...allDefaultActionReducers,
    ...actionReducers
  };
}

export default function generateReducers(options) {
  const {idAttr, initialState, actionReducers, resourceName, pluralForm, supportedActions} = options;
  const allActionReducers = getActionReducers({actionReducers, resourceName, pluralForm, supportedActions, idAttr});

  return function reducer(state = initialState, action) {
    const actionReducer = allActionReducers[action.type];
    if (!actionReducer) {
      return state;
    }

    const result = actionReducer(state, action);
    return result ? result : state;
  };
}
