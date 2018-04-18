# Redux Resource XHR

[![npm version](https://img.shields.io/npm/v/redux-resource-xhr.svg)](https://www.npmjs.com/package/redux-resource-xhr)
[![gzip size](http://img.badgesize.io/https://unpkg.com/redux-resource-xhr/dist/redux-resource-xhr.min.js?compression=gzip)](https://unpkg.com/redux-resource-xhr/dist/redux-resource-xhr.min.js)


Redux Resource XHR is an action creator that simplifies CRUD operations.

More information about CRUD actions in Redux Resource can be
found in the [Request Actions](/docs/requests/request-actions.md) guide and the four
guides on CRUD:

- [Reading resources](/docs/requests/reading-resources.md)
- [Updating resources](/docs/requests/updating-resources.md)
- [Creating resources](/docs/requests/creating-resources.md)
- [Deleting resources](/docs/requests/deleting-resources.md)

We recommend familiarizing yourself with the content in those guides before using
this library.

### Other Guides

**Old Documentation**

- [2.x documentation](https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource-xhr/docs/old-versions/2.md)
- [3.x documentation](https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource-xhr/docs/old-versions/3.md)

**Migration Guides**

- [v2 to v3](https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource-xhr/docs/migration-guides/2-to-3.md)
- [v3 to v4](https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource-xhr/docs/migration-guides/3-to-4.md)

### Installation

Install `redux-resource-xhr` from npm:

`npm install redux-resource-xhr --save`

Then, import the `crudRequest` action creator in your application:

```js
import { crudRequest } from 'redux-resource-xhr';
```

### Usage

This library has two exports: an action creator for CRUD operations, `crudRequest`,
and the library used for making the HTTP requests, [`xhr`](#xhr-options-).

### `crudRequest( crudAction, options )`

An action creator for CRUD requests.

#### Arguments

1. `crudAction`: *(String)* The CRUD operation being performed. One of "create",
  "read", "update", or "delete". This determines the
  [CRUD Action types](/docs/api-reference/action-types.md) that are dispatched.

2. `options` *(Object)*: Options to configure the CRUD request.

  * `actionDefaults`: *(Object)* Properties that will be included on each dispatched
    action. All of [the Request Action options](/docs/requests/request-actions.md) are
    supported, such as `resourceType` and `resources`.

  * `dispatch`: *(Function)* The `dispatch` function of a Redux store. If you're using
    [`redux-thunk`]((https://github.com/gaearon/redux-thunk)), this will be the first
    argument of the thunk.

  * `xhrOptions`: *(Object)* Options to pass to the [`xhr`](#xhr-options-) library.
    You must pass a a `url` (or `uri`) option. You will typically also want to pass
    `json: true`, which will serialize your request body into JSON, as well as
    parse the response body as JSON. For more, see the examples below and
    [the xhr documentation](https://github.com/naugtur/xhr).

  * [`transformData`]: *(Function)* An optional function to transform the data
    received by the server. It receives one argument, `body`, which is the
    response from the server, parsed as JSON. Return a transformed list of
    `resources`. This can be used to format the server response into a
    Redux Resource-compatible format. For more, see the guide on
    [Resource objects](/docs/resources/resource-objects.md).

  * [`onPending`]: *(Function)* An optional function that allows you to modify
    the "pending" action, as well as control when it is dispatched. It is called
    with one argument: `action`. When this function is provided, you will be
    responsible for dispatching the action.

  * [`onAborted`]: *(Function)* An optional function that allows you to modify
    the "aborted" action, as well as control when it is dispatched. It is called
    with arguments `(action, res)`. When this function is provided, you will be
    responsible for dispatching the action.

  * [`onFailed`]: *(Function)* An optional function that allows you to modify
    the "failed" action, as well as control when it is dispatched. It is called
    with arguments `(action, err, res)`. When this function is provided, you will be
    responsible for dispatching the action.

  * [`onSucceeded`]: *(Function)* An optional function that allows you to modify
    the "succeeded" action, as well as control when it is dispatched. It is called
    with arguments `(action, res, body)`. When this function is provided, you will be
    responsible for dispatching the action.

    If all that you need to do is transform the resources that your backend returns,
    then you should use `transformData` instead of `onSuceeded`.

#### Returns

(*`XMLHttpRequest`*): An instance of a
[`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).
Typically, you'll use this object to abort the request (should you need to) by
calling `myXhr.abort()`.

#### Example

```js
import { crudRequest } from 'redux-resource-xhr';
import store from './store';

const xhrOptions = {
  method: 'GET',
  json: true,
  url: '/books',
  qs: {
    user: 'someone@example.com'
  }
};

const xhr = crudRequest('read', {
  dispatch: store.dispatch,
  actionDefaults: {
    resourceType: 'books',
    requestKey: 'getHomePageBooks',
    list: 'homePageBooks',
    mergeListIds: false
  },
  xhrOptions
});

// Cancel the request if you need to
xhr.abort();
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

- The `onSucceeded` option of `crudRequest` can be useful if your backend returns
  [related resources](docs/recipes/related-resources.md) in a single request.

- The `onSucceeded` and `onFailed` options can also be used for chaining requests.
  You can make a second (or third, or fourth!) HTTP request in these callbacks. This
  is useful when you need to make multiple requests to get all of the data that your
  interface needs.

- A good pattern for using this collection is to make your own action creators
  that "wrap" these action creators using
  [redux-thunk](https://github.com/gaearon/redux-thunk). That way, your view layer
  doesn't need to concern itself with all of the configuration necessary to use
  these action creators. For instances, an action creator for reading books in
  your application may look like the following:

  ```js
  import { crudRequest } from 'redux-resource-xhr';

  function readManyBooks({ pageNumber }) {
    return (dispatch) => {
      const xhrOptions = {
        method: 'GET',
        json: true,
        url: '/books',
        qs: { pageNumber }
      };

      return crudRequest('read', {
        actionDefaults: {
          resourceType: 'books',
          requestKey: 'getHomePageBooks',
          list: 'homePageBooks',
          mergeListIds: false,
        },
        xhrOptions,
        dispatch
      });
    };
  }
  ```

  Then, in your view layer, you can call `readManyBooks({ pageNumber: 5 })`.
