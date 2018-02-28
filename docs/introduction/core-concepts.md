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

The slices contain not just the "raw" resource data, but also other information
that help you to manage and organize the data on the client.

There are five pieces within a resource slice:

- `resourceType`: The resource type (such as "books" or "authors")
- `resources`: The location of individual resource's primary attributes
- `meta`: Additional information about individual resources. You can store information
  here that isn't persisted to a remote server.
- `lists`: A way to store ordered arrays of resources.
- `requests`: Information about the requests that are modifying this resource type (requests
  will be covered in greater detail in the "Requests" section of this guide)

An empty resource slice looks like the following:

```js
// "books" resource slice
{
  resourceType: 'books',
  resources: {},
  meta: {},
  lists: {},
  requests: {}
}
```

##### Resources

In the `resources` section of the slice, each key of the object is the resource's ID. This
looks like the following:

```js
// "books" resource type slice
{
  resourceType: 'books',
  resources: {
    24: {
      // Attributes of book 24
    },
    100: {
      // Attributes of book 100
    }
  },
  meta: {},
  lists: {},
  requests: {}
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
  resourceType: 'books',
  resources: {},
  meta: {
    24: {
      // Metadata for book 24
    },
    100: {
      // Metadata for book 100
    }
  },
  lists: {},
  requests: {}
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
  resourceType: 'books',
  resources: {},
  meta: {},
  lists: {
    searchResults: [10, 233, 4, 50],
    shoppingCart: [10, 409],
  },
  requests: {}
}
```

Redux Resource provides Redux actions for you to create, update, and delete lists.

##### Requests

The last section of the resource slice is called `requests`. This is an object
where each key is maps to a request object, described below.

### Requests

Request objects represent network requests, such as HTTP requests. Like resources,
they are stored in the store.

Typically, requests are HTTP requests, but they can represent anything that is
asynchronous. The primary characteristic of requests is that they do not occur instantly.
They take time to complete, and they don't always succeed.

In Redux Resource, this characteristic of requests is represented as one of four "statuses":

- `IDLE`: the request hasn't begun yet
- `PENDING`: the request has started, but has not yet finished
- `FAILED`: the request was unsuccessful
- `SUCCEEDED`: the request was successful

In addition to having a status, a request keeps track of the resources it operated upon.

Requests in Redux Resource are associated with a resource type, which is the primary resource
type that is being affected by the request. Accordingly, the requests can be found within
that resource's slice, under the `requests` key.

Within `requests`, each key is a "request key," which is a string used to identify that request.
A request with the key `"readFavoriteBooks"` would be stored like the following:

```js
{
  resourceType: 'books',
  resources: {},
  meta: {},
  lists: {},
  requests: {
    readFavoriteBooks: {
      requestKey: 'readFavoriteBooks',
      status: 'SUCCEEDED',
      // The resources that were affected by this crud action
      ids: [24, 10, 50]
    }
  }
}
```

### Conclusion

When you use Redux Resource, information about **every** CRUD operation that you
make in your application is stored in your application's state tree.

By storing this information at such a granular level, Redux Resource provides
a robust foundation from which you can build truly great user experiences. And
you avoid writing a substantial amount of boilerplate code.
