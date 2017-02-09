// These are statuses for in-flight requests. If a request has no status
// associated with it, then it would have a status of `NULL`.
export const resourceStatuses = {
  PENDING: 'PENDING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  ABORTED: 'ABORTED',
  NULL: null
};

export const initialResourceMetaState = {
  // The status of any existing request to update this resource
  updatingStatus: null,
  // The status of any existing request to fetch this resource
  retrievingStatus: null,
  // Whether or not a request is in flight to delete this resource
  isDeleting: false
};

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

// Similar to `updateResourcesMeta`, but it accepts an array of IDs instead of
// a single ID.
export function updateManyResourcesMeta(resourcesMeta, resourceMetaUpdate, ids) {
  const next = {...resourcesMeta};

  ids.forEach((id) => {
    const current = next[id];
    next[id] = {
      ...current,
      ...resourceMetaUpdate
    };
  });

  return next;
}

// resources: the Array of resources
// resource: the new resource object to be added or updated
// id: the ID of the resource being updated
export function upsertResource(resources, resource, id, idAttr) {
  // Attempt to find the resource by its ID. If the ID doesn't exist, or if
  // no resource by that ID exists, then we append it to the end as a new
  // resource.
  const resourceIndex = id && resources.findIndex(item => item[idAttr] === id);
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
    // These are the actual resources that the server sends back.
    resources: [],
    // This is metadata about _specific_ resources. For instance, if a DELETE
    // is in flight for a book with ID 24, then you could find that here.
    resourcesMeta: {},
    // This is metadata about the entire collection of resources. For instance,
    // on page load, you might fetch all of the resources. The XHR status for
    // that request would live here.
    resourcesListMeta: {}
  };
}
