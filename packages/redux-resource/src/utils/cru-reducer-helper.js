import setResourceMeta from './set-resource-meta';
import upsertResources from './upsert-resources';
import requestStatuses from './request-statuses';
import warning from './warning';

// This reducer helper handles the "CRU" in "CRUD".

export default function(state, action, {initialResourceMeta}, updatedMeta) {
  const resources = action.resources;
  const resourcesIsUndefined = typeof resources === 'undefined';
  const hasResources = resources && resources.length;

  let request;
  if (action.request && typeof action.request === 'string') {
    request = action.request;
  }

  let list;
  if (action.list && typeof action.list === 'string') {
    list = action.list;
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!resources) {
      warning(
        `A 'resources' array was not included in a Redux Resource ` +
        `"success" action with type "${action.type}. Without a 'resources' ` +
        `Array, Redux Resource will not be able to track which resources ` +
        `were affected by this CRUD operation. You should check your Action ` +
        `Creators to make sure that they always include a 'resources' array.`
      );
    } else if (!Array.isArray(resources)) {
      warning(
        `A non-array 'resources' value was passed to a Redux Resource ` +
        `"success" action with type "${action.type}". 'resources' must be an ` +
        `array. If your backend returned a single object, be sure to wrap it ` +
        `inside of an array. If you're using the Redux Resource XHR ` +
        `library, you can do this using the "transformData" option.`
      );
    }
  }

  // Without resources, a list, or a request name, there is nothing to update
  if (!hasResources && !request && !list) {
    return state;
  }

  const newResources = upsertResources(state.resources, resources, action.mergeResources);
  const newMeta = setResourceMeta({
    resources,
    meta: state.meta,
    newMeta: updatedMeta,
    mergeMeta: action.mergeMeta,
    initialResourceMeta
  });

  let newRequests;
  if (request) {
    const existingRequest = state.requests[request] || {};
    const newRequest = {
      ...existingRequest,
      status: requestStatuses.SUCCEEDED
    };

    let newRequestIds;
    if (hasResources) {
      newRequestIds = resources.map(resource => {
        return typeof resource === 'object' ? resource.id : resource;
      });
    }
    newRequest.ids = newRequestIds || [];

    newRequests = {
      ...state.requests,
      [request]: newRequest
    };
  } else {
    newRequests = state.requests;
  }

  let newLists;
  if (list) {
    const currentList = state.lists[list] || [];
    let newList;

    if (action.mergeListIds === false) {
      if (hasResources) {
        newList = resources.map(resource => {
          return typeof resource === 'object' ? resource.id : resource;
        });
      } else if (!resourcesIsUndefined) {
        newList = [];
      }
    } else if (hasResources) {
      newList = Array.prototype.slice.call(currentList);

      resources.forEach(resource => {
        const id = typeof resource === 'object' ? resource.id : resource;
        if (!newList.includes(id)) {
          newList.push(id);
        }
      });
    }

    newLists = {
      ...state.lists,
      [list]: newList || currentList
    };
  } else {
    newLists = state.lists;
  }

  return {
    ...state,
    resources: newResources,
    meta: newMeta,
    requests: newRequests,
    lists: newLists
  };
}
