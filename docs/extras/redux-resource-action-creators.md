# Redux Resource Action Creators

[![npm version](https://img.shields.io/npm/v/redux-resource-action-creators.svg)](https://www.npmjs.com/package/redux-resource-action-creators)
[![gzip size](http://img.badgesize.io/https://unpkg.com/redux-resource-action-creators/dist/redux-resource-action-creators.min.js?compression=gzip)](https://unpkg.com/redux-resource-action-creators/dist/redux-resource-action-creators.min.js)

This library makes it more convenient to create valid Redux Resource actions. It helps out in two ways:

1. Remembering the [CRUD Action Types](/docs/api-reference/action-types.md) can be difficult
2. Often times, your "start" and "end" actions share many properties, and it can be verbose to copy + paste
  those properties

Unlike [Redux Resource XHR](/docs/extras/redux-resource-xhr.md), these action creators do not make the requests
for you. All this library does is create the actions themselves.

### Installation

Install `redux-resource-action-creators` from npm:

`npm install redux-resource-action-creators --save`

Then, import `createActionCreators` in your application:

```js
import createActionCreators from 'redux-resource-action-creators';
```

### Usage

This library has a single export, `createActionCreators`.

### `createActionCreators( crudAction, actionDefaults )`

#### Arguments

1. `crudAction`: *(String)* The CRUD operation being performed. One of "create",
  "read", "update", or "delete". This determines the
  [CRUD Action types](/docs/api-reference/action-types.md) that are dispatched.

2. `actionDefaults` *(Object)*: Properties that will be included on each dispatched
    action. The [the CRUD Action guide](/docs/guides/crud-actions.md) lists possible
    options, such as `resourceType` and `resources`. You *must* include `resourceType`.

#### Returns

(*`Object`*): An object with four methods: `pending`, `succeeded`, `failed`, and `null`.
  These action creators return actions for you, based on the action properties that
  you provide to them.

#### Example

```js
import createActionCreators from 'redux-resource-action-creators';
import store from './store';

const readActionCreators = createActionCreators('read', {
  resourceType: 'books',
  request: 'getHomePageBooks',
  list: 'homePageBooks',
  mergeListIds: false
});

store.dispatch(readActionCreators.pending());

const req = fetchData((err, res, body) => {
  if (req.aborted) {
    store.dispatch(readActionCreators.null());
  } else if (err) {
    store.dispatch(readActionCreators.failed());
  } else {
    store.dispatch(readActionCreators.succeeded({
      resources: body
    }));
  }
});
```

To understand why you might use this library, compare that example versus this common Redux
Resource code:

```js
import { actionTypes } from 'redux-resource';
import store from './store';

store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceType: 'books',
  request: 'getHomePageBooks',
  list: 'homePageBooks'
});

const req = fetchData((err, res, body) => {
  if (req.aborted) {
    store.dispatch({
      type: actionTypes.READ_RESOURCES_NULL,
      resourceType: 'books',
      request: 'getHomePageBooks',
      list: 'homePageBooks'
    });
  } else if (err) {
    store.dispatch({
      type: actionTypes.READ_RESOURCES_FAILED,
      resourceType: 'books',
      request: 'getHomePageBooks',
      list: 'homePageBooks'
    });
  } else {
    store.dispatch(readActionCreators.succeeded({
      type: actionTypes.READ_RESOURCES_SUCCEEDED,
      resourceType: 'books',
      request: 'getHomePageBooks',
      list: 'homePageBooks',
      resources: body
    }));
  }
});
```

All that this library does is provides a simple pattern to write less, more expressive code. If you'd like, you could get many
of the same benefits by defining shared action properties, and then spreading them in your actions:

```js
import { actionTypes } from 'redux-resource';
import store from './store';

const actionDefaults = {
  resourceType: 'books',
  request: 'getHomePageBooks',
  list: 'homePageBooks'
};

store.dispatch({
  ...actionDefaults,
  type: actionTypes.READ_RESOURCES_PENDING,
});

const req = fetchData((err, res, body) => {
  if (req.aborted) {
    store.dispatch({
      ...actionDefaults,
      type: actionTypes.READ_RESOURCES_NULL,
    });
  } else if (err) {
    store.dispatch({
      ...actionDefaults,
      type: actionTypes.READ_RESOURCES_FAILED,
    });
  } else {
    store.dispatch(readActionCreators.succeeded({
      ...actionDefaults,
      type: actionTypes.READ_RESOURCES_SUCCEEDED,
      resources: body
    }));
  }
});
```
