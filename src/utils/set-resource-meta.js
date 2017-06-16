// Update the meta for `resources`
export default function setResourceMeta(options) {
  const {
    resources, newMeta, meta, mergeMeta,
    initialResourceMeta = {}
  } = options;
  let mergeMetaOption = typeof mergeMeta !== 'undefined' ? mergeMeta : true;
  const next = {...meta};

  if (!(resources && resources.length)) {
    return next;
  }

  resources.forEach((resource) => {
    const id = typeof resource === 'object' ? resource.id : resource;
    const currentMeta = next[id] || initialResourceMeta;
    const baseMeta = mergeMetaOption ? currentMeta : initialResourceMeta;

    next[id] = {
      ...baseMeta,
      ...newMeta
    };
  });

  return next;
}
