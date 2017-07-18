# Request Labels

A label is a name that you give to an individual CRUD operation request.
Labeling a request is a simple idea, but it's a powerful feature that has
several uses in Resourceful Redux.

### What is a Label

A label is a word that you associate with a request. For instance, if you're
creating a book, you might use the label `"create"`. In your store slice,
each label is found under the `labels` key. In the example of create, a
slice might look like:

```js
{
  labels: {
    create: {
      status: 'SUCCEEDED',
      ids: [24]
    }
  }
}
```

which would mean that the create request succeeded, and the resource with ID
of 24 was created.

### Why label a request

There are three common reasons to label a request in Resourceful Redux:

1. They can be used to track a request, even when you don't have resource ID(s)
  when you dispatch the start action

2. They can be used to keep track of server-side ordering of your requests

3. They can be used to keep track of subsets of a resource

Let's go into more detail about when you may need to do one of these things.

#### Tracking CRUD Operation Requests

Tracking a request means being able to look up its current status. Is it in
flight, has it failed, or did it succeed?

Labeling your equest can be used to track requests. For more, refer to the
[Tracking Requests](/docs/guides/tracking-requests.md) guide.

#### Server-side Ordering

In your state slice, your resources aren't stored in any order: they're just
keys on the `resources` object. Frequently, applications will need to preserve
the order that the server returns a list of resources in. For instance, if you
make a request for a list of books based on popularity.

Labels keep an array of IDs of resources that are associated with the request,
so they can be used to preserve this sort order.

When the request to retrieve the most popular books succeeds, your state slice
may look like something like:

```js
{
  resources: {
    // Resources and their attributes are in here
  },
  meta: {
    // Metadata about resources is stored in here
  },
  labels: {
    create: {
      popularBooks: 'SUCCEEDED',
      ids: [1002, 24, 100, 234]
    }
  }
}
```

#### Ordered Subsets of Resources

In the earlier guide on [State Structure](/docs/guides/state-structure.md), we
covered that all resources of the same type are kept in a single object. This is
a good thing, but it introduces a problem: how do you keep track of "groups" of
the same resource? Consider a web application shows a list of recently released
books, as well as a user's shopping cart of books. We know that in the state
tree, all of these books will be stored in one object, but we will want to show
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

### Avoid Dynamic Labels

**Avoid using dynamic labels**. Common dynamic labels that developers use are:

1. serializing a search to create unique labels for each search
2. serializing a new resource's attributes to create a unique label for each
  created resource
2. putting a resource ID in a label for some reason or another

Don't do this. Dynamic labels are more error-prone, harder to work with, and
nearly always unnecessary.

Instead, stick to "static" strings for labels such as `"create"`, or
`"searchBooks"`. Most applications don't need to distinguish requests any
further because they typically only allow one of these "types" of requests
to be active at a single time. Keep it simple!
