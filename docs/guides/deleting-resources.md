# Deleting Resources

resourceful-redux provides four [action types](./faq/action-types.md) for
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
