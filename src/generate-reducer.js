import * as reducers from './reducers';

export default function generateReducers(options) {
  const {idAttr, initialState, resourceName} = options;

  const actionReducers = {
    CREATE_RESOURCE: reducers.create.bind(null, resourceName, idAttr),
    CREATE_RESOURCE_FAIL: reducers.createFail.bind(null, resourceName, idAttr),
    CREATE_RESOURCE_SUCCEED: reducers.createSucceed.bind(null, resourceName, idAttr),
    CREATE_RESOURCE_ABORT: reducers.createAbort.bind(null, resourceName, idAttr),
    CREATE_RESOURCE_RESET: reducers.createReset.bind(null, resourceName, idAttr),

    READ_RESOURCE: reducers.read.bind(null, resourceName, idAttr),
    READ_RESOURCE_FAIL: reducers.readFail.bind(null, resourceName, idAttr),
    READ_RESOURCE_SUCCEED: reducers.readSucceed.bind(null, resourceName, idAttr),
    READ_RESOURCE_ABORT: reducers.readAbort.bind(null, resourceName, idAttr),
    READ_RESOURCE_RESET: reducers.readReset.bind(null, resourceName, idAttr),

    UPDATE_RESOURCE: reducers.update.bind(null, resourceName, idAttr),
    UPDATE_RESOURCE_FAIL: reducers.updateFail.bind(null, resourceName, idAttr),
    UPDATE_RESOURCE_SUCCEED: reducers.updateSucceed.bind(null, resourceName, idAttr),
    UPDATE_RESOURCE_ABORT: reducers.updateAbort.bind(null, resourceName, idAttr),
    UPDATE_RESOURCE_RESET: reducers.updateReset.bind(null, resourceName, idAttr),

    DELETE_RESOURCE: reducers.del.bind(null, resourceName, idAttr),
    DELETE_RESOURCE_FAIL: reducers.delFail.bind(null, resourceName, idAttr),
    DELETE_RESOURCE_SUCCEED: reducers.delSucceed.bind(null, resourceName, idAttr),
    DELETE_RESOURCE_ABORT: reducers.delAbort.bind(null, resourceName, idAttr),
    DELETE_RESOURCE_RESET: reducers.delReset.bind(null, resourceName, idAttr),

    CREATE_MANY_RESOURCES: reducers.createMany.bind(null, resourceName, idAttr),
    CREATE_MANY_RESOURCES_FAIL: reducers.createManyFail.bind(null, resourceName, idAttr),
    CREATE_MANY_RESOURCES_SUCCEED: reducers.createManySucceed.bind(null, resourceName, idAttr),
    CREATE_MANY_RESOURCES_ABORT: reducers.createManyAbort.bind(null, resourceName, idAttr),
    CREATE_MANY_RESOURCES_RESET: reducers.createManyReset.bind(null, resourceName, idAttr),

    READ_MANY_RESOURCES: reducers.readMany.bind(null, resourceName, idAttr),
    READ_MANY_RESOURCES_FAIL: reducers.readManyFail.bind(null, resourceName, idAttr),
    READ_MANY_RESOURCES_SUCCEED: reducers.readManySucceed.bind(null, resourceName, idAttr),
    READ_MANY_RESOURCES_ABORT: reducers.readManyAbort.bind(null, resourceName, idAttr),
    READ_MANY_RESOURCES_RESET: reducers.readManyReset.bind(null, resourceName, idAttr),

    UPDATE_MANY_RESOURCES: reducers.updateMany.bind(null, resourceName, idAttr),
    UPDATE_MANY_RESOURCES_FAIL: reducers.updateManyFail.bind(null, resourceName, idAttr),
    UPDATE_MANY_RESOURCES_SUCCEED: reducers.updateManySucceed.bind(null, resourceName, idAttr),
    UPDATE_MANY_RESOURCES_ABORT: reducers.updateManyAbort.bind(null, resourceName, idAttr),
    UPDATE_MANY_RESOURCES_RESET: reducers.updateManyReset.bind(null, resourceName, idAttr),

    DELETE_MANY_RESOURCES: reducers.delMany.bind(null, resourceName, idAttr),
    DELETE_MANY_RESOURCES_FAIL: reducers.delManyFail.bind(null, resourceName, idAttr),
    DELETE_MANY_RESOURCES_SUCCEED: reducers.delManySucceed.bind(null, resourceName, idAttr),
    DELETE_MANY_RESOURCES_ABORT: reducers.delManyAbort.bind(null, resourceName, idAttr),
    DELETE_MANY_RESOURCES_RESET: reducers.delManyReset.bind(null, resourceName, idAttr)
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
