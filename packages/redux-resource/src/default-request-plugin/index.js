import actionTypes from '../action-types';
import requestStatuses from '../utils/request-statuses';

export default () => {
  return (state, action) => {
    // Note: `action.request` is deprecated
    const requestKey = action.requestKey || action.request;

    // A request key is like a resource ID. Without it, there is
    // nothing that we could update.
    if (!requestKey) {
      return state;
    }

    const isPendingAction =
      action.type === actionTypes.CREATE_RESOURCES_PENDING ||
      action.type === actionTypes.READ_RESOURCES_PENDING ||
      action.type === actionTypes.UPDATE_RESOURCES_PENDING ||
      action.type === actionTypes.DELETE_RESOURCES_PENDING ||
      action.type === actionTypes.REQUEST_PENDING;

    const isSucceededAction =
      action.type === actionTypes.CREATE_RESOURCES_SUCCEEDED ||
      action.type === actionTypes.READ_RESOURCES_SUCCEEDED ||
      action.type === actionTypes.UPDATE_RESOURCES_SUCCEEDED ||
      action.type === actionTypes.DELETE_RESOURCES_SUCCEEDED ||
      action.type === actionTypes.REQUEST_SUCCEEDED;

    const isFailedAction =
      action.type === actionTypes.CREATE_RESOURCES_FAILED ||
      action.type === actionTypes.READ_RESOURCES_FAILED ||
      action.type === actionTypes.UPDATE_RESOURCES_FAILED ||
      action.type === actionTypes.DELETE_RESOURCES_FAILED ||
      action.type === actionTypes.REQUEST_FAILED;

    const isNullAction =
      action.type === actionTypes.CREATE_RESOURCES_IDLE ||
      action.type === actionTypes.READ_RESOURCES_IDLE ||
      action.type === actionTypes.UPDATE_RESOURCES_IDLE ||
      action.type === actionTypes.DELETE_RESOURCES_IDLE ||
      action.type === actionTypes.REQUEST_IDLE;

    // If the action type isn't a Redux Resource CRUD action, then there is nothing
    // for us to update.
    if (
      !isPendingAction &&
      !isSucceededAction &&
      !isFailedAction &&
      !isNullAction
    ) {
      return state;
    }

    const requestName = action.requestName || action.request;

    const newRequest = {
      ...state.requests[requestKey],
      ...action.requestAttributes,
      requestName,
    };

    if (action.crudAction) {
      newRequest.crudAction = action.crudAction;
    }

    if (isPendingAction) {
      newRequest.status = requestStatuses.PENDING;
    } else if (isFailedAction) {
      newRequest.status = requestStatuses.FAILED;
    } else if (isSucceededAction) {
      newRequest.status = requestStatuses.SUCCEEDED;

      newRequest.resources = {};

      if (action.resourceName && action.resources) {
        newRequest.resources[action.resourceName] = action.resources.map(
          resource => {
            return typeof resource === 'object' ? resource.id : resource;
          }
        );
      } else if (action.resources) {
        for (var resourceName in action.resources) {
          const resources = action.resources[resourceName];
          // Add an error if this isn't an array
          newRequest.resources[resourceName] = resources.map(resource => {
            return typeof resource === 'object' ? resource.id : resource;
          });
        }
      } else {
        // Maybe log a helpful error here?
      }
    } else if (isNullAction) {
      newRequest.status = requestStatuses.IDLE;
    }

    return {
      ...state,
      requests: {
        ...state.requests,
        [requestKey]: newRequest,
      },
    };
  };
};
