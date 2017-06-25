# Core Concepts

Resourceful Redux is intended to be a simple solution to a complicated problem.

### Resources

A resource is an entity that you interact with in your application. For
instance, if your web application manages a public library, then you might have
two resources: "books" and "members."

Resources typically have attributes, such as a "name" or "releaseYear."

Resources don't necessarily need to represent tangible objects. They can be more
abstract things, too, such as "workflows" or "permissions."

In Resourceful Redux, each resource will be kept in its own
[slice](http://redux.js.org/docs/recipes/reducers/UsingCombineReducers.html) of
your store. Within that slice, all of the resources of a single type are kept in
a single list.

### Resource Metadata

Resources also have "metadata" about them, which can be thought of as the
additional  information about a resource that is useful for your interface. For
instance, if your interface displays a list of books that the user can select,
then the information about which books are selected would be metadata about the
books resource.

If a user is taking an action against a resource, then that is also metadata.
For instance, if a book is being deleted, then that status will be stored as
metadata for that particular book. A rule of thumb about metadata is that that
it's any data about a resource that isn't persisted to a remote server.

In Resourceful Redux, each resource has its own metadata, and that metadata
is stored separately from the resource's attributes.

### CRUD Operations

There are four interactions you can have with a resource: you can create them,
retrieve them, update them, or delete them. These four operations are
collectively known as
[CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete).

### Requests

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

In Resourceful Redux, every resource in your application always has one of these
statuses associated for each CRUD operation. Resourceful Redux keeps this
metadata up-to-date for each resource as users use your app.

This reduces the boilerplate code that you need to write, giving you more time
to build your application.
