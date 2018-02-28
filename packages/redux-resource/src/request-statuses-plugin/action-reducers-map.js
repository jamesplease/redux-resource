import * as readReducers from './read';
import * as createReducers from './create';
import * as updateReducers from './update';
import * as deleteReducers from './delete';

export default {
  CREATE_RESOURCES_PENDING: createReducers.create,
  CREATE_RESOURCES_FAILED: createReducers.createFail,
  CREATE_RESOURCES_SUCCEEDED: createReducers.createSucceed,
  CREATE_RESOURCES_IDLE: createReducers.createIdle,

  READ_RESOURCES_PENDING: readReducers.read,
  READ_RESOURCES_FAILED: readReducers.readFail,
  READ_RESOURCES_SUCCEEDED: readReducers.readSucceed,
  READ_RESOURCES_IDLE: readReducers.readIdle,

  UPDATE_RESOURCES_PENDING: updateReducers.update,
  UPDATE_RESOURCES_FAILED: updateReducers.updateFail,
  UPDATE_RESOURCES_SUCCEEDED: updateReducers.updateSucceed,
  UPDATE_RESOURCES_IDLE: updateReducers.updateIdle,

  DELETE_RESOURCES_PENDING: deleteReducers.del,
  DELETE_RESOURCES_FAILED: deleteReducers.delFail,
  DELETE_RESOURCES_SUCCEEDED: deleteReducers.delSucceed,
  DELETE_RESOURCES_IDLE: deleteReducers.delIdle,
};
