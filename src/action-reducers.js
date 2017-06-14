import * as reducers from './reducers';

export default {
  CREATE_RESOURCES: reducers.create,
  CREATE_RESOURCES_FAIL: reducers.createFail,
  CREATE_RESOURCES_SUCCEED: reducers.createSucceed,
  CREATE_RESOURCES_RESET: reducers.createReset,

  READ_RESOURCES: reducers.read,
  READ_RESOURCES_FAIL: reducers.readFail,
  READ_RESOURCES_SUCCEED: reducers.readSucceed,
  READ_RESOURCES_RESET: reducers.readReset,

  UPDATE_RESOURCES: reducers.update,
  UPDATE_RESOURCES_FAIL: reducers.updateFail,
  UPDATE_RESOURCES_SUCCEED: reducers.updateSucceed,
  UPDATE_RESOURCES_RESET: reducers.updateReset,

  DELETE_RESOURCES: reducers.del,
  DELETE_RESOURCES_FAIL: reducers.delFail,
  DELETE_RESOURCES_SUCCEED: reducers.delSucceed,
  DELETE_RESOURCES_RESET: reducers.delReset,
};
