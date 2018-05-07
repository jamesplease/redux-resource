# Deleting Resources

Redux Resource provides four [action types](./) for deleting resources asynchronously. They are:

```javascript
"DELETE_RESOURCES_PENDING"
"DELETE_RESOURCES_FAILED"
"DELETE_RESOURCES_SUCCEEDED"
"DELETE_RESOURCES_IDLE"
```

Each request will always begin with an action with type `DELETE_RESOURCES_PENDING`. Then, one of the other three action types will be used to represent the resolution of that request. Use the other action types in the following way:

* `DELETE_RESOURCES_FAILED`: Use this if the request fails for any reason. This

  could be network errors, or any

  [HTTP Status Code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

  greater than or equal to 400.

* `DELETE_RESOURCES_IDLE`: Use this when the request is aborted.
* `DELETE_RESOURCES_SUCCEEDED`: Use this when the request was successful.

## Request Objects

Specifying a [request key](https://github.com/jamesplease/redux-resource/tree/9ec75169fbfdce22b9e69697a049704cb4f3998a/docs/requests/requests/request-keys.md) on the actions will create a request object in the store for this request. This object can be used to look up the [status](https://github.com/jamesplease/redux-resource/tree/9ec75169fbfdce22b9e69697a049704cb4f3998a/docs/requests/requests/request-statuses.md) of the request.

Although it is recommended that you specify a request key whenever possible, there are some situations when you may not need to when deleting resources.

Because you usually know the ID of the resources that you're deleting, you may not need to specify a request key for delete operations. The metadata for the delete request can just be stored on the resource metadata directly.

For delete requests that affect multiple resources, it is typically preferable to specify a request key.

## Successful Deletes

When an action of type `DELETE_RESOURCES_SUCCEEDED` is dispatched, three things will happen:

1. The `resources` included in the action will be replaced with `null` in the `resources` section of your resource slice.
2. The `resources` included in the action will be removed from all lists in the resource slice.
3. The value of `deleteStatus` will be set to `"SUCCEEDED"`. All other meta values will be set to the default meta for that resource slice.

## Redux Resource XHR

[Redux Resource XHR](../../ecosystem-extras/redux-resource-xhr.md) provides an action creator that simplifies making CRUD requests. If you'd like to build your own, then that's fine, too. The example below may help.

## Example Action Creator

This example shows an action creator to delete a single book. It uses the [redux-thunk](https://github.com/gaearon/redux-thunk) middleware and the library [xhr](https://github.com/naugtur/xhr) for making requests.

```javascript
import { actionTypes } from 'redux-resource';
import xhr from 'xhr';

export default function deleteBook(bookId) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.DELETE_RESOURCES_PENDING,
      resourceType: 'books',
      resources: [bookId],
    });

    const req = xhr.del(
      `/books/${bookId}`,
      (err, res, body) => {
        if (req.aborted) {
          dispatch({
            type: actionTypes.DELETE_RESOURCES_IDLE,
            resourceType: 'books',
            resources: [bookId],
          });
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.DELETE_RESOURCES_FAILED,
            resourceType: 'books',
            resources: [bookId],
            requestProperties: {
              statusCode: res.statusCode 
            }
          });
        } else {
          dispatch({
            type: actionTypes.DELETE_RESOURCES_SUCCEEDED,
            resourceType: 'books',
            resources: [bookId],
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

