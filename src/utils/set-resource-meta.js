// Similar to `updateResourceMeta`, but it accepts an array of IDs instead of
// a single ID. Used for bulk updating meta.
export default function setResourceMeta({meta, newMeta, ids, replace}) {
  const next = replace ? {} : {...meta};

  ids.forEach((id) => {
    const current = next[id];
    next[id] = {
      ...current,
      ...newMeta
    };
  });

  return next;
}
