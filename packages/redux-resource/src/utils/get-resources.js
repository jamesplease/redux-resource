import warning from './warning';

function resourceArrayToObject(arr) {
  return arr.reduce((memo, r) => {
    memo[r.id] = r;
    return memo;
  }, {});
}

// Returns a list of resources by IDs or list name
export default function(resourceSlice, filter, options) {
  if (process.env.NODE_ENV !== 'production') {
    // We use duck typing to try and differentiate between a user passing the entire state tree
    // in as `resourceSlice` (which was the original getResources API).
    // eslint-disable-next-line no-inner-declarations
    function validateSlice(slice = {}) {
      return (
        slice.hasOwnProperty('resources') &&
        slice.hasOwnProperty('meta') &&
        slice.hasOwnProperty('requests') &&
        slice.hasOwnProperty('lists')
      );
    }

    if (
      arguments.length === 3 &&
      !validateSlice(resourceSlice) &&
      // We assume that undefined means that a slice is undefined, rather than the entire state tree being undefined.
      typeof resourceSlice !== 'undefined'
    ) {
      warning(
        `You called getResources with an argument signature that was removed in ` +
          `v3.0.0 of Redux Resource. The old signature accepted three arguments, with the first being the all of the store's ` +
          `state. The new signature of this function requires passing a resource slice as the first argument. Please ` +
          `update your code to use the new signature. For more information, reference the documentation at ` +
          `https://redux-resource.js.org/docs/api-reference/get-resources.html\n\n` +
          `Also, the migration guide to Redux Resource v3 can be found at: ` +
          `https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource/docs/migration-guides/2-to-3.md`,
        'DEPRECATED_GET_RESOURCES_SIGNATURE'
      );
    }
  }

  let byId;
  if (options && options.byId) {
    byId = options.byId;
  }

  const noResultsReturn = byId ? {} : [];

  if (!resourceSlice) {
    return noResultsReturn;
  }

  const resources = resourceSlice.resources;
  let idsList;

  if (typeof filter === 'function' || !filter) {
    const appliedFilter = filter ? filter : () => true;
    const resourcesList = Object.values(resources).filter(resource =>
      appliedFilter(resource, resourceSlice.meta[resource.id], resourceSlice)
    );

    return byId ? resourceArrayToObject(resourcesList) : resourcesList;
  } else if (typeof filter === 'string') {
    // This conditional handles the situation where `filter` is an list name
    const list = resourceSlice.lists[filter];
    if (!list) {
      return noResultsReturn;
    }

    idsList = list;
  } else {
    idsList = filter;
  }

  if (!(idsList && idsList.length)) {
    return noResultsReturn;
  }

  const resourcesList = idsList.map(id => resources[id]).filter(Boolean);

  return byId ? resourceArrayToObject(resourcesList) : resourcesList;
}
