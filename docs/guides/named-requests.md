# Named Requests

You can give requests a name, which is a string that is associated with
that request. Naming a request is useful because it provides you with a
key that you can use to look up that request's status.

Named requests are most frequently used when you're unable to, or prefer
not to, track the status of a request on a resource's metadata.

For instance, if you're creating a book, you might use the name `"create"`
for that request. In your store slice, each named request is found under the
`requests` key. In the example of create, a slice might look like:

```js
{
  requests: {
    create: {
      status: 'SUCCEEDED',
      ids: [24]
    }
  }
}
```

which would mean that the create request succeeded, and the resource with ID
of 24 was created.

### Why name a request

Naming your request can be used to track the request's status. For more on why
tracking request statuses is useful, refer to the
[Tracking Requests](/docs/guides/tracking-requests.md) guide.

### Using a named request

Using a named request is straightforward: add the `request` property to
the [Actions for a CRUD operation](./crud-actions.md).

```js
import { actionTypes } fom 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceName: 'books',
  request: 'search'
});
```

You should use the same name for the "lifetime" of the request. For instance,
if you use a particular name for the "pending" action, then you will want
to use that same name for the "success" action, too.

### When to Use Named Requests

A rule of thumb for using named requests is:

**Use a named request anytime that you do not have an ID, or a list of IDs, when you
dispatch a "pending" action.**

For example, if you attempt to read a book with ID of 23, then you _will_ have
an ID when you dispatch the "read pending" action (the ID is 23). So a
named request may not be necessary in this situation.

On the other hand, if you were to make a request to your backend for the list
of books that were just released this past week, then you wouldn't have any IDs
at the time that you dispatch the "read pending" action. So you _should_ use a
named request in this situation.

You're free to use a named request in addition to passing IDs, too. For instance,
if you're deleting 3 particular books, you might prefer to use a named request
to track that, rather than looking at one of the book's metadata (which may
seem awkward).

### An Example

When a named request is used, the status of the associated request is stored in
your state, and you can access it with
[`getStatus`](/docs/api-reference/get-status.md):

```js
import { getStatus } from 'redux-resource';
import store from './store';

const state = store.getState();
const searchStatus = getStatus(state, 'books.requests.search.status');
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
import { actionTypes } fom 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_SUCCEEDED,
  resourceName: 'books',
  request: 'search',
  // `newResources` are the list of books that were returned by the server
  // for this query.
  resources: newResources
});
```

Now when you call `getStatus` for this named request, you get the following object:

```js
{
  null: false,
  pending: false,
  failed: false,
  succeeded: true
}
```

### Avoid Dynamic Names

**Avoid using dynamic names**. Common dynamic names that developers use are:

1. serializing a search to create unique names for each search
2. serializing a new resource's attributes to create a unique name for each
  created resource
2. putting a resource ID in a name for some reason or another

Dynamic names are more error-prone, harder to reason about, and often unnecessary,
so you should strongly consider if you need them before using them.

Instead, stick to "static" strings for names such as `"create"`, or
`"readBooks"`. Most applications don't need to distinguish requests any
further because they typically only allow one of these "types" of requests
to be active at a single time. Keep it simple!
