# Updating Resources

Redux Resource provides four [action types](./faq/action-types.md) for
updating resources. They are as follows:

```js
"UPDATE_RESOURCES_PENDING"
"UPDATE_RESOURCES_FAILED"
"UPDATE_RESOURCES_SUCCEEDED"
"UPDATE_RESOURCES_IDLE"
```

Each request will always begin with an action with type
`UPDATE_RESOURCES_PENDING`. Then, one of the other three action types will be
used to represent the resolution of that request. Use the requests in the
following way:

- `UPDATE_RESOURCES_FAILED`: Use this if the request fails for any reason. This
  could be network errors, or any
  [HTTP Status Code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
  greater than 400.
- `UPDATE_RESOURCES_IDLE`: Use this is the request is aborted.
- `UPDATE_RESOURCES_SUCCEEDED`: Use this when the request was successful.

### Using Named Requests

For most applications, named requests won't be necessary for updates. This is because
you typically know the IDs of the resources that you're updating, so you can
just track the requests on the resource's metadata directly.

### Successful Updates

When an action of type `UPDATE_RESOURCES_SUCCEEDED` is dispatched, the
reducer will update any of the resources in your state tree with the ones
included in the action's `resources`.

The metadata for each of those resources will also be changed to have
`readStatus: 'SUCCEEDED'`.

If a `list` is passed, then the IDs for the list will be updated to include
the new IDs.

### Redux Resource XHR

[Redux Resource XHR](/docs/extras/redux-resource-xhr.md) 
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
      resourceName: 'books',
      // You can pass either the whole `bookDetails`, or just the ID. Both work.
      // Just be sure to pass the whole object on success, so that the updated
      // attributes are persisted to your state tree!
      resources: [bookDetails.id]
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
            resourceName: 'books',
            resources: [bookDetails.id]
          });
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.UPDATE_RESOURCES_FAILED,
            resourceName: 'books',
            resources: [bookDetails.id]
          });
        } else {
          dispatch({
            type: actionTypes.UPDATE_RESOURCES_SUCCEEDED,
            resourceName: 'books',
            resources: [body]
          });
        }
      }
    );

    return req;
  }
}
```
