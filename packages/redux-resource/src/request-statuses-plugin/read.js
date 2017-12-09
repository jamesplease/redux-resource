import reducerGenerator from '../utils/reducer-generator';
import cruReducerHelper from '../utils/cru-reducer-helper';
import requestStatuses from '../utils/request-statuses';

const read = reducerGenerator('read', requestStatuses.PENDING);
const readFail = reducerGenerator('read', requestStatuses.FAILED);
const readIdle = reducerGenerator('read', requestStatuses.IDLE);

function readSucceed(state, action, options) {
  return cruReducerHelper(state, action, options, {
    readStatus: requestStatuses.SUCCEEDED
  });
}

export {read, readFail, readIdle, readSucceed};
