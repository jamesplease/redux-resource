# upsertResources

Add new or update existing resources in your state tree.

## Arguments

1. `resources` _\(Object\)_: The current resources object from your state tree.
2. `newResources` _\(Array\|Object\)_: The new resources to add or update.
3. \[`mergeResources`\] _\(Boolean\)_: Whether or not to merge individual resources with the existing resource in the store, or to replace it with the new data. Defaults to `true`.

## Returns

\(`Object`\): The updated resources object.

## Example

```javascript
import { upsertResources } from 'redux-resource';
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

## Tips

* This is used internally within the reducer returned by

  [`resourceReducer`](resourcereducer.md) to add and update resources in the

  store. You will typically only need to use this function if you're authoring a

  [plugin](../other-guides/custom-action-types.md).

