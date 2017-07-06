import setResourceMeta from './set-resource-meta';
import upsertResources from './upsert-resources';
import requestStatuses from './request-statuses';

// This reducer helper handles the "CRU" in "CRUD".

export default function(state, action, {initialResourceMeta}, updatedMeta) {
  const resources = action.resources;
  const label = action.label;
  const resourcesIsUndefined = typeof resources === 'undefined';
  const hasResources = resources && resources.length;

  if (process.env.NODE_ENV !== 'production') {
    if (!resources) {
      console.warn(
        `A 'resources' Array was not supplied to a Resourceful Redux "success" ` +
        `action with type "${action.type}". Without a 'resources' Array, ` +
        `Resourceful Redux will not be able to track which resources have been ` +
        `affected by this CRUD operation. You should check your Action Creators.`
      );
    }
  }

  // Without resources or labels, there is nothing to update
  if (!hasResources && !label) {
    return state;
  }

  const newResources = upsertResources(state.resources, resources, action.mergeResources);
  const newMeta = setResourceMeta({
    resources,
    meta: state.meta,
    newMeta: updatedMeta,
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

    if (action.mergeLabelIds === false) {
      if (hasResources) {
        newLabel.ids = resources.map(resource => {
          return typeof resource === 'object' ? resource.id : resource;
        });
      } else if (!resourcesIsUndefined) {
        newLabel.ids = [];
      }
    } else if (hasResources) {
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
