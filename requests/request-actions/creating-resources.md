# Creating Resources

Redux Resource provides four [action types](./) for creating resources asynchronously. They are:

```javascript
"CREATE_RESOURCES_PENDING"
"CREATE_RESOURCES_FAILED"
"CREATE_RESOURCES_SUCCEEDED"
"CREATE_RESOURCES_IDLE"
```

Each request will always begin with an action with type `CREATE_RESOURCES_PENDING`. Then, one of the other three action types will be used to represent the resolution of that request. Use the other action types in the following way:

* `CREATE_RESOURCES_FAILED`: Use this if the request fails for any reason. This

  could be network errors, or any

  [HTTP Status Code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

  greater than or equal to 400.

* `CREATE_RESOURCES_IDLE`: Use this when the request is aborted.
* `CREATE_RESOURCES_SUCCEEDED`: Use this when the request was successful.

## Request Objects

Specifying a [request key](https://github.com/jamesplease/redux-resource/tree/9ec75169fbfdce22b9e69697a049704cb4f3998a/docs/requests/requests/request-keys.md) on the actions will create a request object in the store for this request. This object can be used to look up the [status](https://github.com/jamesplease/redux-resource/tree/9ec75169fbfdce22b9e69697a049704cb4f3998a/docs/requests/requests/request-statuses.md) of the request.

For many create requests, you don't have the ID of the resource being created until after the operation succeeds. Therefore, to track the status of the request, you will need to specify the request key so that the status can be stored on the request object.

Many interfaces only allow one creation request at a time \(although that request may be for a bulk creation\). In these situations, you can just use a single request key, such as `"create"`, for all of your creation requests.

## Successful Creates

When an action of type `CREATE_RESOURCES_SUCCEEDED` is dispatched, three things will happen:

1. the resources included in the action's `resources` will be added to the `resources` section of the resource slice. Existing resources with the same ID will be merged with the new ones. To replace existing resources, rather than merge them, specify `mergeResources: false` on the action.
2. The metadata for each of the `resources` specified on the action will be updated with `createStatus: 'SUCCEEDED'`. To replace all of the existing meta, rather than merging it, specify `mergeMeta: false` on the action.
3. When a `list` is passed, the IDs from the `resources` array on the action will added to the list. You may specify `mergeListIds: false` to _replace_ the existing list instead.

## Redux Resource XHR

[Redux Resource XHR](../../ecosystem-extras/redux-resource-xhr.md) provides an action creator that simplifies making CRUD requests. If you'd like to build your own, then that's fine, too. The example below may help.

## Example Action Creator

This example shows an action creator to create a single book. It uses the [redux-thunk](https://github.com/gaearon/redux-thunk) middleware and the library [xhr](https://github.com/naugtur/xhr) for making requests.

```javascript
import { actionTypes } from 'redux-resource';
import xhr from 'xhr';

export default function createBook(bookDetails) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.CREATE_RESOURCES_PENDING,
      resourceType: 'books',
      requestKey: 'create',
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
            resourceType: 'books',
            requestKey: 'create',
          });
        } else if (err || res.statusCode >= 400) {
          dispatch({
            type: actionTypes.CREATE_RESOURCES_FAILED,
            resourceType: 'books',
            requestKey: 'create',
            requestProperties: {
              statusCode: res.statusCode 
            }
          });
        } else {
          dispatch({
            type: actionTypes.CREATE_RESOURCES_SUCCEEDED,
            resourceType: 'books',
            requestKey: 'create',
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

