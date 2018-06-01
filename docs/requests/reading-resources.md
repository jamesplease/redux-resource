# Reading Resources

Redux Resource provides four [action types](./request-actions.md) for
reading resources asynchronously. They are:

```js
"READ_RESOURCES_PENDING"
"READ_RESOURCES_FAILED"
"READ_RESOURCES_SUCCEEDED"
"READ_RESOURCES_IDLE"
```

Each request will always begin with an action with type
`READ_RESOURCES_PENDING`. Then, one of the other three action types will be
used to represent the resolution of that request. Use the other action types in the
following way:

- `READ_RESOURCES_FAILED`: Use this if the request fails for any reason. This
  could be network errors, or any
  [HTTP Status Code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
  greater than or equal to 400.
- `READ_RESOURCES_IDLE`: Use this when the request is aborted.
- `READ_RESOURCES_SUCCEEDED`: Use this when the request was successful.

### Request Objects

Specifying a [request key](requests/request-keys.md) on the actions will create a
request object in the store for this request. This object can be used to look up
the [status](requests/request-statuses.md) of the request.

Although it is recommended that you specify a request key when possible, there are some
situations when you may not need to when fetching resources.

When fetching a single resource, you typically provide the ID to be fetched. Therefore,
[request objects](requests/request-objects.md) aren't always necessary, as you can
track the request on the resource's metadata directly.

For read requests that return multiple resources, it is typically preferable to specify
a request key.

### Successful Reads

When an action of type `READ_RESOURCES_SUCCEEDED` is dispatched, three things
will happen:

1. the resources included in the action's `resources` will be added to the
  `resources` section of the resource slice. Existing resources with the same ID
  will be merged with the new ones. To replace existing resources, rather than
  merge them, specify `mergeResources: false` on the action.

2. The metadata for each of the `resources` specified on the action will be updated
  with  `readStatus: 'SUCCEEDED'`. To replace all of the existing meta, rather than
  merging it, specify `mergeMeta: false` on the action.

3. When a `list` is passed, the IDs from the `resources` array on the action will
  added to the list. You may specify `mergeListIds: false` to _replace_ the existing
  list instead.

### Redux Resource XHR

[Redux Resource XHR](../extras/redux-resource-xhr.md) 
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
      resourceType: 'books',
      resources: [bookId],
    });

    const req = xhr.get(
      `/books/${bookId}`,
      {json: true},
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.READ_RESOURCES_IDLE,
            resourceType: 'books',
            resources: [bookId],
          });
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.READ_RESOURCES_FAILED,
            resourceType: 'books',
            resources: [bookId],
            requestProperties: {
              statusCode: res.statusCode 
            }
          });
        } else {
          dispatch({
            type: actionTypes.READ_RESOURCES_SUCCEEDED,
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
      resourceType: 'books',
      requestKey: 'search',
      requestProperties: {
        statusCode: null
      }
    });

    const queryString = qs.stringify(query);

    const req = xhr.get(
      `/books?${queryString}`,
      {json: true},
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.READ_RESOURCES_IDLE,
            resourceType: 'books',
            requestKey: 'search',
            requestProperties: {
              statusCode: null
            }
          });
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.READ_RESOURCES_FAILED,
            resourceType: 'books',
            requestKey: 'search',
            requestProperties: {
              statusCode: res.statusCode 
            }
          });
        } else {
          dispatch({
            type: actionTypes.READ_RESOURCES_SUCCEEDED,
            resourceType: 'books',
            requestKey: 'search',
            resources: body,
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
