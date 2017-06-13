# Core Concepts

Understanding these core concepts should help you learn resourceful-redux.

### Resources

A resource is an abstract object that you interact with in your application. For
instance, if your web application manages a public library, then you might have
two resources: "books" and "members."

Resources typically have attributes, such as a "name" or "releaseYear."

### Resource Metadata

Resources also have "metadata" about them, which can be thought of as any
information about a resource that is useful for your interface. For instance, if
your interface displays a list of books that the user can select, then the
selected books would be metadata about those books.

One of the features of resourceful-redux is that it provides a way to keep
metadata organized. The system isn't too complicated: the metadata of a resource
is stored separately from the resource's attributes. Also, you can store metadata
about an entire _list_ of resources, too.

### Requests

For many applications, resources are stored in an external system, and
interactions with the resources occur over a network. These interactions are
called "requests." Typically, they are HTTP requests.

There are four operations you can perform against a resource using requests: you
can create them, retrieve them, update them, or delete them. These four
operations are collectively known as
[CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete).

Because requests occur over a network, they do not complete instantly.
They might take awhile to complete, and sometimes they might fail.
In resourceful-redux, this information is represented as one of four state.
All requests are always in one of these four states:

- `NULL`: the request hasn't begun yet
- `PENDING`: the request has started, but has not yet finished
- `FAILED`: the request was unsuccessful
- `SUCCEEDED`: the request was successful

### Metadata About Requests

In applications, requests are often made that read or write information about
resources. resourceful-redux provides reducers that manage tracking the
metadata about each of these requests for you.

This way, you do not need to worry about writing boilerplate reducer code.
