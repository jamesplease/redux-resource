import setResourceMeta from '../utils/set-resource-meta';

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
  return function(state, action) {
    const resources = action.resources;
    const label = action.label;
    const mergeMeta = action.mergeMeta;

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
    let newLabels, newMeta;

    if (!label && !idList.length) {
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

    if (idList.length) {
      newMeta = setResourceMeta({
        meta: state.meta,
        newMeta: {[statusAttribute]: requestStatus},
        resources: idList,
        mergeMeta,
      });
    } else {
      newMeta = state.meta;
    }

    return {
      ...state,
      labels: newLabels,
      meta: newMeta
    };
  };
}
