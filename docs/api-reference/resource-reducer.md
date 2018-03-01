# `resourceReducer(resourceType, [options])`

Creates a Redux [reducer](http://redux.js.org/docs/basics/Reducers.html) that
manages a [resource slice](/docs/introduction/core-concepts.md).

#### Arguments

1. `resourceType` *(String)*: The type of your resource. Typically, you'll want
  to use a plural type. For instance, "books," rather than "book." When using
  [combineReducers](http://redux.js.org/docs/api/combineReducers.html), you should
  also use this as the key of your store slice for consistency.

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
    [Plugins](/docs/other-guides/custom-action-types.md) documentation.

  - `initialResourceMeta`: Additional metadata to include on any new resource's
    metadata after a read or create operation.

#### Returns

([*`Reducer`*](http://redux.js.org/docs/basics/Reducers.html)): A reducing
function for this resource.

#### Example

```js
import { createStore, combineReducers } from 'redux';
import { resourceReducer } from 'redux-resource';

let store = createStore(
  combineReducers({
    books: resourceReducer('books'),
    users: resourceReducer('users')
  })
);
```

#### Tips

- Any options you pass to the `resourceReducer` will also be passed to the
  plugins. You can use this fact to add your own custom `options` to
  configure the behavior of your plugins. To learn more about plugins, refer
  to [the Plugins guide](/docs/other-guides/custom-action-types.md).
