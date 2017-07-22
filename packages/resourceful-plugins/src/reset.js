import {requestStatuses} from 'resourceful-redux';

const actionTypes = {
  RESET_RESOURCE: 'RESET_RESOURCE'
};

function resetResource(resourceName, label) {
  return {
    type: 'RESET_RESOURCE',
    resourceName,
    label
  };
}

function reset(resourceName, options = {}) {
  return function(state, action) {
    if (action.type !== actionTypes.RESET_RESOURCE || action.resourceName !== resourceName) {
      return state;
    }

    const {label} = action;

    if (!label) {
      return {
        resources: {},
        meta: {},
        labels: {},
        ...options.initialState,
      };
    }

    else {
      return {
        ...state,
        labels: {
          ...state.labels,
          [label]: {
            ids: [],
            status: requestStatuses.NULL
          }
        }
      };
    }
  };
}

reset.actionTypes = actionTypes;
reset.resetResource = resetResource;

export default reset;
