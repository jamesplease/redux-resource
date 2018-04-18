# requestStatuses

An object that represents the four statuses that a request can have. The
complete object is shown below:

```js
{
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  SUCCEEDED: 'SUCCEEDED',
}
```

#### Example

```js
import { requestStatuses } from 'redux-resource';
import store from './store';

const state = store.getState();

if (state.books.meta['23'].readStatus === requestStatuses.PENDING) {
  console.log('A book with id "23" is currently being fetched.');
}
```

#### Tips

- Although this object _can_ be used to check the status of a request in your
  view layer, it's often more convenient to use [`getStatus`](get-status.md)
  for that purpose. For this reason, we recommend restricting your usage of this
  object to plugins, reducers, or action creators.
