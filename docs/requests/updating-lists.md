# Updating Lists

When a request succeeds, you will frequently want to add the resources returned
by the response to a [list](/docs/resources/lists.md). There is a convenient way
to do this using the [request actions](/docs/requests/request-actions.md).

> Note: if you're not familiar with resource lists, then you may want to
> read [the documentation for them](/docs/resources/lists.md) before continuing.  

### Specifying a List

To specify the list to add the resources to, add the `list` property to a 'successful'
[request action](./request-actions.md).

```js
import { actionTypes } fom 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_SUCCEEDED,
  resourceType: 'books',
  list: 'mostPopular',
  requestKey: 'getMostPopular'
  // `newResources` is the list of books that were returned by the server
  // for this request.
  resources: newResources
});
```

You only need to specify a list for create or read *success* actions. Nothing happens
if you specify a list for an update or delete action.

> Note: deleted resources will automatically be removed from any list that they are
> included in.

### Why Specify a List

There are two main reasons to specify a list when making a request. The
[`getResources`](/docs/api-reference/get-resources.md) function lets you
quickly access resources given a list name.

For instance, if you specify the list `"favoriteBooks"` when a request succeeds
for fetching a user's favorite books, then you can access the resources returned by
that request using the following snippet:

```js
import { getResources } from 'redux-resource';
import store from './my-store';

const state = store.getState();
const favoriteBooks = getResources(state.books, 'favoriteBooks');
```

Convenience aside, lists enable you to do sligtly complicated, but common task that is more
difficult to do otherwise. The situation it helps in is where the application fetches a collection of
resources that the user can then modify.

An example may help demonstrate this. Consider a page that displays a user's favorite books. When the user
navigates to the page, a request to fetch the favorite books is made.

After the request completes, the user is able to add or delete favorite books. After they
add or delete a book, you want the favorite books that are displayed to them to reflect their
changes.

There are two ways to do this:

1. after the create or delete request succeeds, you make a second request to fetch
  the list of favorite books a second time, so that the list is up-to-date
2. after the create or delete request succeeds, you update the local list of favorite books
  without making a second request

Both of these approaches are great. You can do whichever you think is best.

If you decide to go with the second method, then using a list makes this straightforward to do. It
works like this: when the request to fetch the favorite books succeeds, you can add the resources to the
`favoriteBooks` list. Then, when the user creates or deletes a new favorite book, you modify the
list.

### Replacing List IDs

By default, subsequent requests with the same list will _merge_ the old list IDs with the
new IDs. You can replace the old list with the new by passing `mergeListIds: false` in your
action. For instance:

```js
import { actionTypes } fom 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_SUCCEEDED,
  resourceType: 'books',
  list: 'mostPopular',
  mergeListIds: false,
  // `newResources` is the list of books that were returned by the server
  // for this request.
  resources: newResources
});
```

### More Reading

For more on lists, refer to [the lists guide](/docs/resources/lists.md) and
[the Lists FAQ](/docs/faq/lists.md).
