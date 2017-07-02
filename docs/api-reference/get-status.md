# `getStatus(state, statusLocations, [treatNilAsPending])`

Returns an object with boolean values representing the request status of a
particular CRUD action. It can also be used to aggregate multiple request
statuses together.

#### Arguments

1. `state` *(Object)*: The current state of the Redux store.

3. `statusLocations` *(Array)*: An Array of paths that point to request statuses
  within `state`. For more on status locations, see the Notes below.

4. [`treatNilAsPending`] *(Boolean)*: Whether or not a request status of `NIL` is
  to be considered as a `pending` request. Defaults to `false`. See Tips on
  when to use this.

#### Returns

(*`Object`*): An Object representing the status of this request for these
  statusLocations. It has the following shape:

  ```js
  {
    nil: Boolean,
    pending: Boolean,
    failed: Boolean,
    succeeded: Boolean
  }
  ```

  One of these values is always `true`, reflecting the value of the request
  status. When `treatNilAsPending` is `true`, then request statuses that are
  `"NIL"` will be returned as `pending: true`.

#### Notes

Passing more than one status location will aggregate the statuses. The rules of
aggregation work as follows:

- If all of the requests are nil, then the aggregate is nil
- If *any* of the requests are failed, then the aggregate is failed.
- If no requests have failed, but some are pending, then the aggregate is pending.
- If all requests have succeeded, then the aggregate has succeeded.

A status location is a string that specifies a location of a request status in
your state tree. For instance `"books.meta.24.readStatus"` or
`"books.labels.dashboardSearch.status"`.

> Keep in mind that `treatNilAsPending` also works when aggregating.

#### Example

```js
import { getStatus } from 'resourceful-redux';
import store from './store';

const state = store.getState();
const bookReadStatus = getStatus(
  state,
  [
    'articles.meta.23.readStatus',
    'comments.labels.detailsRead.status'
  ],
  true
);
```

#### Tips

- The third argument, `treatNilAsPending`, is useful for requests that are made when
  your components mount. The components will often render before the request
  begins, so the status of these requests will be `NIL`. Passing `treatNilAsPending`
  will consider these `NIL` states as `pending: true`.

- If you're using React, we recommend computing your `getStatus` values in
  `mapStateToProps`, and then passing them in as props into your component. That
  way, you have access to this information in all of the lifecycle methods of
  your component.
