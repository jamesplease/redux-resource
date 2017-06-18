import reducerGenerator from '../utils/reducer-generator';
import cruReducerHelper from '../utils/cru-reducer-helper';
import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';

const create = reducerGenerator('create', requestStatuses.PENDING);
const createFail = reducerGenerator('create', requestStatuses.FAILED);
const createNull = reducerGenerator('create', requestStatuses.NULL);

function createSucceed(state, action, options) {
  return cruReducerHelper(state, action, options, {
    ...initialResourceMetaState,
    readStatus: requestStatuses.SUCCEEDED,
    createStatus: requestStatuses.SUCCEEDED,
  });
}

export {create, createFail, createNull, createSucceed};
