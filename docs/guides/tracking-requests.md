# Tracking Requests

Displaying feedback about CRUD operations requires knowing the status of its
request: is it pending, failing, succeeded? This is what we mean by "tracking"
a request. The status of a request can be used to display feedback to the user
of your application, such as showing loading indicators or error messages.

There are two ways to track CRUD operation requests in Redux Resource:
tracking the status on some resources' metadata, and using a named request.

You'll always use _at least_ one of these when performing CRUD operations.
Sometimes, you might use both.

### Resource Metadata

Some CRUD operations directly target a resource, or a set of resources, by their
ID. For instance, if the user is fetching a book with ID 23, then this action is
directly targeting the book with ID of 23. Likewise, deleting books with IDs
100, 101, and 102 is a request that is targeting these three resources directly.

Anytime that you have a set of IDs when the action begins, you have the option
to track the CRUD operation status on the targeted resource's metadata. You can
do this by passing a `resources` array with the start action.

Let's look at an example. The action that represents beginning a read request
of a book with ID 24 looks like the following:

```js
{
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceName: 'books',
  resources: [24]
}
```

When this is dispatched, your slice's metadata will be updated like this:

```js
{
  meta: {
    24: {
      createStatus: 'IDLE',
      readStatus: 'PENDING',
      updateStatus: 'IDLE',
      deleteStatus: 'IDLE'
    }
  }
}
```

In your view layer, you can then use
[`getStatus`](/docs/api-reference/get-status.md) to access this state in a
convenient way.

The rule of thumb is:

**You can track CRUD operation requests on resource metadata anytime you have an
ID when you fire the "start" action type.**

The above condition isn't always met. In those situations, you use _named requests_
to track requests.

### Named Requests

Individual requests can be given a name. You can use named requests to track the status
of any CRUD operation request in your application, whether or not you have IDs at the
start of the action.

The following information is stored about each named request in your state
slice:

```js
{
  status: 'IDLE',
  ids: []
}
```

where `status` is the request status, and `ids` are any associated resource IDs
with this request.

Information about named requests is stored in the `requests` section of your
state slice. For instance, if you dispatch a pending action for a request with
the name `create`, then your state slice would look like:

```js
{
  resources: {
    // resources in here
  },
  meta: {
    // resource metadata in here
  },
  lists: {
    // lists are in here
  },
  requests: {
    create: {
      status: 'PENDING',
      ids: []
    }
  }
}
```

You can use [`getStatus`](/docs/api-reference/get-status.md) to conveniently
access and use the status of a named request in your view layer.

Two common examples of when to use a named request include:

- Read many requests, where the user is passing some sort of query to filter a
  large list by

- Creating requests, when the user does not provide an ID for the new resource

but do note that they can be used for any CRUD operation, even when IDs are
included in the start action.

It might seem strange to associate a name with a request, but we find that it
works out well in practice. For instance, for creating a book, you might use the
name `"create"` or `"createBook"`. And for fetching the latest movies, you
might use `"latestMovies"`. It turns out that there's usually a name that makes
sense for each request in your application.

For more on named requests, check out the guide on
[Named Requests](/docs/guides/named-requests.md).

### Using Statuses

You now know the two locations that request statuses can be stored. There is a
separate guide on using [Request Statuses](/docs/guides/request-statuses.md) in
your view layer.
