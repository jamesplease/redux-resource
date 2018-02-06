import reducerGenerator from '../utils/reducer-generator';
import cruReducerHelper from '../utils/cru-reducer-helper';
import requestStatuses from '../utils/request-statuses';

const update = reducerGenerator('update', requestStatuses.PENDING);
const updateFail = reducerGenerator('update', requestStatuses.FAILED);
const updateIdle = reducerGenerator('update', requestStatuses.IDLE);

function updateSucceed(state, action, options) {
  return cruReducerHelper(state, action, options, {
    updateStatus: requestStatuses.SUCCEEDED
  });
}

export {update, updateFail, updateIdle, updateSucceed};
