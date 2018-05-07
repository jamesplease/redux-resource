# `setResourceMeta(options)`

Update one or more individual resources with the same metadata.

#### Arguments

1. `options` *(Object)*: An object that defines how to update the metadata. The
  options are as follows:

  * `resources` *(Array|Object)*: An array of the resources, or resource IDs, to update
  with the new meta.

  * `newMeta` *(Object)*: The meta to set on each of the resources.

  * `meta` *(Object)*: The current resource meta object from this resource's
    store slice. Optional when `mergeMeta` is `false`, required otherwise.

  * [`initialResourceMeta`] *(Object)*: Additional metadata to add to any resource
    that previously did not have meta.

  * [`mergeMeta`] *(Boolean)*: Whether or not to merge a resource's old metadata
    with the new metadata. Defaults to `true`.

#### Returns

(*`Object`*): The new resource meta object.

#### Example

```js
import { setResourceMeta } from 'redux-resource';
import actionTypes from './my-action-types';

export default function reducer(state, action) {
  switch (action.type) {
    case (actionTypes.SELECT_MANY_RESOURCES): {
      const meta = setResourceMeta({
        resources: action.resources,
        meta: state.meta,
        newMeta: {
          selected: true
        }
      });

      return {
        ...state,
        meta
      };
    }
  }
}
```

#### Tips

- This is used internally within the reducer returned by
  [`resourceReducer`](./resource-reducer.md) to update the resource meta in your
  state tree. You will typically only need to use this method if you're writing
  a [plugin](../other-guides/custom-action-types.md).
