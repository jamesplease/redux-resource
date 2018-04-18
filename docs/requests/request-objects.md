# Request Objects

A request object represents an asynchronous operation. Typically, they are used to represent
HTTP requests, but they are designed to be generic enough for any kind of networking technology.
Requests are stored in your Redux store.

Data about requests is useful for providing feedback to users of your application,
such as if the operation is still in flight, if it failed, or if it succeeded.

### Location in the Store

Requests are stored on the resource slice, along with other information such `resources`, `meta`, and
`lists`. Every request has a resource type associated with it, which is the resource that is
primarily affected by the request. This determines which resource slice the request is stored within.

Requests, like resources, require a unique identifier. For resources, the unique identifier is
the `id` property. For requests, the identifier is called a key, and it is stored on the request
object under the property `requestKey`.

### Properties

A request object has the following properties:

- `requestKey`: A string that serves as an identifier for the request
- `requestName`: A human-readable string that can be useful for debugging
- `resourceType`: The type of resource that is primarily affected by this request. This is
  the [resource slice](/docs/resources/resource-reducers.md) that the request will be stored in.
- `ids`: The resource IDs that are affected by this request
- `status`: The "request status" of this request. This represents the state that the
  request is in. It is one of "IDLE", "PENDING", "SUCCEEDED", or "FAILED".

After a successful request to read a user's favorite books, the books resource slice might look
something like the following:

```js
{
  resourceType: 'books',
  resources: {
    // resources here
  },
  meta: {
    // resource metadata here
  },
  lists: {
    // books lists here
  },
  requests: {
    readFavoriteBooks: {
      requestKey: 'readFavoriteBooks',
      ids: ['1403', '1051', '93'],
      status: 'SUCCEEDED'
    }
  }
}
```

The next few guides will cover these properties of requests in greater detail.

