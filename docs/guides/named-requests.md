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
  resourceType: 'books',
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
  resourceType: 'books',
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

### Tips for Naming

We recommend using a verb somewhere in your request name. For instance, `getFavorites`
rather than just `favorites`.

Some good CRUD-related verbs are:

- create
- get
- read
- search
- find
- update
- change
- delete

If you're associating the request with a [list](/docs/guides/lists.md), then you may
want to use the list name as well. For instance, if the list is `favorites`, and the
request is for a user searching through their favorites, then you may use
`searchFavorites`.

Reusing a request name is fine, but be sure that you're reusing the name for the same
'type' of request. For instance, if a user can create books in your application, and you
wish to use a named request for that action, then you can just use `createBook`. This works
really well as long as a user is only able to send off one create request at a time.

We don't encourage using the same named request across different 'types' of actions.
For instance, if a user can create favorite books, as well as delete favorite books,
you should use something like `createFavorite` and `deleteFavorite` for these two
actions, rather than, say, using `changeFavorites` for both. This makes your code more
expressive, and also allows you to track both in the event that both are in flight
at the same time.

#### A Note on Dynamic Names

Typically, you'll want to avoid dynamic names. A dynamic request name is any name
that includes a variable. Common dynamic names that developers use are:

1. serializing a search to create unique names for each search
2. serializing a new resource's attributes to create a unique request name for each
  created resource
2. putting a resource ID in a name

Dynamic names can be useful in some situations, but they are often not needed. The
benefit to using static names, such as `"create"` is that they're easier to reason about,
and are less prone to errors.

Here are two use cases for dynamic names, although there may be more:

- Caching by request name. There's no official caching system within redux-resource,
  but using request names is one way that would work well. If you want to cache, say,
  a user's search results based on what they enter, then you may want to serialize
  the search so that you can look it up later. For more, refer to
  [the recipe on caching](/docs/recipes/caching.md).

- Supporting multiple of the same 'type' of request at once, when you are unable to
  track the request statuses on a resource's metadata. That's a lot to take in, so
  let's disect that.

  If you can track a request status on a resource's metadata, then you don't need
  named requests at all. Consequently, you also don't need a dynamically named
  request.

  An example where you (typically) don't have an ID is when a user is creating
  a new resource. If a user can begin the process for creating a new resource,
  and while that first request is in flight, they can initiate another, you
  will usually want to track these requests separately to provide the best user
  experience. To do this using named requests, you will either need to use a
  dynamic label, or some other approach such as a temporary ID.
