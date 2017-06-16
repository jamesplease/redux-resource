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
export default function({state, ids = [], requestStatus, crudAction, requestLabel, mergeMeta = true}) {
  const statusAttribute = `${crudAction}Status`;
  let newLabels, newMeta;

  if (!requestLabel && !ids.length) {
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

  if (ids.length) {
    newMeta = setResourceMeta({
      meta: state.meta,
      newMeta: {[statusAttribute]: requestStatus},
      mergeMeta,
      ids
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
