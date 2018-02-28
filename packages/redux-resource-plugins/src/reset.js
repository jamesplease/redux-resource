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

    const { request, list } = action;

    if (!request && !list) {
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

    if (request) {
      newState.requests = {
        ...state.requests,
        [request]: {
          ids: [],
          status: requestStatuses.IDLE,
        },
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
