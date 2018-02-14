# Selection Plugin

### Deprecated

This plugin is deprecated. You can use the built-in `UPDATE_RESOURCES` action
type to modify lists directly.

Here is an example action type that replaces the `selectResources` action type:

```js
function selectResources(resourceType, ids) {
  return {
    type: 'UPDATE_RESOURCES',
    resources: {
      [resourceType]: {
        selected: ids
      }
    }
  };
}
```

You can build similar action creators for `deselectResources` and
`clearSelectedResources`.

### Documentation

Use this plugin to maintain a list of "selected" resources within a slice.
This is useful for interfaces that let users select a subset of resources to
perform a bulk CRUD operation on.

For instance, consider the app that you use for email. You may be able to select
multiple emails, and then mark them all as read. This plugin can help with a
feature like this.

### Usage

First, you need to register this plugin for any slice that needs it. This plugin
adds an additional property to your slice, `selectedIds`, so it comes with
initial state that you should add to the slice, too.

```js
import { resourceReducer } from 'redux-resource';
import { selection } from 'redux-resource-plugins';

const reducer = resourceReducer('books', {
  initialState: {
    ...selection.initialState
  },
  plugins: [selection]
});
```

Then, you can use the action creators that ships with the plugin to manage the
selected resources.

```js
import { selection } from 'redux-resource-plugins';
import store from './store';

// Select resources with ID "24" and ID "100"
store.dispatch(selection.selectResources('books', [24, 100]));

// Deselect resources with ID "24" and ID "100"
store.dispatch(selection.deselectResources('books', [24, 100]));

// Clear all of the selected books
store.dispatch(selection.clearSelectedResources('books'));
```

You can also pass resource objects. Just make sure that they have an ID!

```js
// Selects books with ID 24 and 100
store.dispatch(selection.selectResources('books', [
  { id: 24, title: 'My Name is Red' },
  100
]));
```

To access the selected resources, you can use code that might look something
like the following:

```js
import store from './store';

const books = store.getState().books;

// Access the selected resources directly
const selectedBooks = books.selectedIds.map(id => books.resources[id]);
```

Or, you could pass the selected IDs into an action creator to perform a bulk
operation.

```js
import { deleteBooks } from './books/action-creators';
import store from './store';

const books = store.getState().books;

// Initiate an action to delete all of the selected books
deleteBooks(books.selectedIds);
```

---

### `selectResources(resourceType, resources)`

Selects `resources` for slice `resourceType`. Resources that are already
selected will be ignored.

#### Arguments

1. `resourceType` *(String)*: The name of the slice to select resources from.

2. `resources` *(Array)*: An array of resources, or resource IDs, to be
  selected.

#### Returns

(*`Object`*): A Redux action.

---

### `deselectResources(resourceType, resources)`

Deselects `resources` for slice `resourceType`. Resources that aren't selected
will be ignored.

#### Arguments

1. `resourceType` *(String)*: The name of the slice to deselect resources from.

2. `resources` *(Array)*: An array of resources, or resource IDs, to deselect.

#### Returns

(*`Object`*): A Redux action.

---

### `clearSelectedResources(resourceType)`

Deselects every resource for slice `resourceType`.

#### Arguments

1. `resourceType` *(String)*: The name of the slice to clear the selected
  resources from.

#### Returns

(*`Object`*): A Redux action.

---

### Tips

- Whenever you delete resources, you will want to make sure that you manually
  deselect them.
