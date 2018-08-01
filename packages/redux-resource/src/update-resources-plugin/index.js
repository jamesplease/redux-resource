import upsertResources from '../utils/upsert-resources';
import upsertMeta from '../utils/upsert-meta';
import initialResourceMetaState from '../utils/initial-resource-meta-state';
import requestStatuses from '../utils/request-statuses';
import warning from '../utils/warning';

export default (resourceType, { initialResourceMeta }) => (state, action) => {
  if (
    action.type !== 'UPDATE_RESOURCES' &&
    action.type !== 'DELETE_RESOURCES'
  ) {
    return state;
  }

  const naiveNewResources = action.resources && action.resources[resourceType];
  const naiveNewMeta = action.meta && action.meta[resourceType];
  const additionalLists = action.lists && action.lists[resourceType];

  if (action.type === 'UPDATE_RESOURCES') {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof action.mergeListIds !== 'undefined') {
        warning(
          `You passed the "mergeListId" properties to an UPDATE_RESOURCES action. ` +
            `This property only works for the request action types (such as ` +
            `READ_RESOURCES_PENDING). When using UPDATE_RESOURCES, you must modify the ` +
            `list yourself, and then pass the new list to the action creator. ` +
            `For more information, refer to the documentation on this action at: ` +
            `https://redux-resource.js.org/docs/resources/modifying-resources.html`,
          'MERGE_LIST_ID_UPDATE_RESOURCES'
        );
      }

      if (!action.resources && !action.meta && !action.lists) {
        warning(
          `You dispatched an UPDATE_RESOURCES action without any resources, meta, ` +
            `or lists, so the store will not be updated. ` +
            `For more information, refer to the documentation on this action at: ` +
            `https://redux-resource.js.org/docs/resources/modifying-resources.html`,
          'UPDATE_RESOURCES_NO_OP'
        );
      }
    }

    let mergeResources;
    if (typeof action.mergeResources === 'boolean') {
      mergeResources = action.mergeResources;
    } else if (typeof action.mergeResources === 'object') {
      mergeResources = action.mergeResources[resourceType];
    } else {
      mergeResources = true;
    }

    let mergeMeta;
    if (typeof action.mergeMeta === 'boolean') {
      mergeMeta = action.mergeMeta;
    } else if (typeof action.mergeMeta === 'object') {
      mergeMeta = action.mergeMeta[resourceType];
    } else {
      mergeMeta = true;
    }

    const newResources = upsertResources(
      state.resources,
      naiveNewResources,
      mergeResources
    );

    let newMeta;
    if (!Array.isArray(naiveNewMeta)) {
      newMeta = upsertMeta(state.meta, naiveNewMeta, mergeMeta);
    } else {
      newMeta = state.meta;
    }

    let newLists = state.lists;

    if (additionalLists) {
      newLists = {
        ...state.lists,
        ...additionalLists,
      };
    }

    return {
      ...state,
      ...action.resourceSliceAttributes,
      resources: newResources,
      meta: newMeta,
      lists: newLists,
    };
  } else {
    if (process.env.NODE_ENV !== 'production') {
      if (!action.resources && !action.meta) {
        warning(
          `You dispatched a DELETE_RESOURCES action without any resources ` +
            `or meta, so the store will not be updated. ` +
            `For more information, refer to the documentation on this action at: ` +
            `https://redux-resource.js.org/docs/resources/modifying-resources.html`,
          'DELETE_RESOURCES_NO_OP'
        );
      }
    }

    let idList;
    if (naiveNewResources && naiveNewResources.map) {
      idList = naiveNewResources.map(r => {
        if (typeof r === 'object') {
          if (process.env.NODE_ENV !== 'production') {
            if (
              (!r.id && r.id !== 0) ||
              (typeof r.id !== 'string' && typeof r.id !== 'number')
            ) {
              warning(
                `A resource without an ID was passed to an action with type ` +
                  `${
                    action.type
                  }. Every resource must have an ID that is either ` +
                  `a number of a string. You should check your action creators to ` +
                  `make sure that an ID is always included in your resources. ` +
                  `For more information, refer to the documentation on resource objects at: ` +
                  `https://redux-resource.js.org/docs/resources/resource-objects.html`,
                'NO_RESOURCE_ID'
              );
            }
          }
          return r.id;
        } else {
          if (process.env.NODE_ENV !== 'production') {
            if (typeof r !== 'string' && typeof r !== 'number') {
              warning(
                `A resource without an ID was passed to an action with type ` +
                  `${
                    action.type
                  }. Every resource must have an ID that is either ` +
                  `a number of a string. You should check your action creators to ` +
                  `make sure that an ID is always included in your resources. ` +
                  `For more information, refer to the documentation on resource objects at: ` +
                  `https://redux-resource.js.org/docs/resources/resource-objects.html`,
                'NO_RESOURCE_ID'
              );
            }
          }
          return r;
        }
      });
    } else {
      idList = Object.keys(naiveNewResources || {});
    }

    const hasIds = idList && idList.length;
    if (!hasIds) {
      return state;
    }

    let newMeta;
    let newLists = {};
    const meta = state.meta;
    const lists = state.lists;

    for (let resourceList in lists) {
      const existingList = lists[resourceList];
      newLists[resourceList] = existingList.filter(r => !idList.includes(r));
    }

    const nullMeta = idList.reduce((memo, id) => {
      const newMeta = (naiveNewMeta || {})[id];
      memo[id] = {
        ...initialResourceMetaState,
        ...initialResourceMeta,
        ...newMeta,
        deleteStatus: requestStatuses.SUCCEEDED,
      };
      return memo;
    }, {});

    newMeta = {
      ...meta,
      ...nullMeta,
    };

    // Shallow clone the existing resource object, nulling any deleted resources
    let newResources = Object.assign({}, state.resources);
    if (hasIds) {
      idList.forEach(id => {
        delete newResources[id];
      });
    }

    return {
      ...state,
      meta: newMeta,
      lists: newLists,
      resources: newResources,
    };
  }
};
