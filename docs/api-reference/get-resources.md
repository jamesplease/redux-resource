# `getResources(state, resourceName, idsOrLabel)`

Returns an array of resources. You can pass it a label or an array of resource
IDs.

#### Arguments

1. `state` *(Object)*: The current state of the Redux store.

3. `resourceName` *(String)*: The name of the resource.

4. `idsOrLabel` *(Array|String)*: Either a list of resource IDs, or the name
  of a label.

#### Returns

(*`Array`*): An Array of resources.

#### Example

```js
import { getResources } from 'resourceful-redux';
import store from './store';

const state = store.getState();

// Retrieve resources by a label
const searchedBooks = getResources(state, 'books', 'search');

// Retrieve resources by an array of IDs
const bookSelection = getResources(state, 'books', [1, 12, 23]);
```

### Tips

- You don't _always_ need to use this method to access resources. Just need one
  resource? If the resource is on the `books` slice, you can directly access it
  via `store.getState().books.resources[bookId]`.
