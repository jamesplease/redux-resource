# Creating Resources

Redux Resource provides four [action types](./faq/action-types.md) for
creating resources. They are as follows:

```js
"CREATE_RESOURCES_PENDING"
"CREATE_RESOURCES_FAILED"
"CREATE_RESOURCES_SUCCEEDED"
"CREATE_RESOURCES_IDLE"
```

Each request will always begin with an action with type
`CREATE_RESOURCES_PENDING`. Then, one of the other three action types will be
used to represent the resolution of that request. Use the requests in the
following way:

- `CREATE_RESOURCES_FAILED`: Use this if the request fails for any reason. This
  could be network errors, or any
  [HTTP Status Code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
  greater than 400.
- `CREATE_RESOURCES_IDLE`: Use this is the request is aborted.
- `CREATE_RESOURCES_SUCCEEDED`: Use this when the request was successful.

### Using Named Requests

For many create requests, you don't have the ID of the resource being created
until after the operation succeeds. Therefore, to track the status of the
request, you will need a named request.

Many interfaces only allow one creation request at a time (although that
request may be for a bulk creation). In these situations, you can just use a
single named request, such as `"create"`, for all of your creation requests.

### Successful Creates

When an action of type `CREATE_RESOURCES_SUCCEEDED` is dispatched, the
reducer will update any of the resources in your state tree with the ones
included in the action's `resources`.

The metadata for each of those resources will also be changed to have
`createStatus: 'SUCCEEDED'`.

If a `list` is passed, then the IDs for the list will be updated to include
the new IDs.

### Redux Resource XHR

[Redux Resource XHR](/docs/extras/redux-resource-xhr.md) 
provides an action creator that simplifies making CRUD requests. If you'd like to
build your own, then that's fine, too. The example below may help.

### Example Action Creator

This example shows an action creator to create a single book. It uses the
[redux-thunk](https://github.com/gaearon/redux-thunk) middleware and the
library [xhr](https://github.com/naugtur/xhr) for making requests.

```js
import { actionTypes } from 'redux-resource';
import xhr from 'xhr';

export default function createBook(bookDetails) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.CREATE_RESOURCES_PENDING,
      resourceName: 'books',
      request: 'create'
    });

    const req = xhr.post(
      '/books',
      {
        json: bookDetails
      },
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.CREATE_RESOURCES_IDLE,
            resourceName: 'books',
            request: 'create'
          });
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.CREATE_RESOURCES_FAILED,
            resourceName: 'books',
            request: 'create'
          });
        } else {
          dispatch({
            type: actionTypes.CREATE_RESOURCES_SUCCEEDED,
            resourceName: 'books',
            request: 'create',
            resources: [body]
          });
        }
      }
    );

    return req;
  }
}
```
