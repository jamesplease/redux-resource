# `getResources(state, resourceName, idsOrList)`

Returns an array of resources.

#### Arguments

1. `state` *(Object)*: The current state of the Redux store.

3. `resourceName` *(String)*: The name of the resource.

4. `idsOrList` *(Array)*: An array of resource IDs.

#### Returns

(*`Array`*): An Array of resources.

#### Example

```js
import { getResources } from 'redux-resource';
import store from './store';

const state = store.getState();

// Retrieve resources by an array of IDs
const bookSelection = getResources(state, 'books', [1, 12, 23]);

// Retrieve resources by a list name
const bookSelection = getResources(state, 'books', 'mostPopular');
```

### Tips

- You don't _always_ need to use this method to access resources. Just need one
  resource? If the resource is on the `books` slice, you can directly access it
  via `store.getState().books.resources[bookId]`.
