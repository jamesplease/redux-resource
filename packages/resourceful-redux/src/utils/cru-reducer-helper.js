import setResourceMeta from './set-resource-meta';
import upsertResources from './upsert-resources';
import requestStatuses from './request-statuses';
import warning from './warning';

// This reducer helper handles the "CRU" in "CRUD".

export default function(state, action, {initialResourceMeta}, updatedMeta) {
  const resources = action.resources;
  const resourcesIsUndefined = typeof resources === 'undefined';
  const hasResources = resources && resources.length;

  let label;
  if (action.label && typeof action.label === 'string') {
    label = action.label;
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!resources) {
      warning(
        `A 'resources' array was not included in a Resourceful Redux ` +
        `"success" action with type "${action.type}. Without a 'resources' ` +
        `Array, Resourceful Redux will not be able to track which resources ` +
        `were affected by this CRUD operation. You should check your Action ` +
        `Creators to make sure that they always include a 'resources' array.`
      );
    } else if (!Array.isArray(resources)) {
      warning(
        `A non-array 'resources' value was passed to a Resourceful Redux ` +
        `"success" action with type "${action.type}". 'resources' must be an ` +
        `array. If your backend returned a single object, be sure to wrap it ` +
        `inside of an array. If you're using the Resourceful Action Creators ` +
        `library, you can do this using the "transformData" option.`
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
