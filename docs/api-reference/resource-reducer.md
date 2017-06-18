# `resourceReducer(resourceName, [options])`

Creates a Redux [reducer](http://redux.js.org/docs/basics/Reducers.html) that
changes your store's state when actions with one of the CRUD
[Action types](action-types.md) are dispatched.

#### Arguments

1. `resourceName` *(String)*: The name of your resource. Typically, you'll want
  to use a plural name. For instance, "books," rather than "book." You should
  also use this as the name of your store slice when using
  [combineReducers](http://redux.js.org/docs/api/combineReducers.html), for
  consistency.

2. [`options`] *(Object)*: Options that can be used to configure the reducer.
  The options are:
  - `initialState`: Initial state to shallowly merge into the default initial
    state for the slice of the store.

  - `plugins`: An array of reducer functions that will be called after the
    default reducer function. Use this to augment the behavior of the built-in
    reducer, or to add support for custom action types for this store slice.
    Plugins are functions that are called with the arguments
    `(state, action, options)`, where `options` are the same options that you
    passed to `resourceReducer`. For more, refer to the
    [Plugins](/docs/guides/plugins.md) documentation.

  - `initialResourceMeta`: Additional metadata to include on any new resource's
    metadata after a read or create operation.

#### Returns

([*`Reducer`*](http://redux.js.org/docs/basics/Reducers.html)): A reducing
function for this resource.

#### Example

```js
import { createStore, combineReducers } from 'redux';
import { resourceReducer } from 'resourceful-redux';

let store = createStore(
  combineReducers({
    books: resourceReducer('books'),
    users: resourceReducer('users')
  })
);
```
