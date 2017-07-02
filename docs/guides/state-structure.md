# State Structure

Before we get into manipulating resource data, let's first cover how the data
is represented in your state tree.

### State Slices

Typical usage of Resourceful Redux involves using
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
  labels: {}
}
```

As you dispatch Action types, Resourceful Redux will make changes to these
values in a predictable way. We will cover what goes inside each of these pieces
in this guide.

### Resources

All of your resource data will be available in the state slice's `resources`
property. This is an object of resources of a single type.

Resourceful Redux enforces a
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
  labels: {
    // Request labels here
  }
}
```

The `resources` object allows you to quickly look up resources given their ID.
You may be wondering how ordering from the server is preserved. You use request
labels to do this, which is a concept we will cover shortly.

Keep in mind that Resourceful Redux doesn't care about the specific format that
your server sends the data back in. You just need to make sure that the resources
you pass into Resourceful Redux have an `id` attribute.

### Resource Metadata

Metadata about each of the resources in your state slice's `resources` array
is stored under the `meta` object of the slice. The `meta` object is similar to
the `resources` object, in that the keys are individual resource IDs.

Metadata includes information about requests, such as whether the resource is
being updated, or deleted. You can store additional, application-specific
metadata here, such as whether or not a resource is "selected" in your UI.

Resourceful Redux comes with built-in metadata for each resource, representing
the status of any CRUD request related to that resource. This built-in metadata
looks like the following:

```js
{
  createStatus: 'NIL',
  readStatus: 'NIL',
  updateStatus: 'NIL',
  deleteStatus: 'NIL'
}
```

These four keys represent the four CRUD actions. The values of the keys are
one of the four request statuses – `"NIL"`, `"PENDING"`, `"SUCCEEDED"`, or
`"FAILED"`, representing the status of any requests to CRUD that resource.

You're encouraged to store additional, application-specific metadata for your
resources, too. For instance, a common feature of applications is to allow a
user to "select" resources, before performing some action on the selection.
One thing you could do is store a `selected` boolean on the metadata, so
that it would look like:

```js
{
  createStatus: 'NIL',
  readStatus: 'NIL',
  updateStatus: 'NIL',
  deleteStatus: 'NIL',
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
  resources: [
    // The resources themselves are in here.
  ],
  meta: {
    2: {
      selected: true,
      createStatus: 'NIL',
      readStatus: 'NIL',
      updateStatus: 'NIL',
      deleteStatus: 'NIL'
    },
    23: {
      selected: true,
      createStatus: 'NIL',
      readStatus: 'NIL',
      updateStatus: 'NIL',
      deleteStatus: 'NIL'
    },
    100: {
      selected: false,
      createStatus: 'NIL',
      readStatus: 'NIL',
      updateStatus: 'NIL',
      deleteStatus: 'NIL'
    }
  },
  labels: { ... }
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
      createStatus: 'NIL',
      readStatus: 'NIL',
      updateStatus: 'NIL',
      deleteStatus: 'PENDING'
    },
    23: {
      selected: true,
      createStatus: 'NIL',
      readStatus: 'NIL',
      updateStatus: 'NIL',
      deleteStatus: 'PENDING'
    },
    100: {
      selected: false,
      createStatus: 'NIL',
      readStatus: 'NIL',
      updateStatus: 'NIL',
      deleteStatus: 'NIL'
    }
  },
  labels: { ... }
}
```

Any time that you have metadata associated with a single item, you can add it
to that resource's `meta` object to keep track of it.

Keep in mind that you don't _need_ to store any additional metadata here. For
instance, in the above example, if you'd rather have a `selectedIds` property
directly on your state instead, then you could do that. Just know that
the option is there to store your own, additional metadata per-resource within
`meta`.

### Labels

The last piece of the slice is called labels. Any time that you initiate a
CRUD operation request, you can assign it a label. A label is just a string,
such as `"createBook"`. Resourceful Redux associates the following data about
the request with your label:

1. which resources were returned by the request
2. the status (pending, failed, and so on) of the request

You might be wondering what labels are for. The Labels guide later on in
this documentation is dedicated to answering that question in detail. For now,
let's just look at what the structure of the `labels` is:

```js
{
  resources: {
    // The resources themselves are in here.
  },
  meta: {
    // The resource meta is in here.
  }
  labels: {
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
