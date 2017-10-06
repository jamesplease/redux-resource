# Lists

When you read or create resources, they get added to the `resources` object
within your state slice. This is useful for quick lookups of a single
resource, but there are a few things this doesn't let you do:

1. keep track of resource ordering
2. manage subsets of resources

Lists allow you to do both of these things. We will consider these two use cases
more in-depth in this guide, but first, let's cover how to use lists.

### Using Lists

To use a list, add the `list` property to your
[CRUD operation actions](./crud-actions.md).

```js
import { actionTypes } fom 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceName: 'books',
  list: 'mostPopular'
});
```

You only need to specify a list for create or read actions. Because lists
only store IDs, they get resource updates automatically. And successful
deletes will remove the deleted resources from all lists automatically.

> Note: If you specify a list for other actions, nothing bad will happen. It's
  just not necessary.

### Why Use Lists

There are two use cases for lists. Let's look at them.

#### Ordering

In your state slice, resources aren't stored in any order: they're just
keys on the `resources` object. Frequently, applications will need to preserve
the order that the server returns a list of resources in. For instance, if you
make a request for a list of books ordered by popularity.

Lists are an array of IDs of resources, and they retain server side ordering.

When the request to retrieve the most popular books succeeds, your state slice
may look like something like:

```js
{
  lists: {
    mostPopular: [1002, 24, 100, 234]
  },
  resources: {
    // Resources and their attributes are in here
  },
  meta: {
    // Metadata about resources is stored in here
  },
  requests: {
    // Named requests go here
  }
}
```

#### Ordered Subsets of Resources

In the earlier guide on [State Structure](/docs/guides/state-structure.md), we
covered that all resources of the same type are kept in a single object. This is
a good thing, but it introduces a problem: how do you keep track of "groups" of
the same resource?

Consider a web application shows a list of recently released
books, as well as a user's shopping cart of books. We know that in the state
tree, all of these books will be stored in one object, but we will want to show
them as two different lists in the interface.

Because you can have any number of lists, you can use lists to keep these
resources separate.

### Replacing List IDs

By default, subsequent successful requests with the same list will _merge_
the old list IDs with the new. You can outright replace the old list with the
new by passing `mergeListIds: false` in your action. For instance:

```js
import { actionTypes } fom 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_SUCCEEDED,
  resourceName: 'books',
  list: 'mostPopular',
  mergeListIds: false,
  // `newResources` is the list of books that were returned by the server
  // for this query.
  resources: newResources
});
```

### Naming Lists

I like naming my lists in a way that describes what they are. For instance, `usersBooks`, `shoppingCart`,
or `favoriteBooks`. Then, I use named requests that represent CRUD operations against that list. For instance:

```
{
  request: 'readFavoriteBooks',
  list: 'favoriteBooks'
}
```

```
{
  request: 'createFavoriteBook',
  list: 'favoriteBooks'
}
```

> :information_desk_person: Remember, you only need to specify the list for read and
  create CRUD operations.

### Avoid Dynamic Lists

As with named requests, dynamically-named lists are harder to reason about.
We strongly recommend that you use statically-named lists whenever possible.

There may be valid reasons to use dynamically-named lists, but they are few
and far between.

### More Reading

For more on lists, refer to [the Lists FAQ](/docs/faq/lists.md).
