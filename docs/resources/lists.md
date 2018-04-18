# Lists

Applications frequently need to keep track of groupings of a resource type.
That's what lists are for. A list is an array of resource IDs. You can
make as many lists as you would like for each resource type.

Here are two situations when you might find lists useful:

- Keeping track of a server-side sorted array of resources
- If your UI allows user to "select" resources on your interface by clicking a
  checkbox, then you could store the "selected" IDs in a list

The above isn't meant to be exhaustive; it is simply to give you an idea of
the kinds of situations where lists can be useful. Any time that you need a
subsection of your resources (whether it needs to be ordered or not), you
should use lists.

The following shows what two lists look like in a resource slice:

```js
{
  resourceType: 'books',
  lists: {
    favorites: [1, 100, 52, 1230],
    selected: [24, 13, 1]
  },
  // ...there are other things in a resource slice, as well. But this guide will
  // focus on lists.
}
```

### List Names

A good list name is short and descriptive. Here are some examples:

- mostRecent
- searchResults
- favorites
- selected

You could include the resource type in the name, too (i.e. "selectedBooks").

Sometimes, you may need to use a dynamic list name. A dynamic list name is a string that has
a variable component to it, such as:

```js
`authorsBooks:${authorId}`
```

It is okay to use dynamic names, but keep in mind that static names are simpler to manage, so
you might find them preferable to use over dynamic list names.

Sometimes, you may think that you need a dynamic list name when another approach is better.

For instance, the above list, `authorsBooks:${authorId}` may represent the list of books that
were written by the author with the ID `authorId`. In this situation, you could instead
store that list of IDs on the author object itself, like a [foreign key](https://en.wikipedia.org/wiki/Foreign_key)
in a relational database.

This might look like:

```js
// An author 'resource object'
{
  id: 'a39cva22',
  name: 'Jane Austen',
  books: ['103', '10', '129903']
}
```

If the backend does not return this data with the author's primary data, then you may choose to store
the list of IDs on the author's [resource metadata](/docs/resources/meta.md) instead:

```js
// An author metadata object
{
  readStatus: 'SUCCEEDED',
  updateStatus: 'IDLE',
  createStatus: 'IDLE',
  deleteStatus: 'IDLE',
  books: ['103', '10', '129903']
}
```

### Accessing the Resources in a List

To retrieve the resources in a list, you can use
[`getResources`](/docs/api-reference/get-resources.md).

```js
import { getResources } from 'redux-resource';
import store from './my-redux-store';

const state = store.getState();
const favoriteBooks = getResources(state.books, 'favorites');
```

### Updating Lists

In the [next guide](/docs/resources/modifying-resources.md), we will cover how you can
modify data within a resource slice, including lists.
