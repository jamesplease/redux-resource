# Request Labels

A label is a name that you give to an individual CRUD operation request.
Resourceful Redux associates the status of the request with the label
that you supply, which gives you a straightforward way to access that
request's status at a later time.

Labels are most often used when you're unable to track the status of a
request on an individual resource's metadata.

For instance, if you're creating a book, you might use the label `"create"`.
In your store slice, each label is found under the `labels` key. In the
example of create, a slice might look like:

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

Labeling your request can be used to track requests. For more, refer to the
[Tracking Requests](/docs/guides/tracking-requests.md) guide.

### Using a label

Using a label is straightforward: add the `label` property to the
[Actions for a CRUD operation](./crud-actions.md).

```js
import { actionTypes } fom 'resourceful-redux';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceName: 'books',
  label: 'search'
});
```

You should use the same label for the lifetime of the request. For instance,
if you use a particular label for the "pending" action, then you will want
to use that same label for the "success" action, too.

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

### Replacing Label IDs

> Note: Controlling the merge behavior of labels is deprecated, and will be
  removed in v2.0.0 of Resourceful Redux. Please use
  [`lists`](/docs/guides/lists.md) instead.

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

Dynamic labels are more error-prone, harder to reason about, and often unnecessary,
so you should strongly consider if you need them before using them.

Instead, stick to "static" strings for labels such as `"create"`, or
`"searchBooks"`. Most applications don't need to distinguish requests any
further because they typically only allow one of these "types" of requests
to be active at a single time. Keep it simple!
