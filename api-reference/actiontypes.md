# actionTypes

An object of Redux [action types](http://redux.js.org/docs/basics/Actions.html) that the [resource reducer](resourcereducer.md) responds to. Dispatch these from action creators to change the state of your store.

The complete object is shown below:

```javascript
{
  // Update resources, metadata, and lists synchronously
  UPDATE_RESOURCES: 'UPDATE_RESOURCES',
  // Remove resources from the store synchronously
  DELETE_RESOURCES: 'DELETE_RESOURCES',

  // The following action types are to support CRUD'ing resources
  // asynchronously using requests
  CREATE_RESOURCES_PENDING: 'CREATE_RESOURCES_PENDING',
  CREATE_RESOURCES_FAILED: 'CREATE_RESOURCES_FAILED',
  CREATE_RESOURCES_SUCCEEDED: 'CREATE_RESOURCES_SUCCEEDED',
  CREATE_RESOURCES_IDLE: 'CREATE_RESOURCES_IDLE',

  READ_RESOURCES_PENDING: 'READ_RESOURCES_PENDING',
  READ_RESOURCES_FAILED: 'READ_RESOURCES_FAILED',
  READ_RESOURCES_SUCCEEDED: 'READ_RESOURCES_SUCCEEDED',
  READ_RESOURCES_IDLE: 'READ_RESOURCES_IDLE',

  UPDATE_RESOURCES_PENDING: 'UPDATE_RESOURCES_PENDING',
  UPDATE_RESOURCES_FAILED: 'UPDATE_RESOURCES_FAILED',
  UPDATE_RESOURCES_SUCCEEDED: 'UPDATE_RESOURCES_SUCCEEDED',
  UPDATE_RESOURCES_IDLE: 'UPDATE_RESOURCES_IDLE',

  DELETE_RESOURCES_PENDING: 'DELETE_RESOURCES_PENDING',
  DELETE_RESOURCES_FAILED: 'DELETE_RESOURCES_FAILED',
  DELETE_RESOURCES_SUCCEEDED: 'DELETE_RESOURCES_SUCCEEDED',
  DELETE_RESOURCES_IDLE: 'DELETE_RESOURCES_IDLE',
}
```

### Notes

The action types can be organized into two groups:

* Direct manipulation of the store. `UPDATE_RESOURCES` and `DELETE_RESOURCES` allow you to synchronously modify the store, independent of requests.
* The rest of the action types are for requests. Within the request action types, there are four groups of action types, one for each of the four [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) actions. Within each CRUD action "group," the four action types reflect the four request statuses.

## Reserved Action Types

An upcoming version of Redux Resource will utilize four new action types to simplify the request action types. Accordingly, these action types have been reserved, and we do not recommend that you use them in your application. The list of reserved action types is:

```text
REQUEST_IDLE
REQUEST_PENDING
REQUEST_FAILED
REQUEST_SUCCEEDED
```

> Note: A warning will be logged to the console if you dispatch an action with one of these action types in your application.

### Example

This example shows an action creator that reads a single book. It uses the [redux-thunk](https://github.com/gaearon/redux-thunk) middleware and the library [xhr](https://github.com/naugtur/xhr) for making requests.

```javascript
import { actionTypes } from 'redux-resource';
import xhr from 'xhr';

export default function readBook(bookId) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.READ_RESOURCES_PENDING,
      resourceType: 'books'
      resources: [bookId]
    });

    const req = xhr.get(`/books/${bookId}`, {json: true}, (err, res) => {
      if (req.aborted) {
        dispatch({
          type: actionTypes.READ_RESOURCES_IDLE,
          resourceType: 'books',
          resources: [bookId]
        });
      } else if (err || res.statusCode >= 400) {
        dispatch({
          type: actionTypes.READ_RESOURCES_FAILED,
          resourceType: 'books',
          resources: [bookId]
        });
      } else {
        dispatch({
          type: actionTypes.READ_RESOURCES_SUCCEEDED,
          resourceType: 'books',
          resources: [res.body]
        });
      }
    });

    return req;
  }
}
```

### Tips

* The `{crudAction}_RESOURCES_IDLE` action type is useful anytime that you want to "reset" the status of a request. One use case for this is when a request is aborted. Another use case would be for an alert that displays whenever a request is in a failed state. When the user dismisses the alert, you might trigger this action type to 'reset' the request status back to `IDLE`, which would then hide the alert.

  You may not always use this action type, and that's fine. But it's here if you do need it.

