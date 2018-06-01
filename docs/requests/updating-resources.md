# Updating Resources

Redux Resource provides four [action types](./request-actions.md) for
updating resources asynchronously. They are:

```js
"UPDATE_RESOURCES_PENDING"
"UPDATE_RESOURCES_FAILED"
"UPDATE_RESOURCES_SUCCEEDED"
"UPDATE_RESOURCES_IDLE"
```

Each request will always begin with an action with type
`UPDATE_RESOURCES_PENDING`. Then, one of the other three action types will be
used to represent the resolution of that request. Use the other action types in the
following way:

- `UPDATE_RESOURCES_FAILED`: Use this if the request fails for any reason. This
  could be network errors, or any
  [HTTP Status Code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
  greater than or equal to 400.
- `UPDATE_RESOURCES_IDLE`: Use this when the request is aborted.
- `UPDATE_RESOURCES_SUCCEEDED`: Use this when the request was successful.

### Request Objects

Specifying a [request key](requests/request-keys.md) on the actions will create a
request object in the store for this request. This object can be used to look up
the [status](requests/request-statuses.md) of the request.

Although it is recommended that you specify a request key whenever possible, there are some
situations when you may not need to when updating resources.

For updates that target a single resource, you typically know the ID being updated upfront.
Accordingly, you could use the resource metadata to track the status.

For update requests that return multiple resources, it is typically preferable to specify a
request key.

### Successful Updates

When an action of type `UPDATE_RESOURCES_SUCCEEDED` is dispatched, three things
will happen:

1. the resources included in the action's `resources` will be added to the
  `resources` section of the resource slice. Existing resources with the same ID
  will be merged with the new ones. To replace existing resources, rather than
  merge them, specify `mergeResources: false` on the action.

2. The metadata for each of the `resources` specified on the action will be updated
  with  `updateStatus: 'SUCCEEDED'`. To replace all of the existing meta, rather than
  merging it, specify `mergeMeta: false` on the action.

3. When a `list` is passed, the IDs from the `resources` array on the action will
  added to the list. You may specify `mergeListIds: false` to _replace_ the existing
  list instead.

### Redux Resource XHR

[Redux Resource XHR](../extras/redux-resource-xhr.md) 
provides an action creator that simplifies making CRUD requests. If you'd like to
build your own, then that's fine, too. The example below may help.

### Example Action Creator

This example shows an action creator to update a single book. It uses the
[redux-thunk](https://github.com/gaearon/redux-thunk) middleware and the
library [xhr](https://github.com/naugtur/xhr) for making requests.

```js
import { actionTypes } from 'redux-resource';
import xhr from 'xhr';

// `bookDetails` could have the following shape:
//
// {
//   id: 23,
//   published: true
// }
//
export default function updateBook(bookDetails) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.UPDATE_RESOURCES_PENDING,
      resourceType: 'books',
      // You can pass either the whole `bookDetails`, or just the ID. Both work.
      // Just be sure to pass the whole object on success, so that the updated
      // attributes are persisted to your state tree!
      resources: [bookDetails.id],
    });

    const req = xhr.patch(
      `/books/${bookDetails.id}`,
      {
        json: bookDetails
      },
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.UPDATE_RESOURCES_IDLE,
            resourceType: 'books',
            resources: [bookDetails.id],
          });
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.UPDATE_RESOURCES_FAILED,
            resourceType: 'books',
            resources: [bookDetails.id],
            requestProperties: {
              statusCode: res.statusCode 
            }
          });
        } else {
          dispatch({
            type: actionTypes.UPDATE_RESOURCES_SUCCEEDED,
            resourceType: 'books',
            resources: [body],
            requestProperties: {
              statusCode: res.statusCode 
            }
          });
        }
      }
    );

    return req;
  }
}
```
