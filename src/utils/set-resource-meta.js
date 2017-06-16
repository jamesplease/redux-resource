// Update the meta for `resources`
export default function setResourceMeta({resources, newMeta, meta, mergeMeta}) {
  let mergeMetaOption = typeof mergeMeta !== 'undefined' ? mergeMeta : true;
  const next = {...meta};

  if (!(resources && resources.length)) {
    return next;
  }

  resources.forEach((resource) => {
    const id = typeof resource === 'object' ? resource.id : resource;
    const current = mergeMetaOption ? next[id] : {};
    next[id] = {
      ...current,
      ...newMeta
    };
  });

  return next;
}
