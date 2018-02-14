# Core Concepts

Redux Resource has two concepts: "Resources" and "Requests."

### Resources

A resource is an object of data that you interact with in your applications.
Typically, applications will have resources of several different "types." For
instance, if your web application manages a public library, then you might have
two resource types: "books" and "members."

Each individual resource has a unique ID, which differentiates it from other resources of the
same type. Resources typically have other attributes, too. Here's an example book resource:

```js
{
  id: '1312',
  title: 'The Hobbit',
  releaseYear: 1937,
  author: 'J.R.R. Tolkien'
}
```

In Redux Resource, each resource type will be kept in its own
[slice](http://redux.js.org/docs/recipes/reducers/UsingCombineReducers.html) of
your store.

An empty resource slice looks like the following:

```js
// "books" resource type slice
{
  resourceName: 'books',
  idAttribute: 'id',
  resources: {},
  meta: {},
  lists: {}
}
```

There are five parts of the resource slice:

- `resourceName`: The resource type (also known as the resource name).
- `idAttribute`: The attribute that represents the resource's unique identifier. Defaults to `id`.
- `resources`: The location of each resource's primary attributes
- `meta`: Additional information about each resource. You can store things\
  here that aren't persisted to a remote server.
- `lists`: A way to store ordered arrays of resources.

##### Resources

In the `resources` section of the slice, each key of the object is the resource's ID. This
looks like the following:

```js
// "books" resource type slice
{
  resourceName: 'books',
  idAttribute: 'id',
  resources: {
    24: {
      // Attributes of book 24
    },
    100: {
      // Attributes of book 100
    }
  },
  meta: {},
  lists: {}
}
```

This structure makes it convenient to quickly access a resource's attributes if you
know its ID.

##### Resource Metadata

Typically, client-side applications need to store additional information about
resources, such as if the resource has been "selected" by a user, or maybe
information about the resource that has been input into a form.

Resource metadata is for this purpose. It's any information that is **not**
persisted to a remote server.

In Redux Resource, all metadata is stored on an object. This meta object,
like the resources object, has resource IDs as its keys, and has values that are
metadata. An example is:

```js
// "books" resource type slice
{
  resourceName: 'books',
  idAttribute: 'id',
  resources: {},
  meta: {
    24: {
      // Metadata for book 24
    },
    100: {
      // Metadata for book 100
    }
  },
  lists: {}
}
```

##### Resource Lists

Often, applications need to keep track of ordered groupings of resources. For instance,
has a user selected certain books on the interface? Or did you fetch a user's recent book
purchases from a server, sorted by purchase date?

In Redux Resource, both of these situations can be handled using resource lists.

Lists in your store are an array of resource IDs. A resource's lists might look
like the following:

```js
{
  resourceName: 'books',
  idAttribute: 'id',
  resources: {},
  meta: {},
  lists: {
    searchResults: [10, 233, 4, 50],
    shoppingCart: [10, 409],
  }
}
```

Redux Resource provides Redux actions for you to create, update, and delete lists.

### Requests

Resources are frequently stored in an external system somewhere (such as a remote
database), and [CRUD operations]((https://en.wikipedia.org/wiki/Create,_read,_update_and_delete))
with these resources occur over a network. In Redux Resource, any interaction
with a resource over a network is called a "request." 

Typically, requests are HTTP requests, but they can represent anything that is
asynchronous. The primary characteristic of requests is that they do not occur instantly.
They take time to complete, and they don't always succeed.

In Redux Resource, this information is represented as one of four "statuses":

- `IDLE`: the request hasn't begun yet
- `PENDING`: the request has started, but has not yet finished
- `FAILED`: the request was unsuccessful
- `SUCCEEDED`: the request was successful

Additionally, a request keeps track of which resources it affected.

Every request in Redux Resource is stored within a single slice in your Redux store. A request
slice looks like the following:

```js
//
{
  readFavoriteBooks: {
    // A key that can be used for caching the requests. A later guide will
    // cover this in more detail.
    requestKey: 'readFavoriteBooks',
    // A name for the request. Useful for debugging. In this
    // example, the name of the request is the same
    // as the key, but they can be different for very
    // granular caching.
    requestName: 'readFavoriteBooks',
    // Which CRUD action this request represents
    crudAction: 'read',
    // The request status
    status: 'PENDING',
    // The resources that were affected by this crud action
    resources: {
      books: [24, 10, 50]
    }
  }
}
```

When you use Redux Resource, the status of **every** CRUD operation that you
make in your application is stored in your application's state tree.

By storing this information at such a granular level, Redux Resource provides
a robust foundation from which you can build truly great user experiences. And
you don't even need to write any boilerplate.
