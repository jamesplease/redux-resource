import upsertResources from '../utils/upsert-resources';
import upsertMeta from '../utils/upsert-meta';

export default resourceType => (state, action) => {
  if (action.type !== 'UPDATE_RESOURCES') {
    return state;
  }

  const naiveNewResources = action.resources && action.resources[resourceType];
  const naiveNewMeta = action.meta && action.meta[resourceType];

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
  const additionalLists = action.lists && action.lists[resourceType];

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
};
