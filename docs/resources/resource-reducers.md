# Resource Reducers

The main export of Redux Resource, [`resourceReducer`](../api-reference/resource-reducer.html),
is a function that returns a reducer. For each resource type in your application, you should use
this function to create a reducer. A resource reducer will manage all of the state for its resource
type.

Creating a resource reducer is the first step to getting started with Redux Resource. If your
application manages books, then you would create a reducer for the books resource like so:

```js
import { resourceReducer } from 'redux-resource';

const booksReducer = resourceReducer('books');
```

Once you have your resource reducers, you need to combine them into a single reducer. Users of Redux
frequently use [`combineReducers`](http://redux.js.org/docs/api/combineReducers.html)
for this purpose. When you use `combineReducers`, your store is divided up into slices, where each
reducer that you input manages its own section of the state. These sections are often called "slices."

The rest of this documentation will frequently refer to "resource slices," which are the slices of your
store that are managed by a resource reducer.

The following code snippet demonstrates how you might set this up:

```js
import { combineReducers } from 'redux';
import { resourceReducer } from 'redux-resource';

const reducer = combineReducers({
  books: resourceReducer('books'),
  authors: resourceReducer('authors'),
  people: resourceReducer('people'),
});
```

The `resourceReducer` function takes a second option, which can be used to configure the resource reducer.
Refer to [the API documentation for `resourceReducer`](../api-reference/resource-reducer.md) to
learn more.

> Note: keep in mind that Redux Resource works with or without `combineReducers`.
