// These are statuses for in-flight requests. If a request has no status
// associated with it, then it would have a status of `NULL`.
export const requestStatuses = {
  PENDING: 'PENDING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  NULL: 'NULL'
};

// Updates a single resource's metadata
export function updateResourceMeta({meta, newMeta, id, replace}) {
  const existingMeta = replace ? {} : meta[id];
  return {
    // Shallow clone the current meta
    ...meta,
    // Update the key that is the "id" of the resource
    [id]: {
      // Shallow clone the existing metadata for this resource
      ...existingMeta,
      // Shallow clone the passed-in metadata
      ...newMeta
    }
  };
}

// Similar to `updateResourceMeta`, but it accepts an array of IDs instead of
// a single ID. Used for bulk updating meta.
export function updateManyResourceMetas({meta, newMeta, ids, replace}) {
  const next = replace ? {} : {...meta};

  ids.forEach((id) => {
    const current = next[id];
    next[id] = {
      ...current,
      ...newMeta
    };
  });

  return next;
}

// Insert a new resource or update an existing resource.
export function upsertResource({resources, resource, id, replace}) {
  // Attempt to find the resource by its ID. If the ID doesn't exist, or if
  // no resource by that ID exists, then we append it to the end as a new
  // resource.
  const resourceIndex = id && resources.findIndex(item => item.id === id);
  const shallowClone = Array.prototype.slice.call(resources);
  if (!id || resourceIndex === -1) {
    shallowClone.push(resource);
    return shallowClone;
  }

  let resourceToInsert;
  if (!replace) {
    const currentResource = shallowClone[resourceIndex];
    resourceToInsert = {
      ...currentResource,
      ...resource
    };
  } else {
    resourceToInsert = resource;
  }

  // Otherwise, it does exist and we add it to the list at the appropriate
  // location
  shallowClone.splice(resourceIndex, 1, resourceToInsert);
  return shallowClone;
}

// Similar to `upsertResource`, but for many resources.
export function upsertManyResources({resources, newResources, replace}) {
  const shallowClone = replace ? [] : Array.prototype.slice.call(resources);

  newResources.forEach(resource => {
    const id = resource.id;
    const resourceIndex = id && resources.findIndex(item => item.id === id);

    if (!id || resourceIndex === -1) {
      return shallowClone.push(resource);
    }

    let resourceToInsert;
    if (!replace) {
      const currentResource = shallowClone[resourceIndex];
      resourceToInsert = {
        ...currentResource,
        ...resource
      };
    } else {
      resourceToInsert = resource;
    }

    shallowClone.splice(resourceIndex, 1, resourceToInsert);
  });

  return shallowClone;
}

export const initialResourceMetaState = {
  // The status of any existing request to update this resource
  updateStatus: requestStatuses.NULL,
  // The status of any existing request to fetch this resource
  readStatus: requestStatuses.NULL,
  // The status of an any existing request to delete this resource. Note that
  // this will never be "SUCCEEDED," as a successful delete removes the
  // resource from the store.
  deleteStatus: requestStatuses.NULL
};

export function generateDefaultInitialState() {
  return {
    // These are the actual resources that the server sends back.
    resources: [],
    // This is metadata about _specific_ resources. For instance, if a DELETE
    // is in flight for a book with ID 24, then you could find that here.
    meta: {},
    // This is metadata about the entire collection of resources. For instance,
    // on page load, you might fetch all of the resources. The XHR status for
    // that request would live here.
    listMeta: {
      readStatus: requestStatuses.NULL,
      createStatus: requestStatuses.NULL,
      createManyStatus: requestStatuses.NULL
    }
  };
}
