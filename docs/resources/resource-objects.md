# Resource Objects

Each resource slice has a property called `resources`. All of your resource data is stored
here. If your application manages books, then you may have the following resource slice:

```js
{
  resourceType: 'books',
  resources: {
    4: {
      title: 'Harry Potter',
      releaseYear: 1997,
      author: 'J.K. Rowling'
    },
    102: {
      title: 'The Hobbit',
      releaseYear: 1937,
      author: 'J.R.R. Tolkien'
    }
  },
  // ...a resoure slice contains other information, too. But this guide
  // will focus on the `resources` section of the slice.
}
```

The `resources` object allows you to quickly access any resource given its ID. For instance,
the following code demonstrates accessing the data for the book with ID 102:

```js
const state = store.getState();

const book = state.books.resources[102];
```

> Note: For more advanced retrieval of resources from the store, you can use the
  [`getResources` method](/docs/api-reference/get-resources.md).

### What is a Resource?

Resources are the individual pieces of data that come from your backend. For instance,
if you're using a RESTful API, you might have an endpoint, `GET /books/24`, that returns
you the information for the book with the ID 24. That information is a single resource.

The only requirement of a resource is that it **must** have an `id`
property. The following are some examples of valid resources:

```js
{
  __typename: 'Person',
  id: 23,
  firstName: 'Bill',
  lastName: 'Graham',
  friendId: 250
}
```

```js
{
  id: '23',
  attributes: {
    firstName: 'Bill',
    lastName: 'Graham'
  },
  relationships: {
    friend: {
      type: 'person',
      id: 250
    }  
  }
}
```

```js
{
  id: '1586353b-7891-48ef-956a-07ea4d40e98f'
}
```

We understand that not all backend services return data that have an ID attribute.
For such services, a transformation function will need to be written to change
that data into Redux Resource-compatible resources. We understand that this isn't
ideal, but we believe the benefits of Redux Resource outweigh this
inconvenience.

Here are some examples of common data formats that a backend may send over, and
how you can change them into Redux Resource compatible resources.

```js
// Backend returns:
[
 'en',
 'fr',
 'es'  
]

// Transform it like so:
[
  {
    id: 'en'
  },
  {
    id: 'fr'
  },
  {
    id: 'es'
  },
]
```

```js
// Backend returns:
{
 'en': 'English',
 'fr': 'French',
 'es': 'Spanish'
}

// Transform it like so:
[
  {
    id: 'en',
    displayName: 'English'
  },
  {
    id: 'fr',
    displayName: 'French'
  },
  {
    id: 'es',
    displayName: 'Spanish'
  },
]
```

```js
// Backend returns:
[
 {
   bookId: 23,
   title: 'The Brilliance of the Moon'
 },
 {
   bookId: 120,
   title: 'The Good Thief'
 },
 {
   bookId: 255,
   title: 'My Name is Red'
 }
]

// Transform it like so:
[
  {
    id: 23,
    title: 'The Brilliance of the Moon'
  },
  {
    id: 120,
    title: 'The Good Thief'
  },
  {
    id: 255,
    title: 'My Name is Red'
  }
]
```

### Modifying Resources

There are two ways to modify resources: synchronously and asynchronously. The guide on
[modifying resources](/docs/resources/modifying-resources.md) describes both of these
approaches.
