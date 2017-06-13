# `resourceReducer(resourceName, [options])`

Creates a Redux [reducer](http://redux.js.org/docs/basics/Reducers.html) that
tracks changes to a single resource's metadata.

#### Arguments

1. `resourceName` *(String)*: The name of your resource. Typically, you'll want
  to use a plural name. For instance, "books," rather than "book."

2. [`options`] *(Object)*: Options that can be used to configure the reducer.

#### Returns

([*`Reducer`*](http://redux.js.org/docs/basics/Reducers.html)): A reducing
function for this resource.

#### Example

```js
import { createStore, combineReducers } from 'resourceful-redux';
import { resourceReducer } from 'resourceful-redux';

let store = createStore(
  combineReducers({
    books: resourceReducer('books'),
    users: resourceReducer('users')
  })
);
```
