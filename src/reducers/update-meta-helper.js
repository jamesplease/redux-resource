import setResourceMeta from '../utils/set-resource-meta';

export default function({state, ids = [], requestStatus, crudAction, requestLabel}) {
  const statusAttribute = `${crudAction}Status`;
  let newLabels, newMeta;

  if (requestLabel) {
    const existingLabel = state.labels[requestLabel] || {};

    return {
      ...state,
      labels: {
        ...state.labels,
        [requestLabel]: {
          ...existingLabel,
          status: requestStatus
        }
      }
    };
  } else {
    newLabels = {...state.labels};
  }

  if (ids.length) {
    newMeta = setResourceMeta({
      meta: state.meta,
      newMeta: {[statusAttribute]: requestStatus},
      mergeMeta: true,
      ids
    });
  } else {
    newMeta = {...state.meta};
  }

  return {
    ...state,
    labels: newLabels,
    meta: newMeta
  };
}
