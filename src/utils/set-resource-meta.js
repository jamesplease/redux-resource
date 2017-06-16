// Similar to `updateResourceMeta`, but it accepts an array of IDs instead of
// a single ID. Used for bulk updating meta.
export default function setResourceMeta({ids, newMeta, meta, mergeMeta}) {
  const next = {...meta};

  ids.forEach((id) => {
    const current = mergeMeta ? next[id] : {};
    next[id] = {
      ...current,
      ...newMeta
    };
  });

  return next;
}
