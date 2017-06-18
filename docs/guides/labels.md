# Labels

Labels are a way to keep your requests organized. In resourceful-redux, all
resources of the same type are kept in a single Array. This solves the problem
of having multiple copies of a resource in two different places: each resource
can be found in exactly one place in the store.

This can cause a problem of keeping track of requests. For instance, if a user
runs two searches for books, how can you keep track of which books were returned
from which search?

You use labels to do that.

Using a label is straightforward: simply add the `label` property to all of the
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

When a label is used, the status of the associated request is stored in your
state, and you can access it with `getStatus`:

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

When the request succeeds, you will dispatch the following action:

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

Now, if you were to run `getStatus` for this label, you would get the following
object:

```js
{
  pending: false,
  failed: false,
  succeeded: true
}
```

Additionally, the resources associated with the label are available under its
`ids` attribute. To find the books that were returned from this search, you
could use:

```js
import store from './store';

const state = store.getState();

const searchLabelIds = state.books.labels.search.ids;
const searchResults = state.books.resources.filter(book => searchLabelIds.includes(book.id));
```

### Performance

Filtering the resources array with an array of list IDs can sometimes cause
performance issues if your application deals with large numbers of resources. If
you run into these performance problems, we have had luck with these solutions:

- Make sure that the find is done as few times as possible. For instance,
  if the component is connected, perform the filter in `mapStateToProps`, then
  pass it in as props. Then it is computed at most once per render.

- Use [`reselect`](https://github.com/reactjs/reselect) to cache the result
  of the filter. This will only compute the result whenever the resource list or
  label ID list changes.

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
