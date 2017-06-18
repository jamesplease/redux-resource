# Using Labels

Labels are a way to keep your requests organized. In resourceful-redux, all
resources of the same type are kept in a single Array. This solves the problem
of having multiple copies of a resource in two different places: each resource
can be found in exactly one place in the store.

This can cause a problem of keeping track of requests. For instance, if a user
runs two searches for books, how can you keep track of which books were returned
from which search?

You use labels to do that.

Using a label is straightforward: simply add the `label` property to all of the
requests in that [sequence of actions](./crud-actions.md).

```js
import { actionTypes } fom '..'
```
