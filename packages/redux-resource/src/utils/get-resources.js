// Returns a list of resources by IDs or list name
export default function(state, resourceName, filter) {
  let resourceSlice, filterToUse;
  if (!filter) {
    resourceSlice = state;
    filterToUse = resourceName;
  } else {
    resourceSlice = state[resourceName];
    filterToUse = filter;
  }

  if (!resourceSlice) {
    return [];
  }

  const resources = resourceSlice.resources;
  let idsList;

  if (typeof filterToUse === 'function') {
    return Object.values(resources)
      .filter(resource => filterToUse(resource, resourceSlice.meta[resource.id], resourceSlice));
  }

  // This conditional handles the situation where `filter` is an list name
  else if (typeof filterToUse === 'string') {
    const list = resourceSlice.lists[filterToUse];
    if (!list) {
      return [];
    }

    idsList = list;
  } else {
    idsList = filterToUse;
  }

  if (!(idsList && idsList.length)) {
    return [];
  }

  return idsList.map(id => resources[id]).filter(Boolean);
}
