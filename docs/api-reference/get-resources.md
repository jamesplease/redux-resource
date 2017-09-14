# `getResources(state, resourceName, ids)`

Returns an array of resources.

#### Arguments

1. `state` *(Object)*: The current state of the Redux store.

3. `resourceName` *(String)*: The name of the resource.

4. `ids` *(Array)*: An array of resource IDs.

#### Returns

(*`Array`*): An Array of resources.

#### Example

```js
import { getResources } from 'resourceful-redux';
import store from './store';

const state = store.getState();

// Retrieve resources by an array of IDs
const bookSelection = getResources(state, 'books', [1, 12, 23]);
```

### Tips

- You don't _always_ need to use this method to access resources. Just need one
  resource? If the resource is on the `books` slice, you can directly access it
  via `store.getState().books.resources[bookId]`.

### Deprecations

- In v1.x of Resourceful Redux, you can pass a `label` as the third argument
  to retrieve the list of IDs returned by a label. This behavior is deprecated,
  and slated to be removed in v2.0.0 of Resourceful Redux. In its place, you
  will be able to pass a `list` to get the resources associated with that list.
