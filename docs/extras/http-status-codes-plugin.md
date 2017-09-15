# HTTP Status Codes Plugin

Add this plugin to keep track of status codes of your HTTP Requests. This is
useful because status codes give you more detail information about your
in-flight requests.

One common use case is to be able to handle the different reasons for a failed
request: was the resource not found (404), or did the user not have permissions
(403)? This plugin makes it straightforward to track this information, and then
use it in your view layer.

### Usage

First, you need to register this plugin when you call
[`resourceReducer`](/docs/api-reference/resource-reducer.md).

```js
import { resourceReducer } from 'resourceful-redux';
import { httpStatusCodes } from 'resourceful-plugins';

const reducer = resourceReducer('books', {
  plugins: [httpStatusCodes]
});
```

This plugin doesn't come with any custom action types. Instead, it changes the
way the state is tranformed with the built-in CRUD
[action types](/docs/api-reference/action-types.md). Any time that you pass a
`statusCode` in an action with one of those types, then the code will be stored
in your state tree.

Passing the status code looks like the following:

```js
import { actionTypes } from 'resourceful-redux';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_FAILED,
  resourceName: 'books',
  resources: [10],
  statusCode: 404
});
```

If you're using the
[Resourceful XHR](/docs/extras/resourceful-xhr.md)
library, then you don't need to do anything differently: request status
codes are already included in the actions dispatched from that library.

Within your resource metadata, the status code will be available at one of four
keys, depending on the CRUD operation being performed:

- `createStatusCode`
- `readStatusCode`
- `updateStatusCode`
- `deleteStatusCode`

On a named request, the code is just available under `statusCode`.

```js
import store from './store';

const state = store.getState();

// Access the status codes of some resource meta
const bookStatusCode = state.books.meta[24].readStatusCode;

// Access the status code from a named requests
const searchStatusCode = state.books.requests.search.statusCode;
```

### Tips

- The status code of an unsent and in-flight XHR requests is `0`, and the
  Resourceful XHR respects this. What this means is that any new
  requests will _immediately_ update any existing status code to be `0`.

  If you're using the status code to display UI elements, you may need to cache
  the last completed request's status in your component's state to get the
  behavior that you're looking for.
