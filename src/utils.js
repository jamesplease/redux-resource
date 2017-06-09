// These are statuses for in-flight requests. If a request has no status
// associated with it, then it would have a status of `NULL`.
export const xhrStatuses = {
  PENDING: 'PENDING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  NULL: 'NULL'
};

// Updates a single resource's metadata
export function updateResourceMeta({resourceMeta, newMeta, id, replace}) {
  const existingMeta = replace ? {} : resourceMeta[id];
  return {
    // Shallow clone the current resourceMeta
    ...resourceMeta,
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
export function updateManyResourceMetas({resourceMeta, newMeta, ids, replace}) {
  const next = replace ? {} : {...resourceMeta};

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
export function upsertResource({resources, resource, id, idAttribute, replace}) {
  // Attempt to find the resource by its ID. If the ID doesn't exist, or if
  // no resource by that ID exists, then we append it to the end as a new
  // resource.
  const resourceIndex = id && resources.findIndex(item => item[idAttribute] === id);
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
export function upsertManyResources({resources, newResources, idAttribute, replace}) {
  const shallowClone = replace ? [] : Array.prototype.slice.call(resources);

  newResources.forEach(resource => {
    const id = resource[idAttribute];
    const resourceIndex = id && resources.findIndex(item => item[idAttribute] === id);

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
  updateXhrStatus: xhrStatuses.NULL,
  // The status of any existing request to fetch this resource
  readXhrStatus: xhrStatuses.NULL,
  // The status of an any existing request to delete this resource. Note that
  // this will never be "SUCCEEDED," as a successful delete removes the
  // resource from the store.
  deleteXhrStatus: xhrStatuses.NULL
};

export function snakeCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1_$2$3')
    .toLowerCase();
}

export function generateDefaultInitialState() {
  return {
    // These are the actual resources that the server sends back.
    resources: [],
    // This is metadata about _specific_ resources. For instance, if a DELETE
    // is in flight for a book with ID 24, then you could find that here.
    resourceMeta: {},
    // This is metadata about the entire collection of resources. For instance,
    // on page load, you might fetch all of the resources. The XHR status for
    // that request would live here.
    resourceListMeta: {
      readXhrStatus: xhrStatuses.NULL,
      createXhrStatus: xhrStatuses.NULL,
      createManyXhrStatus: xhrStatuses.NULL
    }
  };
}
