# Modifying Resources

There are two ways to modify resources in the store: synchronously and asynchronously. There are
different action types for each approach.

If you are modifying the resource by making a network request, then you should use the asynchronous
actions. If you are modifying resource information due to some local action, then you should use
the synchronous actions.

### Synchronous Actions

There are two action types for modifying resources synchronously:

- `UPDATE_RESOURCES`: Create or update resources, meta, and/or lists
- `DELETE_RESOURCES`: Delete resources from the resource slice. Deleting resources also
  removes them from any lists that they are in.

One use case for the synchronous actions is for managing client-side lists
of resources. If a user can select or deselect resources in your interface, then you might
use `UPDATE_RESOURCES` to update the list representing their selection.

##### Creating or Updating Resources

The `UPDATE_RESOURCES` action type is for updating resource information in the store. This action type
allows you to update resources across multiple slices at the same time.

You can pass the following properties to this action:

- `resources`: An object of resource types to be updated. Here is an example action that updates
  the books and authors slices at the same time:

  ```js
  {
    type: actionTypes.UPDATE_RESOURCES,
    resources: {
      books: {
        24: {
          title: 'The Hobbit
        }
      },
      authors: {
        1: {
          name: 'J.R.R. Tolkien'
        }
      }
    }
  }
  ```

- `meta`: Similar to `resources`, but for metadata instead of the primary resource attributes. This
  example updates the metadata for a few resources:

  ```js
  {
    type: actionTypes.UPDATE_RESOURCES,
    meta: {
      books: {
        24: { selected: true },
        101: { selected: true },
        150: { selected: true },
      },
      authors: {
        15: { selected: false }
      }
    }
  }
  ```

- `lists`: Adds new lists, or replaces existing lists. Note that it is not possible to specify that the
  lists that you pass in be merged with an existing list. This is because the list order is sometimes
  significant, and you are responsible for maintaining the proper order.

  ```js
  {
    type: actionTypes.UPDATE_RESOURCES,
    lists: {
      books: {
        selected: [1, 50, 2120]
      }
    }
  }
  ```

- `mergeResources`: When `true`, the new resources data that you pass will be shallowly merged with
  existing resource entries. Passing `false` will replace the existing resource with the new data
  that you pass. If you pass a Boolean, then it will apply to every resource slice. You can also
  pass an object to scope the value to a specific slice.

  Defaults to `true`.

  ```js
  {
    type: actionTypes.UPDATE_RESOURCES,
    mergeResources: {
      books: false
    }
    // Note: you can also pass `mergeREsources: false` to apply it to every resource type.
  }
  ```

- `mergeMeta`: Like `mergeResources`, but for metadata instead.

  Defaults to `true`.

  ```js
  {
    type: actionTypes.UPDATE_RESOURCES,
    mergeMeta: {
      books: false
    }
    // Note: you can also pass `mergeMeta: false` to apply it to every resource type.
  }
  ```

##### Deleting Resources

The `DELETE_RESOURCES` action type is used for removing resources from the store. 

You can pass the following properties to this action:

- `resources`: An object of resource types. Within each type, you can specify an array of
  resources to delete. Here is an example action that deletes a few books:

  ```js
  {
    type: actionTypes.DELETE_RESOURCES,
    resources: {
      books: [1, 20, 54],
    }
  }
  ```

  - `meta`: Metadata to **add** to the resources. This can be used to store client-side
    information about the deletion.

  ```js
  {
    type: actionTypes.DELETE_RESOURCES,
    resources: {
      books: [1]
    },
    meta: {
      books: {
        1: {
          deletionReason: 'duplicate'
        }
      }
    }
  }
  ```

When resources are deleted, they will be removed from all of the lists in the store as well..

### Asynchronous Actions

Resources are frequently modified as a result of network requests, which are asynchronous.

With Redux Resource, these operations are represented using objects called Requests. Requests are
covered in detail in the next section of these guides. If you want to read about them now, then follow
[this link](/docs/requests/request-objects.md).
