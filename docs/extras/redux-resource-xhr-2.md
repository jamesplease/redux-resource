# Redux Resource XHR (2.x API)

[![npm version](https://img.shields.io/npm/v/redux-resource-xhr.svg)](https://www.npmjs.com/package/redux-resource-xhr)
[![gzip size](http://img.badgesize.io/https://unpkg.com/redux-resource-xhr/dist/redux-resource-xhr.min.js?compression=gzip)](https://unpkg.com/redux-resource-xhr/dist/redux-resource-xhr.min.js)

> This API is deprecated. We recommend that you upgrade to the v3.0.0 API.
  Refer to [the migration guide](/docs/extras/redux-resource-xhr-migration.md)
  for tips on upgrading.

Redux Resource provides a collection of action creators for Redux Resource
Actions. These action creators use a thin wrapper around the
[xhr](https://github.com/naugtur/xhr) library for making HTTP requests.

More information about understanding how to use these action creators can be
found in the [CRUD Actions](/docs/guides/crud-actions.md) guide, as well as
the four guides for each CRUD operation:

- [Reading resources](/docs/guides/reading-resources.md)
- [Updating resources](/docs/guides/updating-resources.md)
- [Creating resources](/docs/guides/creating-resources.md)
- [Deleting resources](/docs/guides/deleting-resources.md)

These action creators work well for endpoints that operate on a single resource
type. If your backend includes endpoints that involve more than one resource
type (such as including a primary resource _and_ its related resources in a
single GET request), then you will likely need to write custom action creators
to handle those specific endpoints.

A pattern that works well is to use these action creators for endpoints that
target a single resource type, and then write custom action creators for more
complex endpoints.

### Installation

Install `redux-resource-xhr` from npm:

`npm install redux-resource-xhr --save`

Then, import the pieces of the package that you need:

```js
import { readResources } from 'redux-resource-xhr';
```

### Usage

This collection exports five action creators, one for each of the CRUD
operations, and one generic one. It also exports the library that is used for
making HTTP requests.

### `crudAction( options, [callback] )`

A generic action creator for performing CRUD operations.

#### Arguments

1. `options` *(Object)*: Options to configure the CRUD operation.

  All of the options that you pass in will be included in the Actions that are
  dispatched. Because of this, all of
  [the CRUD Action options](/docs/guides/crud-actions.md) are supported, such
  as `resourceName`.

  There are several additional options that can be used to configure the
  actions:

  * `dispatch`: *(Function)* The `dispatch` function of a Redux store. If you're using
    [`redux-thunk`]((https://github.com/gaearon/redux-thunk)), this will be the first
    argument of the thunk.

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
    Redux Resource-compatible format. For more, see the guide on
    [Resources](/docs/guides/resources.md).

2. `callback` *(Function, optional)*: This is called _after_ the "end" action is
  dispatched for this CRUD action. It receives 3 arguments `(err, res, body)`,
  which are the same arguments passed to the
  [xhr](https://www.npmjs.com/package/xhr#var-req--xhroptions-callback)
  callback.

#### Returns

(*`XMLHttpRequest`*): An instance of a
[`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).
Typically, you'll use this object to abort the request (should you need to) by
calling `myXhr.abort()`.

#### Example

```js
import { crudAction } from 'redux-resource-xhr';
import store from './store';

const xhrOptions = {
  method: 'GET',
  json: true,
  url: '/books',
  qs: {
    user: 'someone@example.com'
  }
};

crudAction({
  dispatch: store.dispatch,
  crudAction: 'read',
  resourceName: 'books',
  request: 'getHomePageBooks',
  list: 'homePageBooks',
  mergeListIds: false,
  xhrOptions
});
```

### `createResources( options, [callback] )`

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
import { createResources } from 'redux-resource-xhr';
import store from './store';

const newBook = {
  title: 'My Name is Red',
  releaseYear: 2004
};

const xhrOptions = {
  url: '/books',
  json: newBook
};

createResources({
  dispatch: store.dispatch,
  resourceName: 'books',
  request: 'createBooks',
  xhrOptions
});
```

### `readResources( options, [callback] )`

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
import { readResources } from 'redux-resource-xhr';
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

readResources({
  dispatch: store.dispatch,
  resourceName: 'books',
  resources: [1],
  xhrOptions,
  transformData
});
```

### `updateResources( options, [callback] )`

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
import { updateResources } from 'redux-resource-xhr';
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

updateResources({
  dispatch: store.dispatch,
  resourceName: 'books',
  resources: [10],
  xhrOptions
});
```

### `deleteResources( options, [callback] )`

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
import { deleteResources } from 'redux-resource-xhr';
import store from './store';

const xhrOptions = {
  url: '/books/22',
  json: true
};

deleteResources({
  dispatch: store.dispatch,
  resourceName: 'books',
  resources: [22],
  xhrOptions
});
```

### `xhr( options )`

This is the library used to make HTTP requests. It is a thin wrapper around the
library [`xhr`](https://github.com/naugtur/xhr), and supports all of the same
options and signatures.

On top of that, it adds several new features:

1. Support for query string serialization (similar to the [`request`](https://github.com/request/request#requestoptions-callback) library).

2. Omitting the callback will return a native
  [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

#### Customizing Query String Serialization

If you pass a `qs` object, then the object will be serialized into a query parameter
using the [`querystringify`](https://www.npmjs.com/package/querystringify) library. This
library supports basic serialization, but we don't expect it to work for every API that
you interface with.

You can change how the query string is serialized using two options:

- `qsStringify` - a function with the signature `(qs, options)`. It should return
  the string to be appended to the URI.

- `qsStringifyOptions` - an object that is passed as the second argument to the `qsStringify`
  method.

For instance, if you wish to use the `qs` library, you might do this:

```js
import { xhr } from 'redux-resource-xhr';
import qs from 'qs';

xhr('/books', {
  method: 'GET',
  qs: {
    pageSize: 10,
    pageNumber: 0,
    publishers: ['goldenBooks', 'penguinBooks']
  },
  qsStringify: qs.stringify,
  qsStringifyOptions: { arrayFormat: 'brackets' }
}, cb);
```

#### Example

```js
import { xhr } from 'redux-resource-xhr';

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
  that "wrap" these action creators using
  [redux-thunk](https://github.com/gaearon/redux-thunk). That way, your view layer
  doesn't need to concern itself with all of the configuration necessary to use
  these action creators. For instances, your application's read many action creator
  may look like the following:

  ```js
  import { readResources } from 'redux-resource-xhr';

  function readManyBooks(pageNumber) {
    return (dispatch) => {
      const xhrOptions = {
        method: 'GET',
        json: true,
        url: '/books',
        qs: { pageNumber }
      };

      return readResources({
        resourceName: 'books',
        request: 'getHomePageBooks',
        list: 'homePageBooks',
        mergeListIds: false,
        xhrOptions,
        dispatch
      });
    };
  }
  ```