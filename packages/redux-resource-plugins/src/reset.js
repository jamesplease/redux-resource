import { requestStatuses } from 'redux-resource';

const actionTypes = {
  RESET_RESOURCE: 'RESET_RESOURCE',
};

function resetResource(resourceType, { request, list } = {}) {
  return {
    type: 'RESET_RESOURCE',
    resourceType,
    request,
    list,
  };
}

function reset(resourceType, options = {}) {
  return function(state, action) {
    const typeToUse = action.resourceType || action.resourceName;
    if (
      action.type !== actionTypes.RESET_RESOURCE ||
      typeToUse !== resourceType
    ) {
      return state;
    }

    const { request, requestKey, list } = action;
    const keyToUse = requestKey || request;

    if (!keyToUse && !list) {
      return {
        resources: {},
        meta: {},
        lists: {},
        requests: {},
        ...options.initialState,
      };
    }

    const newState = {
      ...state,
    };

    if (keyToUse) {
      const existingRequest = state.requests[keyToUse];
      const requestName = existingRequest && existingRequest.requestName;

      const newRequest = {
        resourceType: typeToUse,
        requestKey: keyToUse,
        ids: [],
        status: requestStatuses.IDLE,
      };

      if (requestName) {
        newRequest.requestName = requestName;
      }

      newState.requests = {
        ...state.requests,
        [keyToUse]: newRequest,
      };
    }

    if (list) {
      newState.lists = {
        ...state.lists,
        [list]: [],
      };
    }

    return newState;
  };
}

reset.actionTypes = actionTypes;
reset.resetResource = resetResource;

export default reset;
