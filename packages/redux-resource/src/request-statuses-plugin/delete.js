import reducerGenerator from '../utils/reducer-generator';
import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';
import warning from '../utils/warning';

const del = reducerGenerator('delete', requestStatuses.PENDING);
const delFail = reducerGenerator('delete', requestStatuses.FAILED);
const delIdle = reducerGenerator('delete', requestStatuses.IDLE);

function delSucceed(state, action, {initialResourceMeta}) {
  const resources = action.resources;

  let request;
  if (action.request && typeof action.request === 'string') {
    request = action.request;
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

    if (action.list) {
      warning(
        `You included a "list" in a delete action. You don't need to do this, ` +
        `because successful deletes remove the deleted resources from all lists.`
      );
    }
  }

  // Find the list of IDs affected by this action
  let idList;
  if (resources && resources.map) {
    idList = resources.map(r => {
      if (typeof r === 'object') {
        if (process.env.NODE_ENV !== 'production') {
          if (!r.id || (typeof r.id !== 'string' && typeof r.id !== 'number')) {
            warning(
              `A resource without an ID was passed to an action with type ` +
              `${action.type}. Every resource must have an ID that is either ` +
              `a number of a string. You should check your action creators to ` +
              `make sure that an ID is always included in your resources.`
            );
          }
        }
        return r.id;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          if (typeof r !== 'string' && typeof r !== 'number') {
            warning(
              `A resource without an ID was passed to an action with type ` +
              `${action.type}. Every resource must have an ID that is either ` +
              `a number of a string. You should check your action creators to ` +
              `make sure that an ID is always included in your resources.`
            );
          }
        }
        return r;
      }
    });
  }

  const hasIds = idList && idList.length;

  // If we have no IDs nor request, then there is nothing to update
  if (!hasIds && !request) {
    return state;
  }

  let newMeta;
  let newLists = {};
  let newRequests = {};
  const meta = state.meta;
  const requests = state.requests;
  const lists = state.lists;

  if (request) {
    const existingRequest = requests[request] || {};
    newRequests = {
      ...requests,
      [request]: {
        ...existingRequest,
        status: requestStatuses.SUCCEEDED,
        ids: idList || [],
      }
    };
  } else {
    newRequests = requests;
  }

  for (let resourceList in lists) {
    const existingList = lists[resourceList];

    let newList;
    if (hasIds && existingList) {
      newList = existingList.filter(r => !idList.includes(r));
    } else if (existingList) {
      newList = existingList;
    }

    newLists[resourceList] = newList;
  }

  if (hasIds) {
    const nullMeta = idList.reduce((memo, id) => {
      memo[id] = {
        ...initialResourceMetaState,
        ...initialResourceMeta,
        deleteStatus: requestStatuses.SUCCEEDED
      };
      return memo;
    }, {});

    newMeta = {
      ...meta,
      ...nullMeta
    };
  } else {
    newMeta = meta;
  }

  // Shallow clone the existing resource object, nulling any deleted resources
  let newResources = Object.assign({}, state.resources);
  if (hasIds) {
    idList.forEach(id => {
      newResources[id] = null;
    });
  }

  return {
    ...state,
    meta: newMeta,
    lists: newLists,
    requests: newRequests,
    resources: newResources
  };
}

export {del, delFail, delIdle, delSucceed};
