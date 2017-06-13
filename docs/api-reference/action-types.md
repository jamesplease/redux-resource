# actionTypes

An Object of Redux [action types](http://redux.js.org/docs/basics/Actions.html)
that the [resource reducer](resource-reducer.md) responds to. Emit these in
action creators to change the state of your store.

The complete Object is shown below:

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

#### Example

This example shows an action creator that reads a single book. This example
requires that you use the [redux-thunk](https://github.com/gaearon/redux-thunk)
middleware.

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
