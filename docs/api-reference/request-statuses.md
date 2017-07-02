# requestStatuses

An object that represents the four statuses that a request can have. The
complete object is shown below:

```js
{
  NIL: 'NIL',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  SUCCEEDED: 'SUCCEEDED',
}
```

#### Example

```js
import { requestStatuses } from 'resourceful-redux';
import store from './store';

const state = store.getState();

if (state.books.meta['23'] === requestStatuses.PENDING) {
  console.log('A book with id "23" is in progress.');
}
```

#### Tips

- Although this object _can_ be used to check the status of a request in your
  view layer, it's often more convenient to use [`getStatus`](get-status.md)
  for that purpose. For this reason, we recommend restricting your usage of this
  object to plugins, reducers, or action creators.
