// Add or update meta
export default function upsertMeta(meta, newMeta, mergeMeta) {
  if (!newMeta) {
    return meta;
  }

  const mergeMetaOption = typeof mergeMeta !== 'undefined' ? mergeMeta : true;
  const shallowClone = Object.assign({}, meta);

  for (let id in newMeta) {
    const resource = newMeta[id];

    const resourceAlreadyExists = Boolean(meta[id]);

    // If there is no existing resource, we just add it to the meta object
    if (!resourceAlreadyExists) {
      shallowClone[id] = resource;
      continue;
    }

    let resourceToInsert;
    if (mergeMetaOption) {
      const currentResource = shallowClone[id];
      resourceToInsert = Object.assign({}, currentResource, resource);
    } else {
      resourceToInsert = resource;
    }

    shallowClone[id] = resourceToInsert;
  }

  return shallowClone;
}
