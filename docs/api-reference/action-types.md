# actionTypes

An object of Redux [action types](http://redux.js.org/docs/basics/Actions.html)
that the [resource reducer](resource-reducer.md) responds to. Emit these from
action creators to change the state of your store.

The complete object is shown below:

```js
{
  CREATE_RESOURCES: 'CREATE_RESOURCES',
  CREATE_RESOURCES_FAIL: 'CREATE_RESOURCES_FAIL',
  CREATE_RESOURCES_SUCCEED: 'CREATE_RESOURCES_SUCCEED',
  CREATE_RESOURCES_NULL: 'CREATE_RESOURCES_NULL',

  READ_RESOURCES: 'READ_RESOURCES',
  READ_RESOURCES_FAIL: 'READ_RESOURCES_FAIL',
  READ_RESOURCES_SUCCEED: 'READ_RESOURCES_SUCCEED',
  READ_RESOURCES_NULL: 'READ_RESOURCES_NULL',

  UPDATE_RESOURCES: 'UPDATE_RESOURCES',
  UPDATE_RESOURCES_FAIL: 'UPDATE_RESOURCES_FAIL',
  UPDATE_RESOURCES_SUCCEED: 'UPDATE_RESOURCES_SUCCEED',
  UPDATE_RESOURCES_NULL: 'UPDATE_RESOURCES_NULL',

  DELETE_RESOURCES: 'DELETE_RESOURCES',
  DELETE_RESOURCES_FAIL: 'DELETE_RESOURCES_FAIL',
  DELETE_RESOURCES_SUCCEED: 'DELETE_RESOURCES_SUCCEED',
  DELETE_RESOURCES_NULL: 'DELETE_RESOURCES_NULL',
}
```

#### Notes

There are four groups of action types, one for each of the four
[CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) actions.

Within each CRUD action, there are four actions that reflect the four request
statuses. As actions with these types are emitted, your requests will
cycle through those four states.

#### Example

This example shows an action creator that reads a single book using the
[redux-thunk](https://github.com/gaearon/redux-thunk) middleware.

```js
import xhr from 'xhr';
import { actionTypes } from 'resourceful-redux'

export default function readBook(bookId) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.READ_RESOURCES,
      resourceName: 'books'
      ids: [bookId]
    });

    const req = xhr.get(`/books/${bookId}`, (err, res) => {
      if (req.aborted) {
        dispatch({
          type: actionTypes.READ_RESOURCES_NULL,
          resourceName: 'books',
          ids: [bookId]
        });
      } else if (err || res.statusCode >= 400) {
        dispatch({
          type: actionTypes.READ_RESOURCES_FAIL,
          resourceName: 'books',
          ids: [bookId]
        });
      } else {
        dispatch({
          type: actionTypes.READ_RESOURCES_SUCCEED,
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

- The `{crudAction}_RESOURCES_NULL` action type is useful anytime that you want
  to "reset" the status of a request. One use case for this is when a request
  is aborted. Another use case would be if you have an alert that displays when
  a request is in a failed state. When the user dismisses the alert, you might
  trigger this action type to 'reset' the request status.

  You may not always use this action type, and that's alright. But it's here if
  you do need it.
