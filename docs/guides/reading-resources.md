# Reading Resources

Redux Resource provides four [action types](./faq/action-types.md) for
reading resources. They are as follows:

```js
"READ_RESOURCES_PENDING"
"READ_RESOURCES_FAILED"
"READ_RESOURCES_SUCCEEDED"
"READ_RESOURCES_IDLE"
```

Each request will always begin with an action with type
`READ_RESOURCES_PENDING`. Then, one of the other three action types will be
used to represent the resolution of that request. Use the requests in the
following way:

- `READ_RESOURCES_FAILED`: Use this if the request fails for any reason. This
  could be network errors, or any
  [HTTP Status Code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
  greater than 400.
- `READ_RESOURCES_IDLE`: Use this is the request is aborted.
- `READ_RESOURCES_SUCCEEDED`: Use this when the request was successful.

### Using Named Requests

When reading a single resource, you usually use an ID to read it. Therefore,
named requests aren't usually needed for single reads, as you can track the
request on the resource's metadata directly.

For bulk reads, you sometimes use some sort of filter or query to retrieve a
list of resources. In these situations, it's often a good idea to use a named
request to keep track of the request.

### Successful Reads

When an action of type `READ_RESOURCES_SUCCEEDED` is dispatched, the
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

### Example Action Creator: Reading One Resource

This example shows an action creator to read a single book. It uses the
[redux-thunk](https://github.com/gaearon/redux-thunk) middleware and the
library [xhr](https://github.com/naugtur/xhr) for making requests.

```js
import { actionTypes } from 'redux-resource';
import xhr from 'xhr';

export default function readBook(bookId) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.READ_RESOURCES_PENDING,
      resourceName: 'books',
      resources: [bookId]
    });

    const req = xhr.get(
      `/books/${bookId}`,
      {json: true},
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.READ_RESOURCES_IDLE,
            resourceName: 'books',
            resources: [bookId]
          });
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.READ_RESOURCES_FAILED,
            resourceName: 'books',
            resources: [bookId]
          });
        } else {
          dispatch({
            type: actionTypes.READ_RESOURCES_SUCCEEDED,
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

### Example Action Creator: Reading Many Resource

This example shows an action creator to read multiple books. It uses the
[redux-thunk](https://github.com/gaearon/redux-thunk) middleware and the
library [xhr](https://github.com/naugtur/xhr) for making requests. To create
a query string, it uses the
[querystring module](https://github.com/Gozala/querystring).

```js
import { actionTypes } from 'redux-resource';
import xhr from 'xhr';
import qs from 'querystring';

export default function readBooks(query) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.READ_RESOURCES_PENDING,
      resourceName: 'books',
      request: 'search'
    });

    const queryString = qs.stringify(query);

    const req = xhr.get(
      `/books?${queryString}`,
      {json: true},
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.READ_RESOURCES_IDLE,
            resourceName: 'books',
            request: 'search'
          });
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.READ_RESOURCES_FAILED,
            resourceName: 'books',
            request: 'search'
          });
        } else {
          dispatch({
            type: actionTypes.READ_RESOURCES_SUCCEEDED,
            resourceName: 'books',
            request: 'search',
            resources: body
          });
        }
      }
    );

    return req;
  }
}
```
