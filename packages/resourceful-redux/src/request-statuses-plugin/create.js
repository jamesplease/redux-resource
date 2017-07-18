import actionTypes from '../action-types';
import reducerGenerator from '../utils/reducer-generator';
import cruReducerHelper from '../utils/cru-reducer-helper';
import requestStatuses from '../utils/request-statuses';

const create = reducerGenerator('create', requestStatuses.PENDING);
const createFail = reducerGenerator('create', requestStatuses.FAILED);
const createNull = reducerGenerator('create', requestStatuses.NULL)

function createSucceed(state, action, options) {
  return cruReducerHelper(state, action, options, {
    readStatus: requestStatuses.SUCCEEDED,
    createStatus: requestStatuses.SUCCEEDED,
  });
}

export {create, createFail, createNull, createSucceed};
