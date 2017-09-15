# Reset Plugin

The reset plugin allows you to remove all of the data in the state, effectively
"resetting" it. If you pass a `list`, then _just_ that list will be reset.

### Usage

First, you need to register this plugin for any slice that needs it.

```js
import { resourceReducer } from 'resourceful-redux';
import { reset } from 'resourceful-plugins';

const reducer = resourceReducer('books', {
  plugins: [reset]
});
```

Then, you can use the action creator that ships with the plugin to perform the
reset.

```js
import { reset } from 'resourceful-plugins';
import store from './store';

store.dispatch(reset.resetResource('books'));
```

Resetting a slice will leave you with the following state:

```js
{
  resources: {},
  meta: {},
  lists: {},
  requests: {}
}
```

Resetting a list will set the list to be an empty array.

The additional initial state that you pass to `resourceReducer` will also
be included when you reset your state.

---

### `resetResource(resourceName, [list])`

Resets the slice for `resourceName`. If `list` is passed, then _just_ that
list will be reset.

#### Arguments

1. `resourceName` *(String)*: The name of the slice to reset.

2. [`list`] *(String)*: The list to reset.

#### Returns

(*`Object`*): A Redux action to be dispatched.
