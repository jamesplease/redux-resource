// Returns a list of resources by IDs or label
export default function(state, resourceName, idsOrLabel) {
  const resourceSlice = state[resourceName];
  if (!resourceSlice) {
    return [];
  }

  const resources = resourceSlice.resources;
  let idsList;

  // This conditional handles the situation where `idsOrLabel` is an ID
  if (typeof idsOrLabel === 'string') {
    const label = resourceSlice.labels[idsOrLabel];
    if (!label) {
      return [];
    }

    const labelIds = label.ids;
    if (!labelIds) {
      return [];
    }

    idsList = labelIds;
  } else {
    idsList = idsOrLabel;
  }

  if (!(idsList && idsList.length)) {
    return [];
  }

  return idsList.map(id => resources[id]).filter(Boolean);
}
