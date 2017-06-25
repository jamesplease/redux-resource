# Labels

Labels are a way to keep track of the status and resources of individual
requests.

### Why use labels

In the earlier guide on [State Structure](/docs/guides/state-structure.md), we
covered that all resources of the same type are kept in a single Array. This is
a good thing, but it introduces a problem: how do you keep track of "groups" of
the same resource? Consider a web application shows a list of recently released
books, as well as a user's shopping cart of books. We know that in the state
tree, all of these books will be stored in one array, but we will want to show
them as two different lists in the interface. How can we do that?

The solution relies on the fact that these "groupings" of resources are nearly
always determined by different network requests. For instance, you might make one
request to get the recently released books, then a second request for the
shopping cart. By keeping track of which resources were returned for each
request, you can keep track of the different books.

And that's exactly what labels are: they're a name that you give to individual
requests. Resourceful Redux keeps track of the resources returned by each
labelled request.

### Using a label

Using a label is straightforward: add the `label` property to the
[Action types of a CRUD operation](./crud-actions.md).

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

A rule of thumb for using labels is:

**Use a label anytime that you do not have an ID, or a list of IDs, when you
dispatch a "pending" action.**

For example, if you attempt to read a book with ID of 23, then you _will_ have
an ID when you dispatch the "read pending" action (the ID is 23). So a
label may not be necessary in this situation.

On the other hand, if you were to make a request to your backend for the list
of books that were just released this past week, then you wouldn't have any IDs
at the time that you dispatch the "read pending" action. So you _should_ use a
label in this situation.

You're free to use a label in addition to passing IDs, too. Many applications
won't need to do this, but the option is there if you need it. If you're just
starting out with Resourceful Redux, we recommend sticking with the rule of
thumb.

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
//   null: false,
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
