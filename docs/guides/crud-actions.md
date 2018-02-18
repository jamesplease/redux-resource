# CRUD Actions

Redux Resource exports Action types to help you create, read, update,
and delete resources.

### "Start" and "end" Actions

CRUD operations are usually asynchronous. In Redux Resource, these
asynchronous CRUD operations are represented as a sequence of two Redux Actions.
First, there is a "start" action, which updates your store to reflect that the
CRUD operation is in a "pending" state. This is later followed by an end action,
which updates the status to reflect the outcome of the request.

For instance, the sequence of action types for a successful read request is the
following:

`READ_RESOURCES_PENDING` ⇨ `READ_RESOURCES_SUCCEEDED`

This notion of a start and end action will continue to be referenced throughout
these guides. In particular, remember that the start action sets the request
status to `'PENDING'`, and that it is dispatched right before the request begins.

The [redux-thunk](https://github.com/gaearon/redux-thunk) middleware is
recommended for making action creators for these CRUD operations.

### Action Attributes

All actions have a single required value, `resourceType`, which is the name
of the resource that is being affected. The simplest action, then, looks
something like this:

```js
import { actionTypes } from 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceType: 'books'
});
```

This action isn't very useful, however. Without more information about this
request, Redux Resource doesn't know where to put this information in your
state tree. Consequently, this action is a no-op.

To reflect a request status in the state tree, you need to supply at least one
of these two values in your action: a `resources` array, or a `request`, which
is a name to represent the request.

### `resources`

A `resources` array represents the resources being affected by the action.
It can be an array of IDs, such as `[1, 2, 3]`, or an array of resource objects,
such as

```js
[
  {
    id: 1,
    name: 'Brian',
    phone: '444.444.4444'
  },
  {
    id: 2,
    name: 'Sarah',
    phone: '222.222.2222'
  }
]
```

You can even mix the two. When it comes to a `resources` array, the important
part is that the objects have some `id`. This associates the action with some
resources.

You may be wondering when you might use the object form versus the shorthand
form. There are two guidelines to remember, one for the start action, and one
for the end action.

**For the start action, provide IDs, if you have them.**

**For the end action, provide the full resource definitions, if you have them.
If you don't, but you do have IDs, then provide those.**

Let's look at an example.

If you're reading a single resource, such as a book, then you might access that
book from your backend service with its ID. In this situation, you will have an
ID at the time that you dispatch the start action, so we include that ID in
the action's `resources` array:

```js
import { actionTypes } from 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceType: 'books',
  resources: [23]
});
```

When the request succeeds, you now have more detailed information about this
book to add to your store. So you would include the full book definition in the
success action's `resources`:

```js
import { actionTypes } from 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_SUCCEEDED,
  resourceType: 'books',
  resources: [{
    id: 23,
    releaseYear: 2015,
    author: 'Jane M. Goodfellow',
    title: 'A History of Canada'
  }]
});
```

Whenever a `resources` array is supplied, Redux Resource will update the
`meta` for each resource in that array.

The "success" action types also have special behavior with the `resources`
array. For creates, reads, and updates, your state's resources object will be
updated to reflect any new data. For successful deletes, the state for that
resource will be changed to be `null`, and the resource will be removed from the
`ids` array of all lists.

It isn't always possible to provide an array of `resources` in your action. For
instance, if the user is searching for books by entering a title, you couldn't
know which books will be returned until after the request has completed.

To keep track of the resources for requests like these, you need to use named
requests.

### `request`

Supplying a `request` will track the status of this request under the `requests`
property of your store.

For instance, if your interface allows users to search for a books resource, you
might dispatch the following action:

```js
import { actionTypes } from 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceType: 'books',
  request: 'booksSearch',

  // You may also includes additional attributes on a request.
  // This attribute, "query" isn't used by Redux Resource, but you
  // could customize the resource reducer (using "plugins") to make use
  // of it.
  query: 'Lord of the Flies'
});
```

Resources are primarily used to keep
[track of the request status](/docs/guides/tracking-requests.md). For more, refer
to [the guide on named requests](/docs/guides/named-requests.md).

### `list`

For create and read CRUD operations, you can supply a `list` to add the resources
returned from the operation with one of the lists in your slice.

> Note: you'll nearly always want to use a named request when using lists. This is
  so that you can track the request status.

```js
import { actionTypes } from 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceType: 'books',
  list: 'mostPopular',
  request: 'getMostPopular',
  query: 'Lord of the Flies'
});
```

To learn more about lists, refer to [the lists guide](/docs/guides/lists.md).

### Other CRUD Action properties

The following CRUD Action attributes are all optional.

- `mergeResources` *(Boolean)*: When an action results in resources being
  updated in the store, this determines if the new data is merged with the old,
  or if it replaces the old data. Defaults to `true`. This only has an effect
  on successful read, write, and update Actions.

- `mergeMeta` *(Boolean)*: This is like `mergeResources`, but for metadata.
  Defaults to `true`. This property works with actions with any of the CRUD
  action types.

- `mergeListIds` *(Boolean)*: When a list is supplied, this lets you control
  whether or not the new list of IDs replaces or gets merged into the existing
  list of IDs for that list. When `true`, it will protect against duplicate
  IDs being added. Defaults to `true`. This only applies for successful read
  and write Actions that have a `list` specified.

### Action Creators

The core Redux Resource library does not include action creators, but there
is [a library, Redux Resource XHR](/docs/extras/redux-resource-xhr.md), that includes
action creators.

You're also free to build your own action creators. For examples, refer to the
four CRUD guides:

- [Reading Resources](./reading-resources)
- [Updating Resources](./updating-resources)
- [Creating Resources](./creating-resources)
- [Deleting Resources](./deleting-resources)

### Using the Action Types

One of this library's exports are these CRUD action types. You can use them in
your application by importing them like so:

```js
import { actionTypes } from 'redux-resource';
```

For a complete list of all of the action types, refer to the
[Action Types API Reference](../api-reference/action-types.md).
