import warning from './warning';

// Returns a list of resources by IDs or list name
export default function(resourceSlice, filter) {
  if (process.env.NODE_ENV !== 'production') {
    if (arguments.length === 3) {
      warning(
        `Your code is using an old signature of getResources that was removed in ` +
          `v3.0.0 of Redux Resource. The old signature accepted three arguments. The new ` +
          `signature only accepts two. Please update your code to use the new signature. ` +
          `For more information, reference the documentation at ` +
          `https://redux-resource.js.org/docs/api-reference/get-resources.html\n\n` +
          `Also, the migration guide to Redux Resource v3 can be found at: ` +
          `https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource/docs/migration-guides/2-to-3.md`,
        'DEPRECATED_GET_RESOURCES_SIGNATURE'
      );
    }
  }

  if (!resourceSlice) {
    return [];
  }

  const resources = resourceSlice.resources;
  let idsList;

  if (typeof filter === 'function' || !filter) {
    const appliedFilter = filter ? filter : () => true;
    return Object.values(resources).filter(resource =>
      appliedFilter(resource, resourceSlice.meta[resource.id], resourceSlice)
    );
  } else if (typeof filter === 'string') {
    // This conditional handles the situation where `filter` is an list name
    const list = resourceSlice.lists[filter];
    if (!list) {
      return [];
    }

    idsList = list;
  } else {
    idsList = filter;
  }

  if (!(idsList && idsList.length)) {
    return [];
  }

  return idsList.map(id => resources[id]).filter(Boolean);
}
