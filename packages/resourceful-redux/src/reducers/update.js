import reducerGenerator from '../utils/reducer-generator';
import cruReducerHelper from '../utils/cru-reducer-helper';
import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';

const update = reducerGenerator('update', requestStatuses.PENDING);
const updateFail = reducerGenerator('update', requestStatuses.FAILED);
const updateNull = reducerGenerator('update', requestStatuses.NULL);

function updateSucceed(state, action, options = {}) {
  const customInitialMeta = options.initialResourceMeta || {};
  const optionsToSend = {
    initialResourceMeta: {
      ...initialResourceMetaState,
      ...customInitialMeta
    }
  };

  return cruReducerHelper(state, action, optionsToSend, {
    updateStatus: requestStatuses.SUCCEEDED
  });
}

export {update, updateFail, updateNull, updateSucceed};
