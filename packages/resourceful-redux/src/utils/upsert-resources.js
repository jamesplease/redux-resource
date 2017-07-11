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
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          `You attempted to update or add a resource without an ID attribute. ` +
          `Resourceful Redux requires that all resources have an ID. You should ` +
          `double-check your Action Creators to make sure that all entries in ` +
          `are either an ID or an object with an "id" attribute.`
        );
      }

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
