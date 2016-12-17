// This file is for utility methods to manage the most common reducer pattern
// in which resources and their status are maintained in collection
// `resources: []` and hashmap `resourcesMeta: {}`.

// resourcesMeta: the metadata Object from a resource store slice
// resourceMeta: the new metadataObject from a given resourceMeta
// id: the ID of the resource to be updated
export function updateResourcesMeta(resourcesMeta, resourceMeta, id) {
  return {
    // Shallow clone the current resourcesMeta
    ...resourcesMeta,
    // Update the key that is the "id" of the resource
    [id]: {
      // Shallow clone the existing metadata for this resource
      ...resourcesMeta[id],
      // Shallow clone the passed-in metadata
      ...resourceMeta
    }
  };
}

// resources: the Array of resources
// resource: the new resource object to be added or updated
// id: the ID of the resource being updated
export function addOrUpdateResource(resources, resource, id) {
  // Attempt to find the resource by its ID. If the ID doesn't exist, or if
  // no resource by that ID exists, then we append it to the end as a new
  // resource.
  const resourceIndex = id && resources.findIndex(item => item.id === id);
  if (!id || resourceIndex === -1) {
    return [...resources, resource];
  }

  // Otherwise, it does exist and we add it to the list at the appropriate
  // location
  return [
    ...resources.slice(0, resourceIndex),
    resource,
    ...resources.slice(resourceIndex + 1)
  ];
}

export function generateDefaultInitialState() {
  return {
    resources: [],
    resourcesMeta: {}
  };
}
