# Core Concepts

Understanding these core concepts is useful when using Redux Resource.

### Resources

A resource is an entity that you interact with in your application. For
instance, if your web application manages a public library, then you might have
two resources: "books" and "members."

Each instance of a resource has a unique ID, which differentiates it from other
resources of the same time. They typically also have attributes, such as "name"
or "releaseYear."

Resources don't necessarily need to represent tangible objects. They can be more
abstract things, too, such as "workflows" or "permissions."

In Redux Resource, each resource will be kept in its own
[slice](http://redux.js.org/docs/recipes/reducers/UsingCombineReducers.html) of
your store. Within that slice, all of the resources of a single type are kept in
an object, where the key of the object is the resource's ID. This looks like the
following:

```js
{
  resources: {
    24: {
      // Attributes of book 24
    },
    100: {
      // Attributes of book 100
    }
  }
}
```

### Resource Metadata

In addition to an ID and attributes, resources have "metadata" about them, which
is additional information about a resource that is useful for your interface.
For instance, if your interface displays a list of books that the user can
select by clicking checkboxes, then the information about which books are
selected would be metadata about the books resource.

A rule of thumb is that metadata is any data about a resource that is **not**
persisted to a remote server.

In Redux Resource, all metadata is stored on an object. This meta object,
like the resources object, has resource IDs as its keys, and has values that are
metadata. An example is:

```js
{
  meta: {
    24: {
      // Metadata for book 24
    },
    100: {
      // Metadata for book 100
    }
  }
}
```

### Lists

Often, applications need to keep track of ordered groupings of resources. In
Redux Resource, this is done through a concept named "lists."

Lists in your store are an array of resource IDs. A resource's lists might look
like the following:

```js
{
  lists: {
    searchResults: [10, 233, 4, 50],
    shoppingCart: [10, 409],
  }
}
```

As a user interacts with your application, Redux Resource provides a straightforward
API to keep lists up-to-date.

### CRUD Operations

There are four interactions you can have with a resource: you can create them,
retrieve them, update them, or delete them. These four operations are
collectively known as
[CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete).

### CRUD Operation Requests

For many applications, resources are stored in an external system, and
CRUD operations with the resources occur over a network. These interactions are
called "requests." Typically, they are HTTP requests.

Because requests occur over a network, they do not happen instantly.
They might take awhile to complete, and they don't always succeed.
In Redux Resource, this information is represented as one of four "statuses":

- `IDLE`: the request hasn't begun yet
- `PENDING`: the request has started, but has not yet finished
- `FAILED`: the request was unsuccessful
- `SUCCEEDED`: the request was successful

When you use Redux Resource, the status of **every** CRUD operation that you
make in your application is stored in your application's state tree.

For requests that target specific resources by their ID, the request status will
be associated with those resources. So if you had one resource with an ID of 24,
then your metadata for that resource will start off looking like this:

```js
{
  meta: {
    24: {
      createStatus: 'IDLE',
      readStatus: 'IDLE',
      updateStatus: 'IDLE',
      deleteStatus: 'IDLE'
    }
  }
}
```

For requests that don't target a resource (or resources) by ID, you can assign
the request a "name." A name is just a string that you can use to look up that
request's status.

By storing this information at such a granular level, Redux Resource provides
a robust foundation from which you can build truly great user experiences. And
you don't even need to write any boilerplate.
