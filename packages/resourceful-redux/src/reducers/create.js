import reducerGenerator from '../utils/reducer-generator';
import cruReducerHelper from '../utils/cru-reducer-helper';
import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';

const create = reducerGenerator('create', requestStatuses.PENDING);
const createFail = reducerGenerator('create', requestStatuses.FAILED);
const createNull = reducerGenerator('create', requestStatuses.NULL);

function createSucceed(state, action, options) {
  const customInitialMeta = options.initialResourceMeta || {};
  const optionsToSend = {
    initialResourceMeta: {
      ...initialResourceMetaState,
      ...customInitialMeta
    }
  };

  return cruReducerHelper(state, action, optionsToSend, {
    readStatus: requestStatuses.SUCCEEDED,
    createStatus: requestStatuses.SUCCEEDED,
  });
}

export {create, createFail, createNull, createSucceed};
