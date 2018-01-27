// Returns a list of resources by IDs or list name
export default function(resourceSlice, listName) {
  if (!resourceSlice) {
    return [];
  }

  if (typeof listName === 'string') {
    return resourceSlice.lists[listName] || [];
  } else if (listName.map) {
    return listName.reduce((result, name) => {
      result[name] = resourceSlice.lists[name] || [];
      return result;
    }, {});
  } else {
    return [];
  }
}
