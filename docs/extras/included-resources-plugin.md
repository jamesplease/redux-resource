# Included Resources Plugin

Many APIs support returning multiple resource types in a single request. For instance,
a backend may let you fetch an author as well as that author's books in one request. In
this example, `authors` and `books` are two different resources.

Different backends return included resources in different ways. This plugin is optimized
to receive normalized data, such as what is output from
[`normalizr`](https://github.com/paularmstrong/normalizr).

### Usage

First, you need to register this plugin when you call
[`resourceReducer`](/docs/api-reference/resource-reducer.md).

```js
import { resourceReducer } from 'redux-resource';
import { includedResources } from 'redux-resource-plugins';

const reducer = resourceReducer('authors', {
  plugins: [includedResources]
});
```

This plugin doesn't come with any custom action types. Instead, it changes the
way the state is tranformed with the built-in successful read CRUD
[action type](/docs/api-reference/action-types.md), `READ_RESOURCES_SUCCEEDED`.

When your actions have an `includedResources` object, they will be added to the
appropriate slices.

An example of using `includedResources` is the following:

```js
import { actionTypes } from 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_SUCCEEDED,
  resourceName: 'authors',
  resources: [{
    id: 10,
    name: 'Sarah'
  }],
  includedResources: {
    // Resources are key'd off by their name.
    // The value can be an Object or an Array.

    // Here we pass books as an Object. `normalizr` returns
    // a shape like this.
    books: {
      23: {
        id: 23,
        name: 'Some book'
      },
      100: {
        id: 50,
        name: 'Another book'
      }
    },

    // And down here we pass comments as an Array. Either works!
    comments: [
      {
        id: 23,
        name: 'Great author!'
      },
      {
        id: 100,
        name: 'One of my favorite authors'
      }
    ]
  }
});
```

Be sure to use `includedResources` on _every_ resource slice that can appear in `includedResources`.
In the above example, we would want to include the plugin for our `authors`, `books`, and `comments`.

This plugin will respect the `mergeResources` and `mergeMeta` action properties.
