# `setResourceMeta({resources, meta, newMeta, [initialResourceMeta], [mergeMeta]})`

Update one or more individual resources with the same metadata.

#### Arguments

1. `resources` *(Array)*: An array of the resources, or resource IDs, to update
  with the new meta.

1. `newMeta` *(Object)*: The meta to set on each of the resources.

1. `meta` *(Object)*: The current resource meta object from this resource's
  store slice. Optional when `mergeMeta` is `false`, required otherwise.

1. `initialResourceMeta` *(Object)*: Additional metadata to add to any resource
  that previously did not have meta.

1. `mergeMeta` *(Boolean)*: Whether or not to merge a resource's old metadata
  with the new metadata. Defaults to `true`.

#### Returns

(*`Object`*): The new resource meta object.

#### Example

```js
import { setResourceMeta } from 'resourceful-redux';
import actionTypes from './my-action-types';

export default function reducer(state, action) {
  switch (action.type) {
    case (actionTypes.SELECT_MANY_RESOURCES): {
      const meta = setResourceMeta({
        resources: action.resources,
        meta: state.meta,
        newMeta: {
          selected: true
        },
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

- This is used by the reducer returned by `resourceReducer` to update the
  resource meta in your store. You will typically only need to use this method if you're writing a custom plugin.
