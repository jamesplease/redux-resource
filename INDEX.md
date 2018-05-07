# Home

![Travis build status](https://badges.gitter.im/jmeas/redux-resource.svg) ![Travis build status](http://img.shields.io/travis/jamesplease/redux-resource.svg?style=flat) ![npm version](https://img.shields.io/npm/v/redux-resource.svg) ![Test Coverage](https://coveralls.io/repos/github/jamesplease/redux-resource/badge.svg?branch=master) ![gzip size](http://img.badgesize.io/https://unpkg.com/redux-resource/dist/redux-resource.min.js?compression=gzip)

A tiny but powerful system for managing 'resources': data that is persisted to remote servers.

✓ Removes nearly all boilerplate code for remotely-stored data  
✓ Incrementally adoptable  
✓ Encourages best practices like [normalized state](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html)  
✓ Works well with APIs that adhere to standardized formats, such as JSON API  
✓ Works well with APIs that don't adhere to standardized formats, too  
✓ Integrates well with your favorite technologies: HTTP, gRPC, normalizr, redux-observable, redux-saga, and more  
✓ Microscopic file size \(3kb gzipped!\)

## Older Documentation

This website is for the v3.0.0 version of Redux Resource. The documentation for older versions are hosted elsewhere:

* [**v2.4.1**](https://jamesplease.github.io/redux-resource-2.4.1-docs/)

> Migration guides to the latest version can be found [**here**](https://redux-resource.js.org/other-guides/migration-guides.html).

## Installation

To install the latest version:

```text
npm install --save redux-resource
```

## Table of Contents

* [**Quick Start**](INDEX.md#quick-start)

  The quick start guide is a quick overview of basic Redux Resource usage.

* [**Introduction**](introduction/)

  The introduction explains why this library exists, and also explores alternative solutions.

* [**Resources**](resources/)

  This section of the guides cover resource data, resource metadata, and resource lists.

* [**Requests**](requests/)

  Requests represent asynchronous updates to resources. Learn more about them here.

* [**Other Guides**](other-guides/)

  These guides cover additional topics related to using React Request.

* [**Recipes**](recipes/)

  Recipes are recommended patterns and best practices that you can use in your application.

* [**Ecosystem Extras**](ecosystem-extras/)

  Redux Resource provides officially maintained bits of code that make working with the library even better.

* [**FAQ**](faq/)

  Answers to frequently asked questions.

* [**API Reference**](api-reference/)

  Describes the API of all of the exports of Redux Resource.

## Quick Start

Follow this guide to get a taste of what it's like to work with Redux Resource.

First, we set up our store with a "resource reducer," which is a reducer that manages the state for one type of resource. In this guide, our reducer will handle the data for our "books" resource.

```javascript
import { createStore, combineReducers } from 'redux';
import { resourceReducer } from 'redux-resource';

const reducer = combineReducers({
  books: resourceReducer('books')
});

const store = createStore(reducer);
```

Once we have a store, we can start dispatching actions to it. In this example, we initiate a request to read a book with an ID of 24, then follow it up with an action representing success. There are two actions, because requests usually occur over a network, and therefore take time to complete.

```javascript
import { actionTypes } from 'redux-resource';
import store from './store';

// This action represents beginning the request to read a book with ID of 24. This
// could represent the start of an HTTP request, for instance.
store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceType: 'books',
  resources: [24]
});

// Later, when the request succeeds, we dispatch the success action.
store.dispatch({
  type: actionTypes.READ_RESOURCES_SUCCEEDED,
  resourceType: 'books',
  // The `resources` list here is usually the response from an API call
  resources: [{
    id: 24,
    title: 'My Name is Red',
    releaseYear: 1998,
    author: 'Orhan Pamuk'
  }]
});
```

Later, in your view layer, you can access information about the status of this request. When it succeeds, accessing the returned book is straightforward.

```javascript
import { getStatus } from 'redux-resource';
import store from './store';

const state = store.getState();
// The second argument to this method is a path into the state tree. This method
// protects you from needing to check for undefined values.
const readStatus = getStatus(store, 'books.meta[24].readStatus');

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

This is just a small sample of what it's like working with Redux Resource.

For a real-life webapp example that uses many more CRUD operations, check out the [**zero-boilerplate-redux webapp ⇗**](https://github.com/jamesplease/zero-boilerplate-redux). This example project uses [React](https://facebook.github.io/react/), although Redux Resource works well with any view layer.

## Contributors

\([Emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)\)

| [![](https://avatars3.githubusercontent.com/u/2322305?v=4) James, please](http://www.jmeas.com) [💻](https://github.com/jamesplease/redux-resource/commits?author=jamesplease) [🔌](INDEX.md#plugin-jamesplease) [📖](https://github.com/jamesplease/redux-resource/commits?author=jamesplease) [🤔](INDEX.md#ideas-jamesplease) | [![](https://avatars3.githubusercontent.com/u/682566?v=4) Stephen Rivas JR](http://www.stephenrivasjr.com) [💻](https://github.com/jamesplease/redux-resource/commits?author=sprjr) [📖](https://github.com/jamesplease/redux-resource/commits?author=sprjr) [🤔](INDEX.md#ideas-sprjr) | [![](https://avatars0.githubusercontent.com/u/4119765?v=4) Ian Stewart](https://github.com/ianmstew) [🤔](INDEX.md#ideas-ianmstew) | [![](https://avatars3.githubusercontent.com/u/181635?v=4) Tim Branyen](http://tbranyen.com/) [🤔](INDEX.md#ideas-tbranyen) | [![](https://avatars1.githubusercontent.com/u/254562?v=4) Jason Laster](https://github.com/jasonLaster) [🤔](INDEX.md#ideas-jasonLaster) | [![](https://avatars2.githubusercontent.com/u/1104846?v=4) marlonpp](https://github.com/marlonpp) [🤔](INDEX.md#ideas-marlonpp) | [![](https://avatars1.githubusercontent.com/u/4296756?v=4) Javier Porrero](https://github.com/JPorry) [🤔](INDEX.md#ideas-JPorry) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [![](https://avatars2.githubusercontent.com/u/25591356?v=4) Smai Fullerton](https://github.com/smaifullerton-wk) [📖](https://github.com/jamesplease/redux-resource/commits?author=smaifullerton-wk) | [![](https://avatars3.githubusercontent.com/u/276971?v=4) vinodkl](https://github.com/vinodkl) [🤔](INDEX.md#ideas-vinodkl) | [![](https://avatars3.githubusercontent.com/u/828125?v=4) Eric Valadas](https://github.com/ericvaladas) [📖](https://github.com/jamesplease/redux-resource/commits?author=ericvaladas) | [![](https://avatars0.githubusercontent.com/u/195580?v=4) Jeremy Fairbank](http://blog.jeremyfairbank.com) [🚇](INDEX.md#infra-jfairbank) | [![](https://avatars1.githubusercontent.com/u/4226956?v=4) Yihang Ho](https://www.yihangho.com) [💻](https://github.com/jamesplease/redux-resource/commits?author=yihangho) | [![](https://avatars2.githubusercontent.com/u/1026002?v=4) Bryce Reynolds](https://github.com/brycereynolds) [💡](INDEX.md#example-brycereynolds) | [![](https://avatars1.githubusercontent.com/u/5614134?v=4) Ben Creasy](http://bencreasy.com) [📖](https://github.com/jamesplease/redux-resource/commits?author=jcrben) |

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!

