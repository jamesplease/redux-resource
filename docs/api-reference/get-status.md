# `getStatus(state, statusLocation, [treatIdleAsPending])`

Returns an object with boolean values representing the request status of a
particular CRUD action. It can also be used to aggregate multiple request
statuses together.

#### Arguments

1. `state` *(Object)*: Typically, the current state of the Redux store, but
  more generally it can be any object that has a request status somewhere deeply
  nested within it.

3. `statusLocation` *(String|Array)*: A single path that points to a request
  status within `state`. If you pass an array of status locations, then they
  will be aggregated. For more on status locations and status aggregation, see
  the Notes below.

4. [`treatIdleAsPending`] *(Boolean)*: Whether or not a request status of `IDLE` is
  to be considered as a `pending` request. Defaults to `false`. See Tips on
  when to use this.

#### Returns

(*`Object`*): An Object representing the status of this request for the
  statusLocation. It has the following shape:

  ```js
  {
    null: Boolean,
    pending: Boolean,
    failed: Boolean,
    succeeded: Boolean
  }
  ```

  One of these values is always `true`, reflecting the value of the request
  status. When `treatIdleAsPending` is `true`, then request statuses that are
  `"IDLE"` will be returned as `pending: true`.

#### Notes

Passing more than one status location will aggregate the statuses. The rules of
aggregation work as follows:

- If all of the requests are null, then the aggregate is null
- If *any* of the requests are failed, then the aggregate is failed.
- If no requests have failed, but some are pending, then the aggregate is pending.
- If all requests have succeeded, then the aggregate has succeeded.

A status location is a string that specifies a location of a request status in
your state tree. For instance `"books.meta.24.readStatus"` or
`"books.requests.dashboardSearch.status"`.

> Keep in mind that `treatIdleAsPending` also works when aggregating.

#### Examples

In this example, we pass a single status location:

```js
import { getStatus } from 'redux-resource';
import store from './store';

const state = store.getState();
const bookDeleteStatus = getStatus(state, 'books.meta[23].deleteStatus');
```

In this example, we pass two locations:

```js
import { getStatus } from 'redux-resource';
import store from './store';

const state = store.getState();
const bookReadStatus = getStatus(
  state,
  [
    'articles.meta[23].readStatus',
    'comments.requests.detailsRead.status'
  ],
  true
);
```

#### Tips

- The third argument, `treatIdleAsPending`, is useful for requests that are made when
  your components mount. The components will often render before the request
  begins, so the status of these requests will be `IDLE`. Passing `treatIdleAsPending`
  will consider these `IDLE` states as `pending: true`.

- If you're using React, we recommend computing your `getStatus` values in
  `mapStateToProps`, and then passing them in as props into your component. That
  way, you have access to this information in all of the lifecycle methods of
  your component.

- The first argument, `state`, doesn't always need to be the state of your
  Redux store. For instance, if you're using this method within your component's
  lifecycle methods, such as `componentWillReceiveProps`, you may instead pass
  it an object that is a subset of the state. This can be useful when you're
  comparing a previous status against an upcoming status.
