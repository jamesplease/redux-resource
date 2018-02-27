# Request Names

Request names are a feature that can be useful if you are automatically
generating [request keys](/docs/requests/request-keys.md). If you are
not automatically generating request keys, then you probably do not need
to use request names.

### Motivation

Automatically-generated request keys are useful for advanced networking features
such as response caching and request deduplication, but they are often an inconvenience
when it comes to debugging code.

For instance, if you have an endpoint that allows a user to run a user, two
searches against the endpoint may have the keys "aBui9Xc" and "9d8cdd3". These keys
don't communicate the _purpose_ of these requests; they are just arbitrary strings.

Providing a request name can help developers who are debugging the application.
In that situation, a request name like `"searchBooks"` could be specified. Later,
when a developer is looking at the request, they will have some context on what
the intention of the request is.

Request names are like function names in JavaScript. Although we could use anonymous
functions everywhere, we tend to provide names for our functions so that developers know what
they do.

In summary, request names are optional, human-readable descriptions of what the
request's intention is.

### Specifying a Request Name

Add the `requestName` property to a [request action](./request-actions.md) to specify a
name for that request.

```js
import { actionTypes } fom 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceType: 'books',

  // In this situation, we are generating a key. It could be a random string of data,
  // which makes debugging hard.
  requestKey: generateRequestKey(/* request data */),

  // By specifying a human-readable name, we are helping future developers out who are
  // debugging our application.
  requestName: 'searchBooks'
});
```

Every request has two actions: a start action, and an end action. You should specify the
name for both of these actions. For more on request actions, refer to the
[request actions guide](/docs/requests/request-actions.md).

> Note: if you specify the `request` property on an action, then it will be used
> as both the key and the name. This API is from Redux Resource < 3.0. Although
> it will continue to work into the future, it is recommended that you explicitly
> set `requestKey` and `requestName` separately going forward.
