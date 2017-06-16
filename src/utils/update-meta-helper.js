import setResourceMeta from '../utils/set-resource-meta';

// This helper is used to simplify non-success reducers. Because non-success
// reducers don't modify the data – ever – it simplifies the scope of what can
// change.
// Basically, two things can change:
//
// 1. Request status for resource IDs in `meta`, if IDs they are passed in
// 2. Request status for a labeled request
//
// Label IDs don't change, and neither does the resource. Consequently, this
// helper completely defines all of the ways in which the non-success reducers
// can change the state.
export default function(options) {
  const {
    state, ids, resources, requestStatus, crudAction, requestLabel,
    mergeMeta = true
  } = options;

  // Find the list of IDs affected by this action
  let idList;
  if (resources) {
    idList = resources.map(r => r.id);
  } else if (ids) {
    idList = ids;
  } else {
    idList = [];
  }

  const statusAttribute = `${crudAction}Status`;
  let newLabels, newMeta;

  if (!requestLabel && !idList.length) {
    return state;
  }

  if (requestLabel) {
    const existingLabel = state.labels[requestLabel] || {};

    newLabels = {
      ...state.labels,
      [requestLabel]: {
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
      ids: idList,
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
}
