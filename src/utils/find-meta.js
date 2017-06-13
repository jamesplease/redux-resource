// Returns the meta object from `state` based on `metaLocation`.
// `metaLocation` describes where the meta is located. It can either be a string
// or an object.
// For instance,
//
// 'books' => returns the list meta for books
// 'books.42' => returns the resource meta for the book with ID 42
//
// Alternatively, you can specify an object for `metaLocation`:
//
// { resourceName: 'books' }
// { resourceName: 'books', id: 42 }
//
export default function findMeta(state, metaLocation) {
  let resourceName, resourceId;

  if (typeof metaLocation === 'string') {
    const splitPath = metaLocation.split('.');
    resourceName = splitPath[0];
    resourceId = splitPath[1];
  } else {
    resourceName = metaLocation.resourceName;
    resourceId = metaLocation.id;
  }

  if (!resourceName) {
    throw new Error('A resourceName is required.');
  }

  if (!resourceId) {
    return state[resourceName].listMeta;
  } else {
    return state[resourceName].meta[resourceId] || {};
  }
}
