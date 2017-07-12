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

    // If we have no ID for this resource, or if its not a number or string,
    // then we bail. This currently isn't logging so that we don't double-blast
    // the user with meta **and** attribute update problems. If the ID check
    // is moved into the success reducers directly, then we may be able to
    // remove these typeof checks for efficiency.
    if (!id || (typeof id !== 'string' && typeof id !== 'number')) {
      return;
    }

    const currentMeta = next[id];

    let startMeta;
    if (currentMeta) {
      startMeta = {
        ...initialResourceMeta,
        ...currentMeta
      };
    } else {
      startMeta = initialResourceMeta;
    }

    const baseMeta = mergeMetaOption ? startMeta : initialResourceMeta;

    next[id] = {
      ...baseMeta,
      ...newMeta
    };
  });

  return next;
}
