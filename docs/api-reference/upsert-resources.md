# `upsertResources({ resources, newResources, replace })`

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
// Coming soon
```

#### Tips

- This is used by reducer returned by `resourceReducer` to update the resources
  in your store. You typically will only need to use it if you're writing
  plugins.
