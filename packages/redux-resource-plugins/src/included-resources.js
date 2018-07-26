import {
  upsertResources,
  setResourceMeta,
  requestStatuses,
  actionTypes,
} from 'redux-resource';

// This plugin adds support for "compound documents," or including multiple
// resource types in a single action.
export default function includedResources(resourceType, options = {}) {
  return (state, action) => {
    const { initialResourceMeta } = options;
    const { includedResources, mergeMeta, mergeResources, type } = action;

    // This plugin only works for successful reads at the moment
    if (type !== actionTypes.READ_RESOURCES_SUCCEEDED && type !== actionTypes.CREATE_RESOURCES_SUCCEEDED) {
      return state;
    }

    // If this action has no includedResources, then there is nothing to do
    if (!includedResources) {
      return state;
    }

    // If there are no included resources for this slice, then we do nothing
    const includedResourceList = includedResources[resourceType];

    if (!includedResourceList) {
      return state;
    }

    const resources = upsertResources(
      state.resources,
      includedResourceList,
      mergeResources
    );

    const meta = setResourceMeta({
      resources: includedResourceList,
      meta: state.meta,
      newMeta: {
        readStatus: requestStatuses.SUCCEEDED,
      },
      initialResourceMeta,
      mergeMeta,
    });

    return {
      ...state,
      meta,
      resources,
    };
  };
}
