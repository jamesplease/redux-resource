// Insert a new resource or update an existing resource.
export default function upsertResource({resources, resource, id, replace}) {
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
