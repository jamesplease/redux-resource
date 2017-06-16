import requestStatuses from '../utils/request-statuses';
import setResourceMeta from '../utils/set-resource-meta';

export default function({state, ids = [], setIds = true, crudAction, requestLabel}) {
  const meta = state.meta;
  const listMeta = state.listMeta;
  const labels = state.labels;
  let newMeta, newListMeta, newLabels;
  const statusAttribute = `${crudAction}Status`;

  if (requestLabel) {
    newMeta = meta;
    newListMeta = listMeta;
    const existingLabel = state.labels[requestLabel] || {};
    newLabels = {
      ...labels,
      [requestLabel]: {
        ...existingLabel,
        status: requestStatuses.SUCCEEDED
      }
    };
  }

  else if (!setIds || !ids.length) {
    newMeta = meta;
    newListMeta = {
      ...listMeta,
      [statusAttribute]: requestStatuses.SUCCEEDED
    };
    newLabels = labels;
  }

  else {
    if (crudAction === 'delete') {
      const nullMeta = ids.reduce((memo, id) => {
        memo[id] = null;
        return memo;
      }, {});

      newMeta = {
        ...meta,
        ...nullMeta
      };
    } else {
      newMeta = setResourceMeta({
        newMeta: {[statusAttribute]: requestStatuses.SUCCEEDED},
        mergeMeta: true,
        meta,
        ids
      });
    }

    newListMeta = listMeta;
    newLabels = labels;
  }

  return {
    meta: newMeta,
    listMeta: newListMeta,
    labels: newLabels
  };
}
