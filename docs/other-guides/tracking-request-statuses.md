# Tracking Request Statuses

Displaying feedback about CRUD operations requires knowing the
[status](../requests/request-statuses.md) of its request: is it pending,
failing, succeeded? This is what we mean by "tracking" a request. The status of
a request can be used to display feedback to the user of your application, such
as showing loading indicators or error messages.

There are two ways to track CRUD operation requests in Redux Resource:
using a [request object](../requests/request-objects.md), or tracking the status
on resource metadata.

Typically, you should use request objects, but in some situations you may prefer to use
resource metadata instead.

### Request objects

You can use request objects to track any request that your application makes. Request
objects are by far the more powerful of the two options for tracking requests,
so we recommend using them whenever possible.

To learn about the shape of request objects, refer to
[the request objects guide](../requests/request-objects.md).

To dispatch actions that create request objects, you need to supply a `requestKey` to
with your request actions. For instance,

```js
{
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceType: 'books',
  requestKey: 'searchBooks'
}
```

This will update your resource slice to look like the following:

```js
{
  resourceType: 'books',
  requests: {
    searchBooks: {
      requestKey: 'searchBooks',
      status: 'PENDING'
    }
  }
}
```

For more on request actions, refer to the [request actions guide](../requests/request-actions.md).

### Resource Metadata

In a limited number of situations, you may not need to specify a `requestKey`
with your request actions.

This is true whenever your CRUD operations directly target a resource, or a
set of resources, by their ID. For instance, if the user is fetching a book
with ID 23, then this action is directly targeting the book with ID of 23.
Likewise, deleting books with IDs 100, 101, and 102 is a request that is
targeting these three resources directly.

Any time that you have a set of IDs when the request is sent off, then you can
track the status of the operation on the resource metadata directly. You can
do this by passing a `resources` array with the start action.

Let's look at an example. The action that represents beginning a read request
of a book with ID 24 looks like the following:

```js
{
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceType: 'books',
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
[`getStatus`](../api-reference/get-status.md) to access this state in a
convenient way.

The rule of thumb is:

**You can track CRUD operation requests on resource metadata anytime you have an
ID when you fire the "start" action type.**

Although using request objects is optional, we encourage their use beuause they provide
consistency across your code base. Request objects allow you to track the status of _every_
request, whereas resource metadata only works in a subset of situations.

### Using Statuses

You now know how to _store_ the request statuses in your store. There is a
separate guide on using
[Using Request Statuses](using-request-statuses.md) in your
view layer.
