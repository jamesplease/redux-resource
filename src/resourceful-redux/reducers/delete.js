import reducerGenerator from '../utils/reducer-generator';
import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';

const del = reducerGenerator('del', requestStatuses.PENDING);
const delFail = reducerGenerator('del', requestStatuses.FAILED);
const delNull = reducerGenerator('del', requestStatuses.NULL);

function delSucceed(state, action, {initialResourceMeta}) {
  const label = action.label;
  const resources = action.resources;

  // Find the list of IDs affected by this action
  let idList;
  if (resources) {
    idList = resources.map(r => {
      if (typeof r === 'object') {
        return r.id;
      } else {
        return r;
      }
    });
  }

  const hasIds = idList && idList.length;

  // If we have no label nor IDs, then there is nothing to update
  if (!hasIds && !label) {
    return;
  }

  let newMeta;
  let newLabels = {};
  const meta = state.meta;
  const labels = state.labels;
  for (let requestLabel in labels) {
    const existingLabel = state.labels[requestLabel] || {};
    const existingLabelIds = existingLabel.ids || [];
    const newLabel = {
      ...existingLabel
    };

    if (hasIds && existingLabel.ids) {
      newLabel.ids = existingLabelIds.filter(r => !idList.includes(r));
    } else if (existingLabel.ids) {
      newLabel.ids = existingLabelIds;
    }

    if (label && label === requestLabel) {
      newLabel.status = requestStatuses.SUCCEEDED;
    }

    newLabels[requestLabel] = newLabel;
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
    labels: newLabels,
    resources: newResources
  };
}

export {del, delFail, delNull, delSucceed};
