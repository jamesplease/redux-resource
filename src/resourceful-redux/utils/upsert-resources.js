// Add or update resources
export default function upsertResources(resources, newResources, mergeResources) {
  if (!(newResources instanceof Array)) {
    return resources;
  }
  const mergeResourcesOption = typeof mergeResources !== 'undefined' ? mergeResources : true;
  const shallowClone = Object.assign({}, resources);
  newResources.forEach(resource => {
    const resourceIsObject = typeof resource === 'object';
    const id = resourceIsObject ? resource.id : resource;

    // If a resource doesn't have an ID, then it cannot be tracked
    if (!id) {
      return;
    }

    const resourceObj = resourceIsObject ? resource : {id: resource};

    const resourceAlreadyExists = Boolean(resources[id]);

    // If there is no existing resource, we just add it to the resources object
    if (!resourceAlreadyExists) {
      shallowClone[id] = resourceObj;
      return shallowClone;
    }

    let resourceToInsert;
    if (mergeResourcesOption) {
      const currentResource = shallowClone[id];
      resourceToInsert = Object.assign({}, currentResource, resourceObj);
    } else {
      resourceToInsert = resourceObj;
    }

    shallowClone[id] = resourceToInsert;
  });

  return shallowClone;
}
