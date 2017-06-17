# Resources

resourceful-redux is all about managing resources. So what, exactly, is a
resource?

A resource is a plain JavaScript object that represents a single entity in
your application. For instance, it could represent a book, or a person, or
something more abstract, like a 'workflow' or 'responsibility.'

The only requirement of a resource is that it **must** have an `id`
attribute. The following are some examples of valid resources:

```js
{
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

Not all backend services return data that have an ID attribute. For such
services, a transformation function will need to be written to change that data
into resourceful-redux-compatible resources. We understand that this isn't
ideal, but we believe the benefits of resourceful-redux outweigh this
inconvenience.

Here are some examples of common data that a backend may send over, and how you
might change it into resourceful-redux compatible resources.

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
[
 'en': 'English',
 'fr': 'French',
 'es': 'Spanish'
]

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
