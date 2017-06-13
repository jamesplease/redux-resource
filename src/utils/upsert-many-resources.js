// Similar to `upsertResource`, but for many resources.
export default function upsertManyResources({resources, newResources, replace}) {
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
