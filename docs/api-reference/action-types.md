# actionTypes

An object of Redux [action types](http://redux.js.org/docs/basics/Actions.html)
that the [resource reducer](resource-reducer.md) responds to. Dispatch these
from action creators to change the state of your store.

The complete object is shown below:

```js
{
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

#### Notes

There are four groups of action types, one for each of the four
[CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) actions.
Within each CRUD action, the four actions reflect the four request statuses.

#### Example

This example shows an action creator that reads a single book. It uses the
[redux-thunk](https://github.com/gaearon/redux-thunk) middleware and the
library [xhr](https://github.com/naugtur/xhr) for making requests.

```js
import { actionTypes } from 'redux-resource';
import xhr from 'xhr';

export default function readBook(bookId) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.READ_RESOURCES_PENDING,
      resourceName: 'books'
      resources: [bookId]
    });

    const req = xhr.get(`/books/${bookId}`, {json: true}, (err, res) => {
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
          resources: [res.body]
        });
      }
    });

    return req;
  }
}
```

#### Tips

- The `{crudAction}_RESOURCES_IDLE` action type is useful anytime that you want
  to "reset" the status of a request. One use case for this is when a request
  is aborted. Another use case would be for an alert that displays whenever a
  request is in a failed state. When the user dismisses the alert, you might
  trigger this action type to 'reset' the request status back to `IDLE`, which
  would then hide the alert.

  You may not always use this action type, and that's fine. But it's here if
  you do need it.
