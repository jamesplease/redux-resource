# Unauthorized Responses

Some applications log users out after a certain period of time. For single page
apps, this usually presents itself as requests to the backend suddenly failing
for the logged-out user. This can occur when the user leaves the application
open in their browser over night, for instance.

A common UX pattern is to display a notification to the user when this occurs,
so that they can log back in. This recipe describes one way that you can detect
when a user is logged out, so that you can notify them however you see fit.

### Your server

The backend that you interface with needs to provide a consistent representation
of the user being logged out.

If your API uses proper
[HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes),
then this means that the responses will have a `401` status code.

The rest of this guide will assume that the backend returns a `401` HTTP status
code, although this same system works for other representations, too.

### Action Creators

Whenever an unauthorized response from the backend is returned in your CRUD
action creators, include the status code in the action that you dispatch.

If you're using [Redux Resource XHR](/docs/extras/redux-resource-xhr.md),
then the entire `res` object will be attached to the action. You can access the
status code at `action.res.statusCode`.

If you're not using Redux Resource XHR, then your code may look
something like:

```js
export function readBook(id) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.READ_RESOURCES_PENDING,
      resourceType: 'books',
      resources: [id]
    });

    request('/some-url', (err, res) => {
      if (err || res.statusCode >= 400) {
        dispatch({
          type: actionTypes.READ_RESOURCES_FAILED,
          resourceType: 'books',
          resources: [id],
          res
        });

        return;
      }

      // Check to see if the request was cancelled, or if it succeeded, then
      // dispatch the appropriate action here.
    });
  }
}

```

### Reducer

The final step is to write a reducer that updates the state tree whenever
these failed actions occur. Here is an example reducer that does this:

```js
import { actionTypes } from 'redux-resource';

const {
  READ_RESOURCES_FAILED,
  UPDATE_RESOURCES_FAILED,
  CREATE_RESOURCES_FAILED,
  DELETE_RESOURCES_FAILED
} = actionTypes;

export default function reducer(state = false, action) {
  const isFailedAction = action.type === READ_RESOURCES_FAILED ||
    action.type === UPDATE_RESOURCES_FAILED ||
    action.type === CREATE_RESOURCES_FAILED ||
    action.type === DELETE_RESOURCES_FAILED;

  if (isFailedAction && action.res.statusCode === 401) {
    return true;
  }

  return state;
}
```

Before an unauthorized response has been received, this reducer will return
a state of `false`.  When a logged-out response is received, then the reducer
will update the state to be `true`.

You'll want to use this reducer with
[`combineReducers`](http://redux.js.org/docs/api/combineReducers.html):

```js
import { combineReducers } from 'redux';
import unauthorizedReducer from './unauthorized-reducer';

const reducer = combineReducers({
  unauthorized: unauthorizedReducer,
  // ...other store slices (your resource reducers, etc.)
});
```

With this in place, you have a slice of your state tree that will be `true`
whenever an unauthorized response is received.

You can use this value in your view layer to toggle the appearance of a modal,
or some other notification, to let the user know that they need to log back in.
