// Update the meta for `resources`
export default function setResourceMeta({resources, newMeta, meta, mergeMeta}) {
  const next = {...meta};

  if (!(resources && resources.length)) {
    return next;
  }

  resources.forEach((resource) => {
    const id = typeof resource === 'object' ? resource.id : resource;
    const current = mergeMeta ? next[id] : {};
    next[id] = {
      ...current,
      ...newMeta
    };
  });

  return next;
}
