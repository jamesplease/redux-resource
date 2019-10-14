# Included Resources Plugin

APIs frequently support returning multiple resource types in a single request. For
instance, an endpoint may allow you to fetch an author as well as that author's
books. In this example, `authors` and `books` are two different resource types.

This plugin is designed to allow you to dispatch a single action that includes
multiple types. It is optimized to receive normalized data, such as what is
returned from [`normalizr`](https://github.com/paularmstrong/normalizr).

### Usage

Add this plugin when you call
[`resourceReducer`](../api-reference/resource-reducer.md). Be sure to add it to
the "primary" resource slice, as well as to the included resource slices.

```js
import { resourceReducer } from 'redux-resource';
import { includedResources } from 'redux-resource-plugins';

const authorReducer = resourceReducer('authors', {
  plugins: [includedResources]
});

const booksReducer = resourceReducer('books', {
  plugins: [includedResources]
});
```

This plugin doesn't come with any custom action types. Instead, it changes the
way the state is tranformed with the built-in successful create, update or read CRUD
[action type](../api-reference/action-types.md): `CREATE_RESOURCES_SUCCEEDED`, `UPDATE_RESOURCES_SUCCEEDED` and
`READ_RESOURCES_SUCCEEDED`.

When your actions have an `includedResources` object, they will be added to the
appropriate slices.

An example of using `includedResources` is the following:

```js
import { actionTypes } from 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_SUCCEEDED,
  resourceType: 'authors',
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

    // Notice here that comments is an Array. This format works, too.
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

### Related Reading

Not every API returns included resources in a normalized manner, so a different plugin may be more
appropriate for certain backends. As an example, JSON API does not provide included resources in a
format that can interpreted by this plugin.

For more on this subject, refer to the [Related Resources recipe](../recipes/related-resources.md).
