# Using the Action Types

resourceful-redux exports Action Types to help you create, read, update,
and delete resources. Although these action types represent four different
operations, there are many similarities to using them.

All actions have a single required value: `resourceName`, which is the name
of the resource that is being affected. The simplest action, then, looks
something like this:

```js
import { actionTypes } from 'resourceful-redux';

{
  type: actionTypes.READ_RESOURCES,
  resourceName: 'books'
}
```

This action type isn't very useful, however. Without more information about this
request, resourceful-redux doesn't know how to change your state. Consequently,
this action is a no-op.

To observe changes in the state, you need to supply one of two additional
options: a `resources` array, and/or a `label`.

A `resources` array represents the resources being affected by the action type.
It can be an array if IDs, such as `[1, 2, 3]`, or an array of resource objects,
such as

```js
[
  {
    id: 1,
    name: 'Brian',
    phone: '444.444.4444'
  },
  {
    id: 2,
    name: 'Sarah',
    phone: '222.222.2222'
  }
]
```

You can even mix the two. When it comes to a `resources` array, the important
part is that the objects have some `id`. This associates the action with some
resources.

You may be wondering when you might use the object form versus the shorthand
form. Well, if you're reading a single book, for instance, you may initiate the
request with just an ID, since that is all of the information that you have at
that time. That action may look like the following:

```js
import { actionTypes } from 'resourceful-redux';

{
  type: actionTypes.READ_RESOURCES,
  resourceName: 'books',
  resources: [23]
}
```

When the request succeeds, you might now have additional information about this
book to add to your store. So you would include the full definition in the
action representing success:

```js
import { actionTypes } from 'resourceful-redux';

{
  type: actionTypes.READ_RESOURCES_SUCCESS,
  resourceName: 'books',
  resources: [{
    id: 23,
    releaseYear: 2015,
    author: 'Jane M. Goodfellow',
    title: 'A History of Canada'
  }]
}
```

When a `resources` array is supplied, then resourceful-redux will update the
`meta` for each resource that is included.

However, without more information, resourceful-redux doesn't know what

Each action type supports the following properties:

- `resourceName` *(String)*: The resource that is being targeted by this action
- `resources` *(Array)*: An optional array of resource objects and/or resource
  IDs that are affected by this action.
- `mergeResources` *(Boolean)*:
- `mergeMeta` *(Boolean)*: Whether or not any new meta that is set on any
  resource referenced by the action's `resources` array should completely
  replace the resource's existing meta, or if it should be merged in. Defaults
  to `true`.
