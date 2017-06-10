import * as reducers from './reducers';

export default function generateReducers(options) {
  const {idAttr, initialState, resourceName} = options;

  const actionReducers = {
    CREATE_RESOURCE: reducers.create.bind(null, idAttr),
    CREATE_RESOURCE_FAIL: reducers.createFail.bind(null, idAttr),
    CREATE_RESOURCE_SUCCEED: reducers.createSucceed.bind(null, idAttr),
    CREATE_RESOURCE_ABORT: reducers.createAbort.bind(null, idAttr),
    CREATE_RESOURCE_RESET: reducers.createReset.bind(null, idAttr),

    READ_RESOURCE: reducers.read.bind(null, idAttr),
    READ_RESOURCE_FAIL: reducers.readFail.bind(null, idAttr),
    READ_RESOURCE_SUCCEED: reducers.readSucceed.bind(null, idAttr),
    READ_RESOURCE_ABORT: reducers.readAbort.bind(null, idAttr),
    READ_RESOURCE_RESET: reducers.readReset.bind(null, idAttr),

    UPDATE_RESOURCE: reducers.update.bind(null, idAttr),
    UPDATE_RESOURCE_FAIL: reducers.updateFail.bind(null, idAttr),
    UPDATE_RESOURCE_SUCCEED: reducers.updateSucceed.bind(null, idAttr),
    UPDATE_RESOURCE_ABORT: reducers.updateAbort.bind(null, idAttr),
    UPDATE_RESOURCE_RESET: reducers.updateReset.bind(null, idAttr),

    DELETE_RESOURCE: reducers.del.bind(null, idAttr),
    DELETE_RESOURCE_FAIL: reducers.delFail.bind(null, idAttr),
    DELETE_RESOURCE_SUCCEED: reducers.delSucceed.bind(null, idAttr),
    DELETE_RESOURCE_ABORT: reducers.delAbort.bind(null, idAttr),
    DELETE_RESOURCE_RESET: reducers.delReset.bind(null, idAttr),

    CREATE_MANY_RESOURCES: reducers.createMany.bind(null, idAttr),
    CREATE_MANY_RESOURCES_FAIL: reducers.createManyFail.bind(null, idAttr),
    CREATE_MANY_RESOURCES_SUCCEED: reducers.createManySucceed.bind(null, idAttr),
    CREATE_MANY_RESOURCES_ABORT: reducers.createManyAbort.bind(null, idAttr),
    CREATE_MANY_RESOURCES_RESET: reducers.createManyReset.bind(null, idAttr),

    READ_MANY_RESOURCES: reducers.readMany.bind(null, idAttr),
    READ_MANY_RESOURCES_FAIL: reducers.readManyFail.bind(null, idAttr),
    READ_MANY_RESOURCES_SUCCEED: reducers.readManySucceed.bind(null, idAttr),
    READ_MANY_RESOURCES_ABORT: reducers.readManyAbort.bind(null, idAttr),
    READ_MANY_RESOURCES_RESET: reducers.readManyReset.bind(null, idAttr),

    UPDATE_MANY_RESOURCES: reducers.updateMany.bind(null, idAttr),
    UPDATE_MANY_RESOURCES_FAIL: reducers.updateManyFail.bind(null, idAttr),
    UPDATE_MANY_RESOURCES_SUCCEED: reducers.updateManySucceed.bind(null, idAttr),
    UPDATE_MANY_RESOURCES_ABORT: reducers.updateManyAbort.bind(null, idAttr),
    UPDATE_MANY_RESOURCES_RESET: reducers.updateManyReset.bind(null, idAttr),

    DELETE_MANY_RESOURCES: reducers.delMany.bind(null, idAttr),
    DELETE_MANY_RESOURCES_FAIL: reducers.delManyFail.bind(null, idAttr),
    DELETE_MANY_RESOURCES_SUCCEED: reducers.delManySucceed.bind(null, idAttr),
    DELETE_MANY_RESOURCES_ABORT: reducers.delManyAbort.bind(null, idAttr),
    DELETE_MANY_RESOURCES_RESET: reducers.delManyReset.bind(null, idAttr)
  };

  return function reducer(state = initialState, action) {
    const actionReducer = actionReducers[action.type];
    if (!actionReducer || action.resourceName !== resourceName) {
      return state;
    }

    const result = actionReducer(state, action);
    return result ? result : state;
  };
}
