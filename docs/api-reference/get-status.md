# `getStatus(state, metaLocations, [isNullPending])`

Returns an object with boolean values representing the request status of a
particular CRUD action. It can also be used to aggregate multiple request
statuses together.

#### Arguments

1. `state` *(Object)*: The current state of the Redux store.

3. `metaLocations` *(Array)*: An Array of "meta locations" to get the status
  from. For more on meta locations, see the Notes below.

4. [`isNullPending`] *(Boolean)*: Whether or not a request status of `NULL` is
  to be considered as a `pending` request. Defaults to `false`. See Notes on
  when to use this.

#### Returns

(*`Object`*): An Object representing the status of this request for these
  metaLocations. It has the following shape:

  ```js
  {
    pending: Boolean,
    failed: Boolean,
    succeeded: Boolean
  }
  ```

  At most, one of these values will be `true`. When `isNullPending` is `true`,
  then you can be certain that one of these will _always_ be true. When
  `isNullPending` is `false`, all three values will be `false` when all of the
  request statuses are `NULL`.

#### Notes

Passing more than one meta location will aggregate the statuses. The rules of
aggregation work as follows:

- If *any* of the requests are failed, then the aggregate is failed.
- If no requests have failed, but some are pending, then the aggregate is pending.
- If all requests have succeeded, then the aggregate has succeeded.

A meta location is a string that specifies a location in your store. For
instance `"books.meta.24.readStatus"` or `"books.labels.dashboardSearch.status"`.

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

- The third argument, `isNullPending`, is useful for requests that are made when
  your components mount. The components will often render before the request
  begins, so the status of these requests will be `NULL`. Passing `isNullPending`
  will consider these `NULL` states as `pending: true`.

- If you're using React, we recommend computing your `getStatus` values in
  `mapStateToProps`, and then passing them in as props into your component. That
  way, you have access to this information in all of the lifecycle methods of
  your component.
