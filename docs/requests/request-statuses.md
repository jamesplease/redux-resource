# Request Statuses

A request has a "status" associated with it, which represents the state that
the request is in. There are four statuses:

- `IDLE`: The request hasn't started yet
- `PENDING`: The request is in flight, and hasn't finished
- `FAILED`: The request finished, and failed
- `SUCCEEDED`: The request finished, and was successful

A request has exactly one status at any given time. Here is an example request
object that is in a pending state:

```js
{
  requestKey: 'createBook',
  status: 'PENDING'
}
```

The request status values are exported as
[`requestStatuses`](../api-reference/request-statuses.md).

> Note: the request status is different from an HTTP status code. A request that
  represents an HTTP request could _also_ have a status code associated with it, such
  as 200 or 404.

### Why Use Request Statuses

The status of a request is useful for showing feedback to users of the application.
When a request is in the pending state, you can display a loading indicator, and when it is
failed, you can show an error message.

### The Status Lifecycle

The request status can be thought of as a cyclical lifecycle. Every request starts as `IDLE`.
When the request begins, it moves to `PENDING`.

When it resolves, it becomes `SUCCEEDED` or `FAILED` depending on the outcome.

And lastly, there may be a time when you no longer need to display to the user that the
request has succeeded or failed. At this time, you can make the request `IDLE` again.

If the application makes the same request again, the process will repeat itself.

Not every request needs to go through the entire lifecycle. Sometimes, requests will
sit indefinitely in the `SUCCEEDED` state after they resolve. Other times, you
may need to "reset" the state back to `IDLE`.

> Note: when a request is aborted, we recommend that you move it back to the `IDLE`
> state. Webapps typically abort requests because the user no longer needs to know
> if the request succeeds or fails.

### Providing More Detailed Information

The request status provides a coarse representation of the status of the request,
but you will frequently need more granular information. Why did the request fail?
Was the resource not found, or did the backend have an error? Is the user logged out,
or did they lose their network connection?

You can store additional data on a request to capture information like this.

For instance, if your requests represent RESTful HTTP calls, then you could add the
HTTP status code to the request. Or, if your requests represent gRPC calls, then
you could place the gRPC error code onto the request, too.

The request definition is intentionally flexible. It allows you store any additional
information that you need. This enables Redux Resource's requests to work with any
networking layer: RESTful HTTP endpoints, GraphQL, gRPC, web sockets, or whatever else
you may be using to transfer data.
