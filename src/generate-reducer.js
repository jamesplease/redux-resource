import * as reducers from './reducers';

const actionReducers = {
  CREATE_RESOURCE: reducers.create,
  CREATE_RESOURCE_FAIL: reducers.createFail,
  CREATE_RESOURCE_SUCCEED: reducers.createSucceed,
  CREATE_RESOURCE_RESET: reducers.createReset,

  READ_RESOURCE: reducers.read,
  READ_RESOURCE_FAIL: reducers.readFail,
  READ_RESOURCE_SUCCEED: reducers.readSucceed,
  READ_RESOURCE_RESET: reducers.readReset,

  UPDATE_RESOURCE: reducers.update,
  UPDATE_RESOURCE_FAIL: reducers.updateFail,
  UPDATE_RESOURCE_SUCCEED: reducers.updateSucceed,
  UPDATE_RESOURCE_RESET: reducers.updateReset,

  DELETE_RESOURCE: reducers.del,
  DELETE_RESOURCE_FAIL: reducers.delFail,
  DELETE_RESOURCE_SUCCEED: reducers.delSucceed,
  DELETE_RESOURCE_RESET: reducers.delReset,

  CREATE_MANY_RESOURCES: reducers.createMany,
  CREATE_MANY_RESOURCES_FAIL: reducers.createManyFail,
  CREATE_MANY_RESOURCES_SUCCEED: reducers.createManySucceed,
  CREATE_MANY_RESOURCES_RESET: reducers.createManyReset,

  READ_MANY_RESOURCES: reducers.readMany,
  READ_MANY_RESOURCES_FAIL: reducers.readManyFail,
  READ_MANY_RESOURCES_SUCCEED: reducers.readManySucceed,
  READ_MANY_RESOURCES_RESET: reducers.readManyReset,

  UPDATE_MANY_RESOURCES: reducers.updateMany,
  UPDATE_MANY_RESOURCES_FAIL: reducers.updateManyFail,
  UPDATE_MANY_RESOURCES_SUCCEED: reducers.updateManySucceed,
  UPDATE_MANY_RESOURCES_RESET: reducers.updateManyReset,

  DELETE_MANY_RESOURCES: reducers.delMany,
  DELETE_MANY_RESOURCES_FAIL: reducers.delManyFail,
  DELETE_MANY_RESOURCES_SUCCEED: reducers.delManySucceed,
  DELETE_MANY_RESOURCES_RESET: reducers.delManyReset,
};

export default function generateReducers(options) {
  const {initialState, resourceName} = options;

  return function reducer(state = initialState, action) {
    const actionReducer = actionReducers[action.type];
    if (!actionReducer || action.resourceName !== resourceName) {
      return state;
    }

    const result = actionReducer(state, action);
    return result ? result : state;
  };
}
