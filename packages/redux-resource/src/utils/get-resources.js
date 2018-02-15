// Returns a list of resources by IDs or list name
export default function(resourceSlice, filter) {
  if (!resourceSlice) {
    return [];
  }

  const resources = resourceSlice.resources;
  let idsList;

  if (typeof filter === 'function') {
    return Object.values(resources).filter(resource =>
      filter(resource, resourceSlice.meta[resource.id], resourceSlice)
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
