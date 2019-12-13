# Request Actions

Any time that you need to interact with resources over a network, you
should use request actions.

> Note: to make synchronous changes to a resource slice, you can use
> [the synchronous actions](../resources/modifying-resources.md) instead.

### Requests Require Two Actions

Requests are asynchronous, so they take time to complete. First, a network request is sent off,
and then sometime later it resolves.

In Redux Resource, this information is captured using two actions. Any time that
you make a request, you will need to dispatch both of these actions. The first
is dispatched just before the request begins, and the second is dispatched
once the request completes.

For instance, the sequence of action types for a successful read request would be the
following:

`READ_RESOURCES_PENDING` ⇨ `READ_RESOURCES_SUCCEEDED`

The `PENDING` action is always the "start" action. It is dispatched just before
the request begins. Then, once the request succeeds, or fails, or is cancelled, you
dispatch the "end" action (`SUCCEEDED` in this case).

> Note: the [redux-thunk](https://github.com/gaearon/redux-thunk) middleware is
> a great solution for supporting asynchronous action creators like the ones
> necessary for dispatching request actions.

### Action Properties

These are the following properties that you may include on a request action:

- `type`: The action type. The full list of request action types can be viewed
  [here.](../api-reference/action-types.md)
- `resourceType`: The type of the resource that is primarily being affected by this request
- `resources`: An array of affected resources
- `requestKey`: The request key
- `requestName`: The request name
- `list`: The list to add the resources to
- `requestProperties`: Additional data to store on the request
- `mergeResources`: A Boolean representing whether or not new resources are merged with
  existing resources. Defaults to `true`.
- `mergeMeta`: A Boolean representing whether or not new resource metadata is merged with
  existing resource metadata. Defaults to `true`.
- `mergeListIds`: A Boolean representing whether or not the new resources should replace
  an existing list or not. Defaults to `true`.

This section of this guide will cover these properties in more detail.

All request actions have a single required property, `resourceType`, which is the name
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
state tree, so this action doesn't change the store.

To reflect a request status in the state tree, you need to supply at least one
of these two values in your action: a `resources` array, or a `requestKey`.

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

To keep track of the resources for requests like these, you need to use request
objects.

### `requestKey`

Supplying a `requestKey` will create a [request object](requests/request-objects.md) for
this operation within the `requests` section of the resource slice.

For instance, if your interface allows users to search for a books resource, you
might dispatch the following action:

```js
import { actionTypes } from 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceType: 'books',
  requestKey: 'booksSearch',
});
```

### `requestName`

A human-readable string to help with debugging. For more, refer to the
[Request Keys and Names](requests/keys-and-names.md) guide.

```js
import { actionTypes } from 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceType: 'books',
  // In this example, we have some system to generate our request keys for us.
  // This could be used by a system to implement request deduplication or
  // response caching. An example library that generates request keys for you
  // is fetch-dedupe:
  // https://github.com/jamesplease/fetch-dedupe
  requestKey: generateRequestKey(/* request options */),

  // Because the request key is a randomly generated string, it can be convenient
  // to know what the purpose of this request is.
  requestName: 'searchBooks'
});
```

### `list`

For create and read operations, you can supply a `list` on a request action. This will
add the resources returned from the operation to the specified list on your slice.

> Note: you'll nearly always want to provide a request key when using lists. This is
> so that you can track the status of the request on the request object.

```js
import { actionTypes } from 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceType: 'books',
  list: 'mostPopular',
  requestKey: 'getMostPopular',
});
```

To learn more about lists, refer to [the lists guide](../resources/lists.md).

### Other Request Action properties

The following Request Action properties are all optional.

- `mergeResources` *(Boolean)*: When an action results in resources being
  updated in the store, this determines if the new data is merged with the old,
  or if it replaces the old data. Defaults to `true`. This only has an effect
  on successful read, write, and update Actions.

- `mergeMeta` *(Boolean)*: This is like `mergeResources`, but for metadata.
  Defaults to `true`. This property works with actions with any of the request
  action types.

- `mergeListIds` *(Boolean)*: When a list is supplied, this lets you control
  whether or not the new list of IDs replaces or gets merged into the existing
  list of IDs for that list. When `true`, it will protect against duplicate
  IDs being added. Defaults to `true`. This only applies for successful read
  and write Actions that have a `list` specified.

- `requestProperties` *(Object)*: An object that will be merged onto the request
  object. Use this to add additional data onto the request object, such as HTTP
  status codes, gRPC error codes, or any other information related to the request.

### Dreprecated Request Action Properties

The following request action properties are deprecated, and will be removed in
the next major release of Redux Resource (4.0.0):

- `request` *(String)*: A convenient way to set both the `requestKey` and the
  `requestName` at the same time.

- `resourceName` *(String)*: An alias of `resourceType`. Use `resourceType` instead.

### Action Creators

The core Redux Resource library does not include action creators, but there
is [a library, Redux Resource XHR](../extras/redux-resource-xhr.md), that includes
action creators.

You're also free to build your own action creators. For examples, refer to these
four guides:

- [Reading Resources](./reading-resources.md)
- [Updating Resources](./updating-resources.md)
- [Creating Resources](./creating-resources.md)
- [Deleting Resources](./deleting-resources.md)

### Using the Action Types

One of this library's exports are these request action types. You can use them in
your application by importing them like so:

```js
import { actionTypes } from 'redux-resource';
```

For a complete list of all of the action types, refer to the
[Action Types API Reference](../api-reference/action-types.md).
