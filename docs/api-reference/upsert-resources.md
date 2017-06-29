# `upsertResources(resources, newResources, [mergeResources])`

Add new or update existing resources in your state tree.

#### Arguments

1. `resources` *(Object)*: The current resources object from your state tree.

2. `newResources` *(Array)*: The list of resources to add or update.

3. [`mergeResources`] *(Boolean)*: Whether or not to merge individual resources
  with the existing resource in the store, or to replace it with the new data.
  Defaults to `true`.

#### Returns

(*`Object`*): The updated resources object.

#### Example

```js
import { upsertResources } from 'resourceful-redux';
import actionTypes from './my-action-types';

export default function reducer(state, action) {
  switch (action.type) {
    case (actionTypes.CREATE_RESOURCES_CUSTOM): {
      const newResources = upsertResources({
        resources: state.resources,
        newResources: action.resources
      });

      return {
        ...state,
        resources: newResources
      };
    }
  }
}
```

#### Tips

- This is used by reducer returned by [`resourceReducer`](resource-reducer.md)
  to add and update resources in the store. You will typically only need to use
  this function if you're authoring a [plugin](/docs/guides/plugins.md).
