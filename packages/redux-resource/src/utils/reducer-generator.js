import setResourceMeta from '../utils/set-resource-meta';
import initialResourceMetaState from './initial-resource-meta-state';
import warning from './warning';

// This helper is used to simplify non-success reducers. Because non-success
// reducers don't modify the data – ever – it simplifies the scope of what can
// change.
// Basically, two things can change:
//
// 1. Request status for resource IDs in `meta`, if IDs are passed in
// 2. Request status for a named request
//
// A named request's IDs don't change, and neither does the resource. Consequently,
// this helper completely defines all of the ways in which the non-success reducers
// can change the state.
export default function(crudAction, requestStatus) {
  return function(state, action, {initialResourceMeta} = {}) {
    const resources = action.resources;
    const mergeMeta = action.mergeMeta;

    let request;
    if (action.request && typeof action.request === 'string') {
      request = action.request;
    }

    let idList;
    if (resources) {
      idList = resources.map(r => {
        if (typeof r === 'object') {
          return r.id;
        } else {
          return r;
        }
      });
    } else {
      idList = [];
    }

    const statusAttribute = `${crudAction}Status`;
    let newRequests, newMeta, newLists;

    if (!request && !idList.length) {
      if (process.env.NODE_ENV !== 'production') {
        warning(
          `A Redux Resource action of type ${action.type} was dispatched ` +
          `without a "request", "list," or "resources" array. Without one of these ` +
          `values, Redux Resource cannot track your CRUD operation. You ` +
          `should check your Action Creators. Read more about CRUD Actions ` +
          `at: https://redux-resource.js.org/docs/guides/crud-actions.html`
        );
      }

      return state;
    }

    if (request) {
      const existingRequest = state.requests[request] || {};

      newRequests = {
        ...state.requests,
        [request]: {
          ...existingRequest,
          status: requestStatus
        }
      };
    } else {
      newRequests = state.requests;
    }

    // Lists only change when a request succeeds
    newLists = {...state.lists};

    if (idList.length) {
      newMeta = setResourceMeta({
        meta: state.meta,
        newMeta: {[statusAttribute]: requestStatus},
        resources: idList,
        mergeMeta,
        initialResourceMeta: {
          ...initialResourceMetaState,
          ...initialResourceMeta
        }
      });
    } else {
      newMeta = state.meta;
    }

    return {
      ...state,
      requests: newRequests,
      lists: newLists,
      meta: newMeta
    };
  };
}
