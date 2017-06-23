# Labels

Labels are a tool you can use to keep track of certain requests. Before we
get into using labels, let's first cover the motivation for why they exist
in the first place.

In the earlier guide on [State Structure](/docs/guides/state-structure.md), we
covered that all resources of the same type are kept in a single Array. This
solves the problem of having multiple copies of a resource in two different
places: each individual resource can be found in exactly one place in the state
tree.

This introduces another problem, though. How do you keep track of "groups" of
the same resource? For instance, if a web application shows a list of recently
released books, as well as a user's shopping cart of books, how can they be
distinguished from one another?

Labels can be used to solve this problem, and other similar problems.

Using a label is straightforward: add the `label` property to all of the
requests in that [sequence of actions](./crud-actions.md).

```js
import { actionTypes } fom 'resourceful-redux';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceName: 'books',
  label: 'search'
});
```

### When to Use labels

Sticking to a rule of thumb can help make deciding _when_ to use a label
straightforward, too. The rule of thumb is:

**Use a label whenever you do not have an ID or list of IDs at the moment
that you dispatch a "pending" action.**

For example, if you attempt to read a book with ID of 23, then you _will_ have
an ID when you dispatch the "read pending" action (the ID is 23). So a
label may not be necessary in this situation.

On the other hand, if you were to make a request to your backend for the list
of books that were just released this past week, then you wouldn't have any IDs
at the time that you dispatch the "read pending" action. So you do use a label
in this situation.

Note that there may also be times when you want to use a label in addition to
using an ID, but those are exceptional cases that many applications do not
require. But the option is there if you need it.

If you're just starting out with Resourceful Redux, we recommend sticking with
the rule of thumb.

### An Example

When a label is used, the status of the associated request is stored in your
state, and you can access it with
[`getStatus`](/docs/api-reference/get-status.md):

```js
import { getStatus } from 'resourceful-redux';
import store from './store';

const state = store.getState();
const searchStatus = getStatus(state, 'books.labels.search.status');
// => Returns the following object:
//
// {
//   pending: true,
//   failed: false,
//   succeeded: false
// }
//
```

When the request succeeds, you dispatch the following action:

```js
import { actionTypes } fom 'resourceful-redux';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_SUCCEEDED,
  resourceName: 'books',
  label: 'search',
  // `newResources` are the list of books that were returned by the server
  // for this query.
  resources: newResources
});
```

Now when you call `getStatus` for this label, you get the following object:

```js
{
  pending: false,
  failed: false,
  succeeded: true
}
```

Additionally, the resources associated with the label are available under its
`ids` attribute. You can use this array to filter the resources list by the
label, or you can use the `getResources` helper method.

```js
import { getResources } from 'resourceful-redux';
import store from './store';

const state = store.getState();

const searchedBooks = getResources(state, 'books', 'search');
```

### Replacing Label IDs

By default, subsequent successful requests with the same label will _merge_
the old label IDs with the new. You can outright replace the old list with the
new by passing `mergeLabelIds: false` in your action. For instance:

```js
import { actionTypes } fom 'resourceful-redux';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_SUCCEEDED,
  resourceName: 'books',
  label: 'search',
  mergeLabelIds: false,
  // `newResources` are the list of books that were returned by the server
  // for this query.
  resources: newResources
});
```

### Performance

Filtering the resources array with an array of list IDs can sometimes cause
performance issues if your application deals with large numbers of resources. If
you run into these performance problems, we have had luck with these solutions:

- Make sure that the filter is done as few times as possible. For instance,
  if the component is connected, perform the filter in `mapStateToProps`, then
  pass it in as props. Then it is computed at most once per render.

- Use [`reselect`](https://github.com/reactjs/reselect) to cache the result
  of the filter. This will only recompute the result whenever the resource list
  or label ID list changes.

- If this still isn't performant enough for you, then you can just make a
  separate slice for a subset of your resources, rather than using a label. Then
  you don't need to filter at all. For instance, you might have:

  ```js
  import { createStore, combineReducers } from 'redux';
  import { resourceReducer } from 'resourceful-redux';

  let store = createStore(
    combineReducers({
      books: resourceReducer('books'),
      booksSearch: resourceReducer('booksSearch'),
      booksInput: resourceReducer('booksInput')
    })
  );
  ```

  The benefit of this approach is that you never need to do a `filter` against
  the resources list. The downside is that you need to manage duplicate
  resources in your state, as well as moving resources between the different
  lists as users interact with your application. For these reasons, we recommend
  only using this solution as a last resort.
