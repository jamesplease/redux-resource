// Add or update resources
export default function upsertResources(resources, newResources, mergeResources) {
  const shallowClone = Array.prototype.slice.call(resources);

  newResources.forEach(resource => {
    const resourceIsObject = typeof resource === 'object';
    const id = resourceIsObject ? resource.id : resource;
    const resourceObj = resourceIsObject ? resource : {id: resource};
    const resourceIndex = id && resources.findIndex(item => item.id === id);

    if (!id || resourceIndex === -1) {
      return shallowClone.push(resourceObj);
    }

    let resourceToInsert;
    if (mergeResources) {
      const currentResource = shallowClone[resourceIndex];
      let newResource;
      if (resourceIsObject) {
        resourceToInsert = {
          ...currentResource,
          ...newResource
        };
      } else {
        resourceToInsert = {...currentResource};
      }
    } else {
      resourceToInsert = resourceObj;
    }

    shallowClone.splice(resourceIndex, 1, resourceToInsert);
  });

  return shallowClone;
}
