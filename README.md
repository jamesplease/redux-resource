# Resourceful Redux

A tiny but powerful system for managing 'resources': data that is persisted to
remote servers.

[![Gitter](https://badges.gitter.im/jmeas/resourceful-redux.svg)](https://gitter.im/jmeas/resourceful-redux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Travis build status](http://img.shields.io/travis/jmeas/resourceful-redux.svg?style=flat)](https://travis-ci.org/jmeas/resourceful-redux)
[![npm version](https://img.shields.io/npm/v/resourceful-redux.svg)](https://www.npmjs.com/package/resourceful-redux)
[![Test Coverage](https://codeclimate.com/github/jmeas/resourceful-redux/badges/coverage.svg)](https://codeclimate.com/github/jmeas/resourceful-redux)
[![Code Climate GPA](https://codeclimate.com/github/jmeas/resourceful-redux/badges/gpa.svg)](https://codeclimate.com/github/jmeas/resourceful-redux)
[![gzip size](http://img.badgesize.io/https://unpkg.com/resourceful-redux/dist/resourceful-redux.min.js?compression=gzip)](https://unpkg.com/resourceful-redux/dist/resourceful-redux.min.js)

### Installation

To install the latest stable version:

```
npm install --save resourceful-redux
```

### Size

Resourceful Redux is around 2kb gzipped, which is typically _much_ smaller than
the boilerplate code that it replaces.

### Documentation

View the documentation at
**[resourceful-redux.js.org ⇗](https://resourceful-redux.js.org/)**.

### Quick Start

Follow this guide to get a taste of what it's like to work with Resourceful
Redux.

First, we set up our store with a "resource reducer," which is a reducer that
manages the state for one type of resource. In this guide, our reducer will
handle the data for our "books" resource.

```js
import { store, combineReducers } from 'redux';
import { resourceReducer } from 'resourceful-redux';

const reducer = combineReducers({
  books: resourceReducer('books')
});

const store = createStore(reducer);
```

Once we have a store, we can start dispatching actions to it. In this example,
we initiate a request to read a book with an ID of 24, then follow it up with an
action representing success. There are two actions, because requests usually
occur over a network, and therefore take time to complete.

```js
import { actionTypes } from 'resourceful-redux';
import store from './store';

// This action represents beginning the request to read a book with ID of 24.
store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceName: 'books',
  resources: [24]
});

// Later, when the request succeeds, we dispatch the success action.
store.dispatch({
  type: actionTypes.READ_RESOURCES_SUCCEEDED,
  resourceName: 'books',
  resources: [{
    id: 24,
    title: 'My Name is Red',
    releaseYear: 1998,
    author: 'Orhan Pamuk'
  }]
});
```

Later, in your view layer, you can access information about the status of
this request. When it succeeds, accessing the returned book is straightforward.

```js
import { getStatus } from 'resourceful-redux';
import store from './my-store';

const state = store.getState();
// The second argument to this method is a path into the state. This method
// protects you from needing to check for undefined values.
const readStatus = getStatus(store, 'books.meta.24.readStatus');

if (readStatus.pending) {
  console.log('The request is in flight.');
}

else if (readStatus.failed) {
  console.log('The request failed.');
}

else if (readStatus.succeeded) {
  const book = state.books.resources[24];

  console.log('The book was retrieved successfully, and here is the data:', book);
}
```

This is just a small sample of what it's like working with Resourceful Redux.

For a real-life webapp example that uses many more CRUD operations, check out
the **[zero-boilerplate-redux webapp ⇗](https://github.com/jmeas/zero-boilerplate-redux)**.

### Repository Structure

This repository is a [Lerna](https://github.com/lerna/lerna) project. That means
it's a single repository that allows us to control the publishing of a number
of packages:

| Package | Version | Size | Description |
| ---- | ---- | ---- | ---- |
| `resourceful-redux` | [![npm version](https://img.shields.io/npm/v/resourceful-redux.svg)](https://www.npmjs.com/package/resourceful-redux) | [![gzip size](http://img.badgesize.io/https://unpkg.com/resourceful-redux/dist/resourceful-redux.min.js?compression=gzip)](https://unpkg.com/resourceful-redux/dist/resourceful-redux.min.js) | The main library |
| `resourceful-action-creators` | [![npm version](https://img.shields.io/npm/v/resourceful-action-creators.svg)](https://www.npmjs.com/package/resourceful-action-creators) | [![gzip size](http://img.badgesize.io/https://unpkg.com/resourceful-action-creators/dist/resourceful-action-creators.min.js?compression=gzip)](https://unpkg.com/resourceful-action-creators/dist/resourceful-action-creators.min.js) | The Action Creators extension |
| `resourceful-prop-types` | [![npm version](https://img.shields.io/npm/v/resourceful-prop-types.svg)](https://www.npmjs.com/package/resourceful-prop-types) | [![gzip size](http://img.badgesize.io/https://unpkg.com/resourceful-prop-types/dist/resourceful-prop-types.min.js?compression=gzip)](https://unpkg.com/resourceful-prop-types/dist/resourceful-prop-types.min.js) | The Prop Types extension |

### Contributing

Thanks for your interest in helping out! Check out the
[Contributing Guide](./CONTRIBUTING.md), which covers everything you'll need to
get up and running.
