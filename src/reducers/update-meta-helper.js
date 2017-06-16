import setResourceMeta from '../utils/set-resource-meta';

export default function({state, ids = [], requestStatus, crudAction, setIds = true, requestLabel}) {
  const statusAttribute = `${crudAction}Status`;

  // Request labels take priority over everything else.
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
  }

  // Then, we look for IDs. `setIds` will opt the reducer out of this behavior
  if (!setIds || !ids.length) {
    return {
      ...state,
      listMeta: {
        ...state.listMeta,
        [statusAttribute]: requestStatus
      }
    };
  }

  // Finally, if there's neither a label nor an ID,
  return {
    ...state,
    meta: setResourceMeta({
      meta: state.meta,
      newMeta: {[statusAttribute]: requestStatus},
      mergeMeta: true,
      ids
    })
  };
}
