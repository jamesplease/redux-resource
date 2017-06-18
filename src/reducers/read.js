import reducerGenerator from '../utils/reducer-generator';
import cruReducerHelper from '../utils/cru-reducer-helper';
import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';

const read = reducerGenerator('read', requestStatuses.PENDING);
const readFail = reducerGenerator('read', requestStatuses.FAILED);
const readNull = reducerGenerator('read', requestStatuses.NULL);

function readSucceed(state, action, options) {
  return cruReducerHelper(state, action, options, {
    ...initialResourceMetaState,
    readStatus: requestStatuses.SUCCEEDED
  });
}

export {read, readFail, readNull, readSucceed};
