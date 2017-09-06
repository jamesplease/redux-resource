import setResourceMeta from '../utils/set-resource-meta';
import initialResourceMetaState from './initial-resource-meta-state';
import warning from './warning';

// This helper is used to simplify non-success reducers. Because non-success
// reducers don't modify the data – ever – it simplifies the scope of what can
// change.
// Basically, two things can change:
//
// 1. Request status for resource IDs in `meta`, if IDs are passed in
// 2. Request status for a labeled request
//
// A label's IDs don't change, and neither does the resource. Consequently, this
// helper completely defines all of the ways in which the non-success reducers
// can change the state.
export default function(crudAction, requestStatus) {
  return function(state, action, {initialResourceMeta} = {}) {
    const resources = action.resources;
    const mergeMeta = action.mergeMeta;

    let label;
    if (action.label && typeof action.label === 'string') {
      label = action.label;
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
    let newLabels, newMeta, newLists;

    if (!label && !idList.length) {
      if (process.env.NODE_ENV !== 'production') {
        warning(
          `A Resourceful Redux action of type ${action.type} was dispatched ` +
          `without a "label", "list," or "resources" array. Without one of these ` +
          `values, Resourceful Redux cannot track your CRUD operation. You ` +
          `should check your Action Creators. Read more about CRUD Actions ` +
          `at: https://resourceful-redux.js.org/docs/guides/crud-actions.html`
        );
      }

      return state;
    }

    if (label) {
      const existingLabel = state.labels[label] || {};

      newLabels = {
        ...state.labels,
        [label]: {
          ...existingLabel,
          status: requestStatus
        }
      };
    } else {
      newLabels = {...state.labels};
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
      labels: newLabels,
      lists: newLists,
      meta: newMeta
    };
  };
}
