# State Structure

Before we start manipulating resource data, let's first cover how the data
is represented in your state tree.

### State Slices

Typical usage of Resourceful Redux involves using
[`combineReducers`](http://redux.js.org/docs/api/combineReducers.html) to
separate each type of resource into its own "slice" within your overall state
tree. Each of these slices will store information about a single type of
resource, separate from your other types of resources.

In the rest of this guide, we will be talking about the structure of the "state".
If you're using `combineReducers`, then we will be talking about one individual
state slice. And if you're not, then the word "state" will refer to the entire state
tree.

### Initial State

The initial state has the following shape:

```js
{
  resources: [],
  meta: {},
  labels: {}
}
```

As you dispatch Action types, Resourceful Redux will make changes to these
values in a predictable way. We will cover what goes inside each of these pieces
in this guide.

### Resources

All of your resource data will be available in the state's `resources`
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

then your state will end up looking like this:

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

Metadata about each of the resources in your state's `resources` array
is stored under the `meta` object of the state. The `meta` object is similar to
the `resources` object, in that the keys are individual resource IDs.

Metadata includes information about requests, such as whether the resource is
being updated, or deleted. You can store additional, application-specific
metadata here, such as whether or not a resource is "selected" in your UI.

Resourceful Redux comes with built-in metadata for each resource, representing
the status of any CRUD request related to that resource. This built-in metadata
looks like the following:

```js
{
  createStatus: 'NULL',
  readStatus: 'NULL',
  updateStatus: 'NULL',
  deleteStatus: 'NULL'
}
```

These four keys represent the four CRUD actions. The values of the keys are
one of the four request statuses – `"NULL"`, `"PENDING"`, `"SUCCEEDED"`, or
`"FAILED"`, representing the status of any requests involving that resource.

Let's look at an example. Consider an application where a user can "select"
resources from a list, and then take action on their selection (such as updating
or deleting the selected items). If the user has selected two resources, with
IDs `2` and `23`, then a section of their state might look like something like
the following:

```js
{
  resources: [
    // The resources themselves are in here.
  ],
  meta: {
    2: {
      selected: true,
      createStatus: 'NULL',
      readStatus: 'NULL',
      updateStatus: 'NULL',
      deleteStatus: 'NULL'
    },
    23: {
      selected: true,
      createStatus: 'NULL',
      readStatus: 'NULL',
      updateStatus: 'NULL',
      deleteStatus: 'NULL'
    },
    100: {
      selected: false,
      createStatus: 'NULL',
      readStatus: 'NULL',
      updateStatus: 'NULL',
      deleteStatus: 'NULL'
    }
  },
  labels: { ... }
}
```

If the user then clicks a "Delete" button to initiate the deletion of these
resources, the state would then look like this:

```js
{
  resources: {
    // The resources themselves are in here.
  },
  meta: {
    2: {
      selected: true,
      createStatus: 'NULL',
      readStatus: 'NULL',
      updateStatus: 'NULL',
      deleteStatus: 'PENDING'
    },
    23: {
      selected: true,
      createStatus: 'NULL',
      readStatus: 'NULL',
      updateStatus: 'NULL',
      deleteStatus: 'PENDING'
    },
    100: {
      selected: false,
      createStatus: 'NULL',
      readStatus: 'NULL',
      updateStatus: 'NULL',
      deleteStatus: 'NULL'
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
the option is there to store your own, additional metadata on the `meta` object.

### Labels

The last piece of the state is called labels. Labels are a feature of
Resourceful Redux to help you keep your requests and resources more organized.

Any time that you perform a request, you can assign it a label.
Resourceful Redux keeps track of two pieces of information about labeled
requests:

1. which resources were associated with the request
2. the status (pending, failed, and so on) of the request

To understand how labels can be useful, consider an application that manages
books. There might be a page in your application that lets users view the
latest books that just came out this week.

That same page that might also have a sidebar that shows the books that are
in a user's shopping cart.

In Resourceful Redux, all of these books will be stored together in the
`resources` array. How can you, as a developer, know which books are the ones in
the shopping cart, and which are the ones that were just released?

The answer is to use a label. We will get to the specifics of how you use labels
to resolve situations like these shortly, but for now, let's look at what the
store might look like in this example:

```js
{
  resources: {
    // The resources themselves are in here.
  },
  meta: {
    // The resource meta is in here.
  }
  labels: {
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
[Actions](http://redux.js.org/docs/basics/Actions.html) to modify this data.
