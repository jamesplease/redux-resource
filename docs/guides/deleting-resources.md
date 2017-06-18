# Deleting Resources

Resourceful Redux provides four [action types](./faq/action-types.md) for
deleting resources. They are as follows:

```js
"DELETE_RESOURCES_PENDING"
"DELETE_RESOURCES_FAILED"
"DELETE_RESOURCES_SUCCEEDED"
"DELETE_RESOURCES_NULL"
```

Each request will always begin with an action with type
`DELETE_RESOURCES_PENDING`. Then, one of the other three action types will be
used to represent the resolution of that request. Use the requests in the
following way:

- `DELETE_RESOURCES_FAILED`: Use this if the request fails for any reason. This
  could be network errors, or any
  [HTTP Status Code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
  greater than 400.
- `DELETE_RESOURCES_NULL`: Use this is the request is aborted.
- `DELETE_RESOURCES_SUCCEEDED`: Use this when the request was successful.

### Using Labels

Because you usually know the ID of the resources that you're deleting, you
typically don't need to use labels for delete operations. The metadata for the
delete request can just be stored on the resource metadata directly.

### Successful Deletes

When an action of type `DELETE_RESOURCES_SUCCEEDED` is dispatched, any resources
included in the action will be removed from the `resources` array of your state
tree. They will also be removed from the ID array of any label.

The meta for each of the resources will be reset to the default metadata,
except for `deleteStatus`, which will be set to `"SUCCEEDED"`.

> Note: Keep in mind that this means that a resource's metadata will never
  completely go away with the built-in reducers. If we handled this cleanup for
  you, then you would never get the successful status for delete requests!

> For most applications, this won't be a problem, and you can just leave the
  metadata in your state tree. If your application involves deleting many, many
  resources, you may want to write a [plugin](/docs/guides/plugins.md) to clear
  out old, unused metadata.

### Example Action Creator

This example shows an action creator to delete a single book. It uses the
[redux-thunk](https://github.com/gaearon/redux-thunk) middleware and the
library [xhr](https://github.com/naugtur/xhr) for making requests.

```js
import { actionTypes } from 'resourceful-redux';
import xhr from 'xhr';

export default function deleteBook(bookId) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.DELETE_RESOURCES_PENDING,
      resourceName: 'books',
      resources: [bookId]
    });

    const req = xhr.del(
      `/books/${bookId}`,
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.DELETE_RESOURCES_NULL,
            resourceName: 'books',
            resources: [bookId]
          });
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.DELETE_RESOURCES_FAILED,
            resourceName: 'books',
            resources: [bookId]
          });
        } else {
          dispatch({
            type: actionTypes.DELETE_RESOURCES_SUCCEEDED,
            resourceName: 'books',
            resources: [bookId]
          });
        }
      }
    );

    return req;
  }
}
```
