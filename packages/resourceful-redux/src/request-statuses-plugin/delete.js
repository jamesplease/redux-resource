import reducerGenerator from '../utils/reducer-generator';
import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';
import warning from '../utils/warning';

const del = reducerGenerator('delete', requestStatuses.PENDING);
const delFail = reducerGenerator('delete', requestStatuses.FAILED);
const delNull = reducerGenerator('delete', requestStatuses.NULL);

function delSucceed(state, action, {initialResourceMeta}) {
  const resources = action.resources;

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

  // Find the list of IDs affected by this action
  let idList;
  if (resources && resources.map) {
    idList = resources.map(r => {
      if (typeof r === 'object') {
        if (process.env.NODE_ENV !== 'production') {
          if (!r.id || (typeof r.id !== 'string' && typeof r.id !== 'number')) {
            warning(
              `A resource without an ID was passed to an action with type ` +
              `${action.type}. Every resource must have an ID that is either ` +
              `a number of a string. You should check your action creators to ` +
              `make sure that an ID is always included in your resources.`
            );
          }
        }
        return r.id;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          if (typeof r !== 'string' && typeof r !== 'number') {
            warning(
              `A resource without an ID was passed to an action with type ` +
              `${action.type}. Every resource must have an ID that is either ` +
              `a number of a string. You should check your action creators to ` +
              `make sure that an ID is always included in your resources.`
            );
          }
        }
        return r;
      }
    });
  }

  const hasIds = idList && idList.length;

  // If we have no label nor IDs, then there is nothing to update
  if (!hasIds && !label) {
    return state;
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
