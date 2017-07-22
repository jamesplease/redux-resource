# HTTP Status Codes Plugin

Add this plugin to keep track of HTTP Status Codes for each request

### Usage

First, you need to register this plugin for any slice that needs it.

```js
import { resourceReducer } from 'resourceful-redux';
import { httpStatusCodes } from 'resourceful-plugins';

const reducer = resourceReducer('books', {
  plugins: [httpStatusCodes]
});
```

This plugin responds to the built-in action types for CRUD. Anytime that you
pass a `statusCode` in your action, then it will be stored on your state.

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
[Resourceful Action Creators](/docs/extras/resourceful-action-creators.md)
library, then you don't need to do anything differently: the request's status
codes are included in the actions dispatched from that library.

### Tips

- The status code of an unsent and in-flight XHR requests is `0`, and the
  Resourceful Action Creators respects this. What this means is that any new
  requests will _immediately_ update any existing status code to be `0`.

  If you're using the status code to display UI elements, you may need to cache
  the last completed request's status in your component's state to get the
  behavior that you're looking for.
