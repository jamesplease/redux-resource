# Reset Plugin

The reset plugin allows you to remove all of the data in a slice, effectively
"resetting" it. You may optionally scope the resetting to affect a single
list or request.

### Usage

First, you need to register this plugin for any slice that needs it.

```js
import { resourceReducer } from 'redux-resource';
import { reset } from 'redux-resource-plugins';

const reducer = resourceReducer('books', {
  plugins: [reset]
});
```

Then, you can use the action creator that ships with the plugin to perform the
reset.

```js
import { reset } from 'redux-resource-plugins';
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

You can pass a second argument, `options`, to scope what is reset:

```js
import { reset } from 'redux-resource-plugins';
import store from './store';

// Reset just the "createBook" request
store.dispatch(reset.resetResource('books', {
  request: 'createBook'
}));

// Reset just the "favorites" list
store.dispatch(reset.resetResource('books', {
  list: 'favorites'
}));

// Reset a list and a request at the same time
store.dispatch(reset.resetResource('books', {
  list: 'favorites',
  request: 'readFavorites'
}));
```

---

### `resetResource(resourceType, [options])`

Resets the slice for `resourceType`. Pass `options` to scope what's reset.
There are two valid options:

- `request`: Reset the request with this name
- `list`: Reset the list with this name

#### Arguments

1. `resourceType` *(String)*: The name of the slice to reset.

2. [`options`] *(String)*: Options to scope what is reset.

#### Returns

(*`Object`*): A Redux action to be dispatched.
