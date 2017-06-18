import updateMetaHelper from '../utils/update-meta-helper';
import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';
import setResourceMeta from '../utils/set-resource-meta';
import upsertResources from '../utils/upsert-resources';

export function create(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    label: action.label,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.PENDING,
    crudAction: 'create',
    state
  });
}

export function createFail(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    label: action.label,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.FAILED,
    crudAction: 'create',
    state
  });
}

export function createNull(state, action) {
  return updateMetaHelper({
    resources: action.resources,
    label: action.label,
    mergeMeta: action.mergeMeta,
    requestStatus: requestStatuses.NULL,
    crudAction: 'create',
    state
  });
}

export function createSucceed(state, action, {initialResourceMeta}) {
  const resources = action.resources;
  const label = action.label;
  const hasResources = resources && resources.length;

  // Without resources or labels, there is nothing to update
  if (!hasResources && !label) {
    return state;
  }

  const newResources = upsertResources(state.resources, resources, action.mergeResources);
  const newMeta = setResourceMeta({
    resources,
    meta: state.meta,
    newMeta: {
      ...initialResourceMetaState,
      readStatus: requestStatuses.SUCCEEDED,
      createStatus: requestStatuses.SUCCEEDED,
    },
    mergeMeta: action.mergeMeta,
    initialResourceMeta
  });

  let newLabels;
  if (label) {
    const currentLabel = state.labels[label] || {};
    const newLabel = {
      ...currentLabel,
      status: requestStatuses.SUCCEEDED
    };

    if (hasResources) {
      if (action.mergeLabelIds === false) {
        let newLabelIds;
        if (currentLabel.ids) {
          newLabelIds = Array.prototype.slice.call(currentLabel.ids);
        } else {
          newLabelIds = [];
        }

        resources.forEach(resource => {
          const id = typeof resource === 'object' ? resource.id : resource;
          if (!newLabelIds.includes(id)) {
            newLabelIds.push(id);
          }
        });

        newLabel.ids = newLabelIds;
      } else {
        newLabel.ids = resources.map(resource => {
          return typeof resource === 'object' ? resource.id : resource;
        });
      }
    }

    newLabels = {
      ...state.labels,
      [label]: newLabel
    };
  } else {
    newLabels = state.labels;
  }

  return {
    ...state,
    resources: newResources,
    meta: newMeta,
    labels: newLabels
  };
}
