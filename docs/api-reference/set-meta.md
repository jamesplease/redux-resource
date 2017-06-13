# `setMeta({ids, meta, newMeta, [replace]})`

Update one or more individual resources with the same metadata.

#### Arguments

1. `ids` *(Array)*: An array of the resource IDs to update with the new meta.

1. `meta` *(Object)*: The current resource meta object from this resource's
  store slice.

1. `newMeta` *(Object)*: The meta to set on each of the resources.

1. `replace` *(Boolean)*: Whether or not to completely replace the old meta with
  the new. Defaults to `false`.

#### Returns

(*`Object`*): The new resource meta object.

#### Example

```js
import actionTypes from './my-action-types';

export default function reducer(state, action) {
  switch (action.type) {
    case (actionTypes.SELECT_MANY_RESOURCES): {
      const meta = setMeta({
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

- This is used by reducer returned by `resourceReducer` to update the resource
  meta in your store. You will typically only need to use this method if you're
  writing a custom plugins.

- Updating the metadata for a list of resources doesn't require a utility, since
  it is a plain object located at `{resourceName}.listMeta`. For instance,
  setting a property on the list meta in a reducer might look something like:

  ```js
  return {
    ...state,
    listMeta: {
      ...state.listMeta,
      someProperty: true
    }
  };
  ```
