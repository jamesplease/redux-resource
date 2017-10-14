# `getResources(state, resourceName, filter)`

Returns an array of resources based on the `filter` provided.

#### Arguments

1. `state` *(Object)*: The current state of the Redux store.

3. `resourceName` *(String)*: The name of the resource.

4. `filter` *(Array|String|Function)*: The filter to apply. It can be an array of resource
  IDs, or the name of a [list](/docs/guides/lists.md). If a function is provided, then
  `getResources` will iterate over the collection of resources, returning an array of
  resources that the function returns truthy for. The function will be called with three arguments:
  `(resource, resourceMeta, resourceSlice)`.

#### Returns

(*`Array`*): An Array of resources.

#### Example

```js
import { getResources } from 'redux-resource';
import store from './store';

const state = store.getState();

// Retrieve resources by an array of IDs
const someBooks = getResources(state, 'books', [1, 12, 23]);

// Retrieve resources by a list name
const popularBooks = getResources(state, 'books', 'mostPopular');

// Retrieve the "selected" resources
const selectedBooks = getResources(state, 'books', (resource, meta) => meta.selected);
```

### Tips

- You don't _always_ need to use this method to access resources. Just need one
  resource? If the resource is on the `books` slice, you can directly access it
  via `store.getState().books.resources[bookId]`.
