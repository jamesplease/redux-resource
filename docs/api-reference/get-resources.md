# `getResources(resourceSlice, filter, [options])`

Returns an array or object of resources from `resourceSlice` based on the `filter` provided.

#### Arguments

1. `resourceSlice` *(Object)*: The slice of your state that a `resourceReducer` is
  responsible for.

2. `filter` *(Array|String|Function)*: The filter to apply. It can be an array of resource
  IDs, or the name of a [list](../resources/lists.md). If a function is provided, then
  `getResources` will iterate over the collection of resources, returning the
  resources that the function returns truthy for. The function will be called with three arguments:
  `(resource, resourceMeta, resourceSlice)`. If no `filter` is provided, then all of the
  resources in the `resourceSlice` will be returned.

3. `options` *(Object)*: An object to customize the behavior of `getResources`. Presently, only
  one option is supported: `byId`. Pass `{ byId true }` to receive the results as an object
  instead of an array.

#### Returns

(*`Array|Object`*): An Array of resources, unless `byId` is passed as true, in which case an
object will be returned instead.

#### Example

```js
import { getResources } from 'redux-resource';
import store from './store';

const state = store.getState();

// Retrieve resources by an array of IDs
const someBooks = getResources(state.books, [1, 12, 23]);

// Retrieve those same resources as an object
const someBooksAsObject = getResources(state.books, [1, 12, 23], { byId: true });

// Retrieve resources by a list name
const popularBooks = getResources(state.books, 'mostPopular');

// Retrieve the "selected" resources
const selectedBooks = getResources(state.books, (resource, meta) => meta.selected);

// Returns all resources
const allResources = getResources(state.books);
```

### Tips

- You don't _always_ need to use this method to access resources. Just need one
  resource? If the resource is on a slice called `books`, you can directly access it
  using `store.getState().books.resources[bookId]`.

- When the order of your resources doesn't matter, then it probably makes sense to
  pass `{ byId: true }` as `options` so that you can look up your resources more
  quickly.
