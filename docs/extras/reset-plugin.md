# Reset Plugin

The reset plugin allows you to remove all of the data in the state, effectively
"resetting" it. If you pass a `label`, then _just_ that label will be reset.

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

### `resetResource(resourceName, [label])`

Resets the slice for `resourceName`. If `label` is passed, then _just_ that
label will be reset.

#### Arguments

1. `resourceName` *(String)*: The name of the slice to reset.

2. [`label`] *(String)*: The label to reset.

#### Returns

(*`Object`*): A Redux action to be dispatched.
