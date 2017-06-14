# `upsertResources({resources, newResources, [replace]})`

Add new or update existing resources in your state.

#### Arguments

1. `resources` *(Array)*: The current list of resources.

2. `newResources` *(Array)*: The list of resources to add or update.

3. `replace` *(Boolean)*: Whether or not to completely replace the old list of
  resources with the new list. Resources not in the new list will be discarded.

#### Returns

(*`Array`*): The array of new resources.

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
  this function if you're authoring a plugin.
