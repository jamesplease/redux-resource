import * as reducers from './reducers';

export default {
  CREATE_RESOURCES_PENDING: reducers.create,
  CREATE_RESOURCES_FAILED: reducers.createFail,
  CREATE_RESOURCES_SUCCEEDED: reducers.createSucceed,
  CREATE_RESOURCES_NIL: reducers.createNil,

  READ_RESOURCES_PENDING: reducers.read,
  READ_RESOURCES_FAILED: reducers.readFail,
  READ_RESOURCES_SUCCEEDED: reducers.readSucceed,
  READ_RESOURCES_NIL: reducers.readNil,

  UPDATE_RESOURCES_PENDING: reducers.update,
  UPDATE_RESOURCES_FAILED: reducers.updateFail,
  UPDATE_RESOURCES_SUCCEEDED: reducers.updateSucceed,
  UPDATE_RESOURCES_NIL: reducers.updateNil,

  DELETE_RESOURCES_PENDING: reducers.del,
  DELETE_RESOURCES_FAILED: reducers.delFail,
  DELETE_RESOURCES_SUCCEEDED: reducers.delSucceed,
  DELETE_RESOURCES_NIL: reducers.delNil,
};
