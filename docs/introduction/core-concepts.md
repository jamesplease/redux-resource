# Core Concepts

Resourceful Redux is intended to be a simple solution to a complicated problem.

### Resources

A resource is an entity that you interact with in your application. For
instance, if your web application manages a public library, then you might have
two resources: "books" and "members."

Each instance of a resource has a unique ID, which differentiates it from other
resources of the same time. They typically also have attributes, such as "name"
or "releaseYear."

Resources don't necessarily need to represent tangible objects. They can be more
abstract things, too, such as "workflows" or "permissions."

In Resourceful Redux, each resource will be kept in its own
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

In Resourceful Redux, all metadata is stored on an object. This meta object,
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
In Resourceful Redux, this information is represented as one of four "statuses":

- `NULL`: the request hasn't begun yet
- `PENDING`: the request has started, but has not yet finished
- `FAILED`: the request was unsuccessful
- `SUCCEEDED`: the request was successful

In Resourceful Redux, each individual resource has a request status for each of
the four CRUD operations associated with it. This information is the default
meta that you get for each resource. If you had one resource with an ID of 24,
then your metadata will start off looking like this:

```js
{
  meta: {
    24: {
      createStatus: 'NULL',
      readStatus: 'NULL',
      updateStatus: 'NULL',
      deleteStatus: 'NULL'
    }
  }
}
```

Resourceful Redux keeps this metadata up-to-date for each resource as users use
your app.

This reduces the boilerplate code that you need to write, giving you more time
to build your application.
