# Keys and Names

### Request Keys

Every request object must have a key, which is a string used to identify the request
within the store. Request keys are conceptually similar to resource IDs.

For instance, if you're creating a book, you might use the key `"createBook"`
for that request. In your store slice, each keyed request is stored within the
`requests` key. Continuing with our example, the resource slice might look like:

```js
{
  resourceType: 'books',
  requests: {
    createBook: {
      requestKey: 'createBook',
      status: 'SUCCEEDED',
      ids: [24]
    }
  },
  // ...there are other things here, too
}
```

This request object represents that this request succeeded, and that the resource with ID
of 24 was created.

### Request Names

Another property of requests is a request name. Request names are optional, human-readable
descriptions of what the request's intention is.

Request names are like function names in JavaScript. Although we could use anonymous
functions everywhere, we tend to give functions names so that developers know what
they do.

### Keys vs. Names

Request keys and request names are similar, but they serve different purposes.

Request _names_ cover a "type" of request, such as a search for books. But keys
allow you to be more granular, storing the details of each specific search.

An example might demonstrate this more clearly. Consider an endpoint that lets you
search for books by their title. If a user searches twice, first for "Harry Potter"
and then for "Lord of the Rings," you might generate two different keys for these
searches, such as `"searchBooks:Harry+Potter"` and `searchBooks

The difference between the two is that names cover a broad range of requests. They
function more like categories. Keys, on the other hand, can be more granular. The
additional granularity provided by keys can help implement features such as response
caching or request deduplication.

For instance, you might give a request the name `"searchBooks", which represents any
request that is used for searching books using a particular API endpoint. However,
depending on the information that you pass to the endpoint (such as the specific
search terms), a different key could be generated.

A simple key for these 

This allows you to store two entries in your store for two different searches, say,
one for "Lord of the Rings" and the other for "Harry Potter." But because they have
the same name, a developer can understand that they were both the same "kind" of
request (namely, a search for books).

If you are manually creating request keys, then you will typically not need to
distinguish between the two. You can either use the same string, or omit the
`requestName` altogether.

### Using Keys and Names

Using request keys and names is straightforward: add the `requestKey` or `requestName`
property to a [request action](./request-actions.md).

```js
import { actionTypes } fom 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceType: 'books',
  requestKey: 'searchBooks:lordOfTheRings',
  requestName: 'search'
});
```

You should use the same key and name for the start and end action of the request. For
instance, if you use a particular key for the "pending" action, then you will want
to use that same key for the "success" action, too.

> Note: if you specify the `request` property on an action, then it will be used
> as both the key and the name. This API is from Redux Resource < 3.0. Although
> it will continue to work into the future, it is recommended that you explicitly
> set `requestKey` and `requestName` separately going forward.

### When to Use Request Keys

You can use request keys for every request. It could be considered a
convenience to _not_ use the request key, and to access the request status on
resource metadata directly.

If you're manually writing actions, then a rule of thumb to reduce the boilerplate
that you write is:

**Use a request key anytime that you do not have an ID, or a list of IDs, when you
dispatch a "pending" action.**

For example, if you attempt to read a book with ID of 23, then you _will_ have
an ID when you dispatch the "read pending" action (the ID is 23). So a
request key may not be necessary in this situation, since you can look up the request
status on book 23's metadata.

On the other hand, if you were to make a request to your backend for "the list
of books that were just released this past week," then you wouldn't have any IDs
at the time that you dispatch the "read pending" action. So you need to use a
request key in this situation to determine the request status.

### An Example

When a request key is used, the status of the associated request is stored in
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
//   idle: false,
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

Now when you call `getStatus` using this request key, you get the following object:

```js
{
  idle: false,
  pending: false,
  failed: false,
  succeeded: true
}
```

### Tips

If you are using a library like `fetch-dedupe`, then you should use the `requestKey`
in that library as the request key.

If you are using `fetch-dedupe`, then the following naming guidelines apply to the
request name. Otherwise, you can use the following guidelines when coming up
with a request key.

We recommend using a verb somewhere in the request key or name. For instance, `getFavorites`
rather than just `favorites`.

Some good CRUD-related verbs are:

- create
- get
- read
- fetch
- retrieve
- search
- find
- update
- change
- delete
- remove

If you're associating the request with a [list](/docs/requests/updating-lists.md), then you may
want to use the list name in the request key/name as well. For instance, if the list is
`favorites`, and the request is for a user searching through their favorites, then you may use
`searchFavorites` as the name or key.

### "Reusing" a Request Key

Request keys differ from IDs in that they don't need to be completely unique for every request.

Just be sure that you're reusing the key for the same 'type' of request. For instance, if a user
can create books in your application, and you wish to use a request key for that action, then
you can just use the key `createBook` for every creation request. This works really well assuming
that a user is only able to send off one create request at a time.

We don't encourage using the same request key across different 'types' of actions.
For instance, if a user can create favorite books, as well as delete favorite books,
you should use something like `createFavorite` and `deleteFavorite` for these two
actions, rather than, say, using `changeFavorites` for both. This makes your code more
expressive, and also allows you to track both requests in the event that they are both
are in flight at the same time.

#### A Note on Dynamic Keys

If you are manually creating request keys, then you should be careful when using dynamic keys.
A dynamic request key is any key that includes a variable. Common dynamic keys that developers use are:

1. serializing a search to create unique keys for each search
2. serializing a new resource's attributes to create a unique request key for each
  created resource
2. putting a resource ID in a key

Dynamic keys can be useful in some situations, such as for implementing request deduplication
or response caching, but they are often not needed. The benefit to using static keys, such as
`"create"` is that they're easier to reason about, and are less prone to errors.

Here are two use cases for dynamic keys, although there may be more:

- Caching by request key. There's no official caching system within redux-resource,
  but using request keys is one way that would work well. If you want to cache, say,
  a user's search results based on what they enter, then you may want to serialize
  the search so that you can look it up later. For more, refer to
  [the recipe on caching](/docs/recipes/caching.md).

- Supporting multiple of the same 'type' of request at once, when you are unable to
  track the request statuses on a resource's metadata. That's a lot to take in, so
  let's disect that.

  If you can track a request status on a resource's metadata, then you don't need
  request keys at all. Consequently, you also don't need a dynamically keyed
  request.

  An example where you (typically) don't have an ID is when a user is creating
  a new resource. If a user can begin the process for creating a new resource,
  and while that first request is in flight, they can initiate another, you
  will usually want to track these requests separately to provide the best user
  experience. To do this using request keys, you will either need to use a
  dynamic label, or some other approach such as a temporary ID.
