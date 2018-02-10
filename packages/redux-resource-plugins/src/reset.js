import { requestStatuses } from 'redux-resource';

const actionTypes = {
  RESET_RESOURCE: 'RESET_RESOURCE'
};

function resetResource(resourceName, { request, list } = {}) {
  return {
    type: 'RESET_RESOURCE',
    resourceName,
    request,
    list
  };
}

function reset(resourceName, options = {}) {
  return function(state, action) {
    if (
      action.type !== actionTypes.RESET_RESOURCE ||
      action.resourceName !== resourceName
    ) {
      return state;
    }

    const { request, list } = action;

    if (!request && !list) {
      return {
        resources: {},
        meta: {},
        lists: {},
        requests: {},
        ...options.initialState
      };
    }

    const newState = {
      ...state
    };

    if (request) {
      newState.requests = {
        ...state.requests,
        [request]: {
          ids: [],
          status: requestStatuses.NULL
        }
      };
    }

    if (list) {
      newState.lists = {
        ...state.lists,
        [list]: []
      };
    }

    return newState;
  };
}

reset.actionTypes = actionTypes;
reset.resetResource = resetResource;

export default reset;
