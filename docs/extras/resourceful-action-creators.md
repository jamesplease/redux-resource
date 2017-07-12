# Resourceful Action Creators

[![gzip size](http://img.badgesize.io/https://unpkg.com/resourceful-action-creators/dist/resourceful-action-creators.min.js?compression=gzip)](https://unpkg.com/resourceful-action-creators/dist/resourceful-action-creators.min.js)

Resourceful Redux provides a collection of action creators for Resourceful Redux 
Actions. It also comes with a tiny library for making HTTP requests.

To use the action creators, you must configure your store with the
[redux-thunk](https://github.com/gaearon/redux-thunk) middleware.

More information about understanding how to use these action creators can be
found in the [CRUD Actions](/docs/guides/crud-actions.md) guide, as well as
the four guides for each CRUD operation:

- [Reading resources](/docs/guides/reading-resources.md)
- [Updating resources](/docs/guides/reading-resources.md)
- [Creating resources](/docs/guides/reading-resources.md)
- [Deleting resources](/docs/guides/reading-resources.md)

### Installation

Install `resourceful-action-types` from npm:

`npm install resourceful-action-types --save`

Then, import the pieces of this collection that you need:

```js
import { readResources } from 'resourceful-action-creators';
```

### Usage

This collection exports five action creators, one for each of the CRUD 
operations, and one generic one. It also exports the library that is used for 
making HTTP requests.

### `crudAction( options )`

A generic action creator for performing CRUD operations.

#### Arguments

1. `options` *(Object|Function)*: Options to configure the CRUD operation.
  If a function is passed, it will be passed one argument: `state`, which is
  the current state of the Redux store. Passing a function allows you to
  configure the action creator based on the state.

  All of the options that you pass in will be included in the Actions that are
  dispatched. Because of this, all of
  [the CRUD Action options](/docs/guides/crud-actions.md) are supported, such
  as `resourceName`.

  There are several additional options that can be used to configure the
  actions:

  * `crudAction`: *(String)* The CRUD operation being performed. One of "create",
    "read", "update", or "delete". This determines which
    [CRUD Action types](/docs/api-reference/action-types.md) are dispatched.

  * `xhrOptions`: *(Object)* Options to pass to the `xhr` library. You must pass
    a a `url` (or `uri`) option. You will typically also want to pass
    `json: true`, which will serialize your request body into JSON, as well as
    parse the response body as JSON. For more, see the examples below and
    [the xhr documentation](https://github.com/naugtur/xhr).

  * [`transformData`]: *(Function)* An optional function to transform the data
    received by the server. It receives one argument, `body`, which is the
    response from the server, parsed as JSON. Return a transformed list of
    `resources`. This can be used to format the server response into a
    Resourceful Redux-compatible format. For more, see the guide on
    [Resources](/docs/guides/resources.md).

#### Returns

(*`XMLHttpRequest`*): An instance of a
[`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).
Typically, you'll use this object to abort the request (should you need to) by
calling `myXhr.abort()`.

#### Example

```js
import { crudAction } from 'resourceful-action-creators';
import store from './store';

const xhrOptions = {
  method: 'GET',
  json: true,
  url: '/books',
  qs: {
    user: 'someone@example.com'
  }
};

store.dispatch(crudAction({
  crudAction: 'read',
  resourceName: 'books',
  label: 'homePageBooks',
  mergeLabelIds: false,
  xhrOptions
}));
```

### `createResources( options )`

A convenience wrapper for the `crudAction` action creator that passes these
options by default:

```js
{
  crudAction: 'create',
  xhrOptions: {
    method: 'POST'
  }
}
```

#### Example

```js
import { createResources } from 'resourceful-action-creators';
import store from './store';

const newBook = {
  title: 'My Name is Red',
  releaseYear: 2004
};

const xhrOptions = {
  url: '/books',
  json: newBook
};

store.dispatch(createResources({
  resourceName: 'books',
  label: 'createBooks',
  mergeLabelIds: false,
  xhrOptions
}));
```

### `readResources( options )`

A convenience wrapper for the `crudAction` action creator that passes these
options by default:

```js
{
  crudAction: 'read',
  xhrOptions: {
    method: 'GET'
  }
}
```

#### Example

```js
import { readResources } from 'resourceful-action-creators';
import store from './store';

const xhrOptions = {
  url: '/books/1',
  json: true
};

// This is a singular endpoint, so it returns just one resource. But all of the
// Action Creators are bulk CRUD operations, so we place the result
// into an Array
function transformData(body) {
  return [body];
}

store.dispatch(readResources({
  resourceName: 'books',
  resources: [1],
  xhrOptions,
  transformData
}));
```

### `updateResources( options )`

A convenience wrapper for the `crudAction` action creator that passes these
options by default:

```js
{
  crudAction: 'update',
  xhrOptions: {
    method: 'PATCH'
  }
}
```

#### Example

```js
import { updateResources } from 'resourceful-action-creators';
import store from './store';

const updatedBook = {
  id: 10,
  title: 'My Name is Red',
  releaseYear: 2004
};

const xhrOptions = {
  url: '/books/10',
  json: updatedBook
};

store.dispatch(updateResources({
  resourceName: 'books',
  resources: [10],
  xhrOptions
}));
```

### `deleteResources( options )`

A convenience wrapper for the `crudAction` action creator that passes these
options by default:

```js
{
  crudAction: 'delete',
  xhrOptions: {
    method: 'DELETE'
  }
}
```

#### Example

```js
import { deleteResources } from 'resourceful-action-creators';
import store from './store';

const xhrOptions = {
  url: '/books/22',
  json: true
};

store.dispatch(deleteResources({
  resourceName: 'books',
  resources: [22],
  xhrOptions
}));
```

### `xhr( options )`

This is the library used to make HTTP requests. It is a thin wrapper around the
library [`xhr`](https://github.com/naugtur/xhr), and supports all of the same
options and signatures.

On top of that, it adds two features:

1. Support for a `qs` option (similar to the [`request`](https://github.com/request/request#requestoptions-callback) library).

2. Omitting the callback will return a native
  [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

#### Example

```js
import { xhr } from 'resourceful-action-creators';

const booksSearch = xhr.get('/books', {
  // Pass a `qs` option, and it will be stringified and appended to the URL
  // for you
  qs: {
    bookName: 'brilliance of the moon'
  },
  json: true
}, (err, res, body) => {
  console.log('Got some books', body);
});

// Later, you can abort the request:
booksSearch.abort();

// Omit a callback to get a native Promise. This can be useful sometimes, but the
// tradeoff is that you cannot cancel Promises.
xhr.get('/books/24')
  .then(
    (res) => console.log('got a book', res),
    (err) => console.log('there was an error', err)
  );
```

### Tips

- A good pattern for using this collection is to make your own action creators
  that "wrap" these action creators. That way, your view layer doesn't need to
  concern itself with all of the configuration necessary to use these action
  creators. For instances, your application's read many action creator may look
  like the following:

  ```js
  import { readResources } from 'resourceful-action-creators';

  function readManyBooks(pageNumber) {
    const xhrOptions = {
      method: 'GET',
      json: true,
      url: '/books',
      qs: { pageNumber }
    };

    return readResources({
      resourceName: 'books',
      label: 'homePageBooks',
      mergeLabelIds: false,
      xhrOptions
    });
  }
  ```
