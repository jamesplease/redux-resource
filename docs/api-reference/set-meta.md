# `setMeta({ resourceMeta, newMeta, ids, replace })`

Update one or more individual resources with the same piece of metadata at once.

#### Arguments

1. `resourceMeta` *(Array)*: The current resource meta from this resource's
  store slice.

2. `ids` *(Array)*: An array of the resource IDs to update with the new meta.

2. `newMeta` *(Array)*: The meta to set on the resources.

3. `replace` *(Boolean)*: Whether or not to completely replace the old meta with
  the new. Defaults to `false`.

#### Returns

(*`Object`*): The new resource meta object.

#### Example

```js
// Coming soon
```

#### Tips

- This is used by reducer returned by `resourceReducer` to update the resource
  meta in your store. You will typically only need to use this method if you're
  writing a custom plugins.
