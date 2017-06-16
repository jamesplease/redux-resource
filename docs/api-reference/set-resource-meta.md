# `setResourceMeta({ids, meta, newMeta, [initialResourceMeta], [replace]})`

Update one or more individual resources with the same metadata.

#### Arguments

1. `ids` *(Array)*: An array of the resource IDs to update with the new meta.

1. `newMeta` *(Object)*: The meta to set on each of the resources.

1. `meta` *(Object)*: The current resource meta object from this resource's
  store slice. Optional when `replace` is `true`, required otherwise.

1. `initialResourceMeta` *(Object)*: Additional metadata to add to any resource
  that previously did not have meta.

1. `replace` *(Boolean)*: Whether or not to completely replace the old meta with
  the new. Defaults to `false`.

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
        ids: action.ids,
        meta: state.meta,
        newMeta: {
          selected: true
        },
        replace: false
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
