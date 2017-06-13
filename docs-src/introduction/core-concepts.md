# Core Concepts

There are there core concepts in resourceful-redux.

### Resources

A resource is an abstract object that you interact with in your application. For
instance, if your web application manages a public library, then you might have
two resources: "books" and "members."

Resources typically have attributes, such as a "name" or "releaseYear."

For many web applications, resources are stored in an external system, and
interactions with the resources occur over a network. These interactions are
called "Requests."

### Requests

Requests are asynchronous actions related to a resource. Often times, they are
HTTP requests.

There are four operations you can perform against a resource using requests: you
can create them, retrieve them, update them, or delete them. These four
operations are collectively known as
[CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete).

Because Requests often occur over a network, they do not complete instantly.
They might take awhile to resolve, or they might fail. Because of this, there is
a notion of a "Request Status." This is the state that the request is in. All
requests are always in one of four states:

- `NULL`: the request hasn't begun yet
- `PENDING`: the request has started, but has not yet finished
- `FAILED`: the request was unsuccessful
- `SUCCEEDED`: the request was successful

### Resource Metadata

It was stated before that resources often have attributes associated with them,
like "name" or "releaseYear." Resources can also have _metadata_ associated with
them. Metadata is additional information stored about a resource that is not
part of the resource itself.

Imagine that there is a particular book that a user of your application is
going through the process of deleting. As a developer, it is useful to know when
the delete request is in flight, and then if it fails or if it succeeds, because
this information is used to show loading indicators and messages to the user of
your web application.

The status of this delete request is _metadata_ about that book.

resourceful-redux tracks this metadata for all resources, across all actions
for these resources. This metadata tracking is the primary benefit one gets
from using resourceful-redux.
