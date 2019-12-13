# Request Keys

A request key is a string used to identify the request within the store. Request keys
are conceptually similar to resource IDs.

Request keys can be manually created, or you can use a key that is generated for
you by a library. This guide will cover both approaches.

For a request to create a new book, you might use the string `"createBook"`.
The resource slice in this situation might look like:

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

### Specifying a Request Key

Add the `requestKey` property to a [request action](./request-actions.md) to specify the key
for that request.

```js
import { actionTypes } fom 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceType: 'books',
  requestKey: 'searchBooks',
});
```

Every request has two actions associated with it: one when the request starts, and one
when the request ends. You should use the same request key for both of these actions. For
instance, if you use a particular key for the "pending" action, then you will want
to use that same key for the "success" action, too.

> Note: if you specify the `request` property on an action, then it will be used
> as both the key and the [name](../resources/request-names.md). This API is
> from Redux Resource < 3.0. Although it will continue to work into the future, it
> is recommended that you explicitly set `requestKey` and `requestName` separately
> going forward.

### Manual Request Keys

It is okay if you are not using a library that generates a request key for you. You will manually
specify your request keys, which isn't too hard to do if you follow a naming convention.

Here are some example request keys you could use:

- `createBook`
- `fetchBook`
- `fetchBooks`
- `updateBook`
- `deleteBook`

We recommend using a verb somewhere in the request key or name. Some good CRUD-related verbs are:

- create
- get
- read
- fetch
- retrieve
- search
- find
- filter
- update
- change
- delete
- remove

If you're associating the request with a [list](requests/updating-lists.md), then you may
want to use the list name in the request key/name as well. For instance, if the list is
`favorites`, and the request is for a user searching through their favorites, then you may use
`searchFavorites` as the key.

### Generated Request Keys

> Note: Official React bindings for Redux Resource are in the works, and it will generate
> request keys for you. This section describes how you might go about using generated
> request keys in your application today.
>
> Keep in mind that it is okay to use manually created keys. Generated keys aren't necessarily
> better.

If you're using a networking library that provides you with caching and/or request
deduplication features, then it may provide you with an identifying string that it generats
for each request. It may even call that string a key.

For instance, the libraries [React Request](https://github.com/jamesplease/react-request) and
[fetch-dedupe](https://github.com/jamesplease/fetch-dedupe) are both HTTP request libraries
that generate keys for you. If you're using those libraries with Redux Resource, then you can
use the key that they provide to you as the request key.

This example demonstrates using fetch-dedupe inside of a thunk action creator:

```js
import { getRequestKey, fetchDedupe } from 'fetch-dedupe';

export function fetchBooks(bookId) {
  const url = `/books/${bookId}`;
  const fetchOptions = { credentials: 'include' };

  const requestKey = getRequestKey({ url, method: 'GET' });
  const dedupeOptions = { requestKey };

  dispatch({
    type: 'READ_RESOURCES_PENDING',
    resourceType: 'books',
    resources: [bookId]
    requestKey,
  });

  return (dispatch) => {
    fetchDedupe(url, fetchOptions, dedupeOptions)
      .then(res => {
        dispatch({
          type: 'READ_RESOURCES_SUCCEEDED',
          resourceType: 'books',
          resources: [res.data],
          requestKey,
        });

        return res;
      })
      .catch(err => {
        dispatch({
          type: 'READ_RESOURCES_FAILED',
          resourceType: 'books',
          resources: [bookId],
          requestKey,
        });

        return err;
      });
  }
}
```

A problem that needs to be solved when using generated request keys is retrieving the request data from
the store within your components. We encourage you to write a component that provides you
with a `mapStateToProps` that fetches the request information automatically for you. Official
React bindings for Redux Resource are being developed, and that is how it will work. It will use
the library [React Request](https://www.github.com/jamesplease/react-request) under-the-hood.

### When to Use Request Keys

We recommend using a request key for every request. In some situations, though, you
can use resource metadata in lieu of a request object. When resources are being modified,
they have built-in metadata (such as `readStatus`) that will be updated to reflect
the action that is modifying them. This alternative approach can be
considered a convenience.

If you're manually creating request keys, then a rule of thumb to reduce the boilerplate
that you write is:

**Use a request key anytime that you do not have an ID, or a list of IDs, when you
dispatch a "pending" action.**

For example, if you attempt to fetch a book with ID of 23, then you _will_ have
an ID when you dispatch the "read pending" action (the ID is 23). So a
request key may not be necessary in this situation, since you can look up the request
status on book 23's metadata.

On the other hand, if you were to make a request to your backend for "the list
of books that were just released this past week," then you wouldn't have any IDs
at the time that you dispatch the "read pending" action. So you _need_ to use a
request key in this situation to determine the request status.

### An Example

When a request key is used, the status of the associated request is stored in
your state, and you can access it with
[`getStatus`](../api-reference/get-status.md):

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

### "Reusing" a Request Key

Request keys differ from IDs in that they don't need to be unique for every request. They can be,
and will frequently be, reused between different requests of the same 'type'.

For instance, if a user can create books in your application, then you could just use the key `createBook`
for every creation request. This works really well if you can assume that a user is only able to send off
one of these create requests at a time, which is a restriction that many applications adhere to.

We don't encourage using the same request key across different 'types' of actions.
For instance, if a user can create favorite books, as well as delete favorite books,
you should use something like `createFavorite` and `deleteFavorite` for these two
actions, rather than, say, using `changeFavorites` for both. This makes your code more
expressive, and also allows you to track both requests in the event that they are both
in flight at the same time.

#### A Note on Dynamic Keys

Developers who manually create request keys tend to make dynamic request keys. A dynamic request
key is any key that includes a variable, such as:

```
`fetchBook:${bookId}`
```

Dynamic keys can be useful, but you can frequently get away with static keys.

Here are some use cases for dynamic keys:

- Implementing response caching using request keys. If you plan to implement client-side
  caching, then you could get a more granular cache by storing some extra information
  about the request in the store. For more, check out
  [the recipe on caching](../recipes/caching.md).

- Supporting multiple of the same 'type' of request at once. If a user can delete
  a book, and then, while that first request is loading, initiate a second request
  to delete another book, then you will want two loading indicators on your app.

  A static request key, such as `deleteBook`, won't be enough to capture this
  information. You might choose to use a dynamic request key in this situation.

If you aren't doing either of those things, then it may be worth considering if you could
keep things simple by just using a static key.
