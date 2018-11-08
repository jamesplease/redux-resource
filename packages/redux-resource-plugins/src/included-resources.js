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

    const isReadType = type === actionTypes.READ_RESOURCES_SUCCEEDED;
    const isCreateType = type === actionTypes.CREATE_RESOURCES_SUCCEEDED;
    const isUpdateType = type === actionTypes.UPDATE_RESOURCES_SUCCEEDED;

    if (!isReadType && !isCreateType && !isUpdateType) {
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

    const newMeta = {
      readStatus: requestStatuses.SUCCEEDED,
    };

    if (isCreateType) {
      newMeta.createStatus = requestStatuses.SUCCEEDED;
    } else if (isUpdateType) {
      newMeta.updateStatus = requestStatuses.SUCCEEDED;
    }

    const meta = setResourceMeta({
      resources: includedResourceList,
      meta: state.meta,
      newMeta,
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
