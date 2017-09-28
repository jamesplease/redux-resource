// Returns a list of resources by IDs or list name
export default function(state, resourceName, idsOrList) {
  const resourceSlice = state[resourceName];
  if (!resourceSlice) {
    return [];
  }

  const resources = resourceSlice.resources;
  let idsList;

  // This conditional handles the situation where `idsOrList` is an list name
  if (typeof idsOrList === 'string') {
    const list = resourceSlice.lists[idsOrList];
    if (!list) {
      return [];
    }

    idsList = list.ids;
  } else {
    idsList = idsOrList;
  }

  if (!(idsList && idsList.length)) {
    return [];
  }

  return idsList.map(id => resources[id]).filter(Boolean);
}
