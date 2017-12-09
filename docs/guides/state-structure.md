# State Structure

Before we get into manipulating resource data, let's first cover how the data
is represented in your state tree.

### State Slices

Typical usage of Redux Resource involves using
[`combineReducers`](http://redux.js.org/docs/api/combineReducers.html) to
separate each type of resource into its own "slice" within your overall state
tree. Each of these slices will store information about a single type of
resource, separate from your other types of resources.

In the rest of this guide, we will be talking about the structure of a single
state slice. If you're not using `combineReducers`, then the slice will instead
be your entire state tree.

### Initial State

The initial state slice has the following shape:

```js
{
  resources: {},
  meta: {},
  lists: {},  
  requests: {}
}
```

As you dispatch Action types, Redux Resource will make changes to these
values in a predictable way. We will cover what goes inside each of these pieces
in this guide.

### Resources

All of your resource data will be available in the state slice's `resources`
property. This is an object of resources of a single type.

Redux Resource enforces a
[normalized](https://en.wikipedia.org/wiki/Database_normalization) structure to
your data: each individual resource can be found in exactly one place in the
state tree.

For instance, if your server returns the following JSON response body:

```js
{
  data: [
    {
      id: 23,
      firstName: 'Sally'
    },
    {
      id: 100,
      firstName: 'Jane'
    }
  ]
}
```

then your state slice will end up looking like this:

```js
{
  resources: {
    23: {
      id: 23,
      firstName: 'Sally'
    },
    100: {
      id: 100,
      firstName: 'Jane'
    }
  },
  meta: {
    // Resource metadata here
  },
  lists: {
    // Resource lists go here
  },
  requests: {
    // Named requests here
  }
}
```

The `resources` object allows you to quickly look up resources given their ID.
You may be wondering how ordering from the server is preserved. You use "lists"
for this, which is a feature that we will cover shortly.

Keep in mind that Redux Resource doesn't care about the specific format that
your server sends the data back in. You just need to make sure that the resources
you pass into Redux Resource have an `id` attribute.

### Resource Metadata

Metadata about each of the resources in your state slice's `resources` array
is stored under the `meta` object of the slice. The `meta` object is similar to
the `resources` object, in that the keys are individual resource IDs.

Metadata includes information about requests, such as whether the resource is
being updated, or deleted. You can store additional, application-specific
metadata here, such as whether or not a resource is "selected" in your UI.

Redux Resource comes with built-in metadata for each resource, representing
the status of any CRUD request related to that resource. This built-in metadata
looks like the following:

```js
{
  createStatus: 'IDLE',
  readStatus: 'IDLE',
  updateStatus: 'IDLE',
  deleteStatus: 'IDLE'
}
```

These four keys represent the four CRUD actions. The values of the keys are
one of the four request statuses – `"IDLE"`, `"PENDING"`, `"SUCCEEDED"`, or
`"FAILED"`, representing the status of any requests to CRUD that resource.

You're encouraged to store additional, application-specific metadata for your
resources, too. For instance, a common feature of applications is to allow a
user to "select" resources, before performing some action on the selection.
One thing you could do is store a `selected` boolean on the metadata, so
that it would look like:

```js
{
  createStatus: 'IDLE',
  readStatus: 'IDLE',
  updateStatus: 'IDLE',
  deleteStatus: 'IDLE',
  selected: false
}
```

Let's look at an example to see how this metadata changes as the user interacts
with your application. Consider an application where a user can select resources
from a list, and then take action on their selection (such as updating or
deleting the selected items). If the user has selected two resources, with
IDs `2` and `23`, then their state slice will look like the following:

```js
{
  resources: {
    // The resources themselves are in here.
  },
  meta: {
    2: {
      selected: true,
      createStatus: 'IDLE',
      readStatus: 'IDLE',
      updateStatus: 'IDLE',
      deleteStatus: 'IDLE'
    },
    23: {
      selected: true,
      createStatus: 'IDLE',
      readStatus: 'IDLE',
      updateStatus: 'IDLE',
      deleteStatus: 'IDLE'
    },
    100: {
      selected: false,
      createStatus: 'IDLE',
      readStatus: 'IDLE',
      updateStatus: 'IDLE',
      deleteStatus: 'IDLE'
    }
  },
  lists: { ... },
  requests: { ... }
}
```

If the user then clicks a "Delete" button to initiate the deletion of these
resources, the slice would then look like this:

```js
{
  resources: {
    // The resources themselves are in here.
  },
  meta: {
    2: {
      selected: true,
      createStatus: 'IDLE',
      readStatus: 'IDLE',
      updateStatus: 'IDLE',
      deleteStatus: 'PENDING'
    },
    23: {
      selected: true,
      createStatus: 'IDLE',
      readStatus: 'IDLE',
      updateStatus: 'IDLE',
      deleteStatus: 'PENDING'
    },
    100: {
      selected: false,
      createStatus: 'IDLE',
      readStatus: 'IDLE',
      updateStatus: 'IDLE',
      deleteStatus: 'IDLE'
    }
  },
  lists: { ... },
  requests: { ... }
}
```

Any time that you have metadata associated with a single item, you can add it
to that resource's `meta` object to keep track of it.

Keep in mind that you don't _need_ to store any additional metadata here. For
instance, in the above example, if you'd rather have a `selectedIds` property
directly on your state slice instead, then you could do that. Just know that
the option is there to store your own, additional metadata per-resource within
`meta`.

### Lists

Lists are a way to keep track of _ordered subsets_ of resources. The `resources`
section of the slice (described above), is useful in that it provides a single
location for all resources of a single type to live. It's also useful because
it provides quick lookups for all resources, given their ID.

The `resources` object does not account for two things that applications
commonly need:

The first is keeping track of ordering. JavaScript objects are unordered, so they
are unable to keep track of, say, the order that a server returns your resources in.

The second is keeping track of different groups of resources. Imagine an
application for managing books, where the user has a list of books returned
by a search result, and also a shopping cart with a list of books.

Because these are the same resource (books), they belong in the same slice.
But there are two different "groupings" of them, and they may have a different
order.

Lists lets you do both of these things. Lists allow you to keep track of an ordering
that the server returns to you, and you can have as many lists as you'd like.

Using the above example, let's see what those lists might look in the state slice:

```js
{
  resources: {
    // The resources themselves are in here.
  },
  meta: { ... },
  lists: {
    shoppingCart: [24, 100, 10],
    searchResults: [9, 34, 782, 24, 30]
  },
  requests: { ... }
}
```

### Requests

The last piece of the slice is called "requests." Any time that you initiate a
CRUD operation request, you can assign it a name. A name is just a string,
such as `"createBook"`. Redux Resource associates the following data about
the request with your named request:

1. the lifecycle status (pending, failed, and so on) of the request
1. which resources were returned by the request

The primary use case for named requests is to track statuses in your
application. In the above section on `meta`, we used the fact that some
requests target specific resources (by their ID) to track the request
status on the resource's metadata.

We can't always do that, though. Consider a request that searches for books
by the title that the user has typed in. There's no specific ID associated
with this request, so we can't store information about the request with a
resource's metadata. By giving requests like these a name, we can keep track
of their lifecycle, too.

The structure of a slice with named requests looks like the following:

```js
{
  resources: {
    // The resources themselves are in here.
  },
  meta: {
    // The resource meta is in here.
  },
  lists: {
    // Lists are in here
  },
  requests: {
    createBook: {
      ids: [],
      status: 'PENDING'
    },
    shoppingCart: {
      ids: [1, 20, 53],
      status: 'SUCCEEDED'
    },
    recentBooks: {
      ids: [20, 71, 100, 102, 103, 120],
      status: 'SUCCEEDED'
    }
  }
}
```

Now that you know how data is stored, you're ready to start building
Redux Actions to modify this data.
