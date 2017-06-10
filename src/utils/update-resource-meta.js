// Updates a single resource's metadata
export default function updateResourceMeta({meta, newMeta, id, replace}) {
  const existingMeta = replace ? {} : meta[id];
  return {
    // Shallow clone the current meta
    ...meta,
    // Update the key that is the "id" of the resource
    [id]: {
      // Shallow clone the existing metadata for this resource
      ...existingMeta,
      // Shallow clone the passed-in metadata
      ...newMeta
    }
  };
}
