<p align="center">
<a href="http://redux-resource.js.org">
<img src="https://user-images.githubusercontent.com/2322305/35489731-63e3bb20-044e-11e8-8211-b7d153722865.png" height="120" alt="Redux Resource Logo" aria-label="redux-resource.js.org" />
</a>
</p>

<p align="center">
  <a href="https://gitter.im/jmeas/redux-resource?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge">
    <img src="https://badges.gitter.im/jmeas/redux-resource.svg" alt="Redux Resource on Gitter" />
  </a>
  <a href="https://travis-ci.org/jmeas/redux-resource">
    <img src="http://img.shields.io/travis/jmeas/redux-resource.svg?style=flat" alt="Redux Resource Travis Builds" />
  </a>
  <a href="https://www.npmjs.com/package/redux-resource">
    <img src="https://img.shields.io/npm/v/redux-resource.svg" alt="Redux Resource NPM Package" />
  </a>
  <a href="https://codeclimate.com/github/jmeas/redux-resource">
    <img src="https://codeclimate.com/github/jmeas/redux-resource/badges/coverage.svg" alt="Redux Resource Code Coverage" />
  </a>
  <a href="https://unpkg.com/redux-resource/dist/redux-resource.min.js">
    <img src="http://img.badgesize.io/https://unpkg.com/redux-resource/dist/redux-resource.min.js?compression=gzip" alt="Redux Resource gzip Size" />
  </a>
</p>

A tiny but powerful system for managing 'resources': data that is persisted to
remote servers.

✓ Removes nearly all "boilerplate" code for remotely-stored data  
✓ Incrementally adoptable  
✓ Encourages best practices like [normalized state](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html)  
✓ Works well with APIs that adhere to standardized formats, such as JSON API  
✓ Works well with APIs that don't adhere to standardized formats, too  
✓ Integrates well with your favorite technologies: HTTP, gRPC, normalizr, redux-observable, redux-saga, and more  
✓ Microscopic file size (2kb gzipped!)

### Installation

To install the latest version:

```
npm install --save redux-resource
```

### Documentation

View the documentation at
**[redux-resource.js.org ⇗](https://redux-resource.js.org/)**.

### Quick Start

Follow this guide to get a taste of what it's like to work with Redux
Resource.

First, we set up our store with a "resource reducer," which is a reducer that
manages the state for one type of resource. In this guide, our reducer will
handle the data for our "books" resource.

```js
import { createStore, combineReducers } from 'redux';
import { resourceReducer } from 'redux-resource';

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
import { actionTypes } from 'redux-resource';
import store from './store';

// This action represents beginning the request to read a book with ID of 24. This
// could represent the start of an HTTP request, for instance.
store.dispatch({
  type: actionTypes.READ_RESOURCES_PENDING,
  resourceName: 'books',
  resources: [24]
});

// Later, when the request succeeds, we dispatch the success action.
store.dispatch({
  type: actionTypes.READ_RESOURCES_SUCCEEDED,
  resourceName: 'books',
  // The `resources` list here is usually the response from an API call
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

For a real-life webapp example that uses many more CRUD operations, check out
the **[zero-boilerplate-redux webapp ⇗](https://github.com/jmeas/zero-boilerplate-redux)**.
This example project uses [React](https://facebook.github.io/react/), although
Redux Resource works well with any view layer.

### Repository Structure

This repository is a [Lerna](https://github.com/lerna/lerna) project. That means
it's a single repository that allows us to control the publishing of a number
of packages. The source for each package can be found in the[
  `./packages`](https://github.com/jmeas/redux-resource/tree/master/packages)
  directory.

| Package | Version | Size | Description |
| ---- | ---- | ---- | ---- |
| `redux-resource` | [![npm version](https://img.shields.io/npm/v/redux-resource.svg)](https://www.npmjs.com/package/redux-resource) | [![gzip size](http://img.badgesize.io/https://unpkg.com/redux-resource/dist/redux-resource.min.js?compression=gzip)](https://unpkg.com/redux-resource/dist/redux-resource.min.js) | The main library |
| `redux-resource-xhr` | [![npm version](https://img.shields.io/npm/v/redux-resource-xhr.svg)](https://www.npmjs.com/package/redux-resource-xhr) | [![gzip size](http://img.badgesize.io/https://unpkg.com/redux-resource-xhr/dist/redux-resource-xhr.min.js?compression=gzip)](https://unpkg.com/redux-resource-xhr/dist/redux-resource-xhr.min.js) | A library that exports a powerful HTTP CRUD action creator |
| `redux-resource-plugins` | [![npm version](https://img.shields.io/npm/v/redux-resource-plugins.svg)](https://www.npmjs.com/package/redux-resource-plugins) | [![gzip size](http://img.badgesize.io/https://unpkg.com/redux-resource-plugins/dist/redux-resource-plugins.min.js?compression=gzip)](https://unpkg.com/redux-resource-plugins/dist/redux-resource-plugins.min.js) | A collection of common plugins |
| `redux-resource-prop-types` | [![npm version](https://img.shields.io/npm/v/redux-resource-prop-types.svg)](https://www.npmjs.com/package/redux-resource-prop-types) | [![gzip size](http://img.badgesize.io/https://unpkg.com/redux-resource-prop-types/dist/redux-resource-prop-types.min.js?compression=gzip)](https://unpkg.com/redux-resource-prop-types/dist/redux-resource-prop-types.min.js) | Handy Prop Types to use with Redux Resource |
| `redux-resource-action-creators` | [![npm version](https://img.shields.io/npm/v/redux-resource-action-creators.svg)](https://www.npmjs.com/package/redux-resource-action-creators) | [![gzip size](http://img.badgesize.io/https://unpkg.com/redux-resource-action-creators/dist/redux-resource-action-creators.min.js?compression=gzip)](https://unpkg.com/redux-resource-action-creators/dist/redux-resource-action-creators.min.js) | Unopinionated action creators for Redux Resource (bring your own HTTP request) |

### Contributing

Thanks for your interest in helping out! Check out the
[Contributing Guide](./CONTRIBUTING.md), which covers everything you'll need to
 get up and running.

### Contributors

([Emoji key](https://github.com/kentcdodds/all-contributors#emoji-key))

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars3.githubusercontent.com/u/2322305?v=4" width="100px;"/><br /><sub>James, please</sub>](http://www.jmeas.com)<br />[💻](https://github.com/jmeas/redux-resource/commits?author=jmeas "Code") [🔌](#plugin-jmeas "Plugin/utility libraries") [📖](https://github.com/jmeas/redux-resource/commits?author=jmeas "Documentation") [🤔](#ideas-jmeas "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/682566?v=4" width="100px;"/><br /><sub>Stephen Rivas JR</sub>](http://www.stephenrivasjr.com)<br />[💻](https://github.com/jmeas/redux-resource/commits?author=sprjr "Code") [📖](https://github.com/jmeas/redux-resource/commits?author=sprjr "Documentation") [🤔](#ideas-sprjr "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/4119765?v=4" width="100px;"/><br /><sub>Ian Stewart</sub>](https://github.com/ianmstew)<br />[🤔](#ideas-ianmstew "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/181635?v=4" width="100px;"/><br /><sub>Tim Branyen</sub>](http://tbranyen.com/)<br />[🤔](#ideas-tbranyen "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/254562?v=4" width="100px;"/><br /><sub>Jason Laster</sub>](https://github.com/jasonLaster)<br />[🤔](#ideas-jasonLaster "Ideas, Planning, & Feedback") | [<img src="https://avatars2.githubusercontent.com/u/1104846?v=4" width="100px;"/><br /><sub>marlonpp</sub>](https://github.com/marlonpp)<br />[🤔](#ideas-marlonpp "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/4296756?v=4" width="100px;"/><br /><sub>Javier Porrero</sub>](https://github.com/JPorry)<br />[🤔](#ideas-JPorry "Ideas, Planning, & Feedback") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars2.githubusercontent.com/u/25591356?v=4" width="100px;"/><br /><sub>Smai Fullerton</sub>](https://github.com/smaifullerton-wk)<br />[📖](https://github.com/jmeas/redux-resource/commits?author=smaifullerton-wk "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/276971?v=4" width="100px;"/><br /><sub>vinodkl</sub>](https://github.com/vinodkl)<br />[🤔](#ideas-vinodkl "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/828125?v=4" width="100px;"/><br /><sub>Eric Valadas</sub>](https://github.com/ericvaladas)<br />[📖](https://github.com/jmeas/redux-resource/commits?author=ericvaladas "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/195580?v=4" width="100px;"/><br /><sub>Jeremy Fairbank</sub>](http://blog.jeremyfairbank.com)<br />[🚇](#infra-jfairbank "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars1.githubusercontent.com/u/4226956?v=4" width="100px;"/><br /><sub>Yihang Ho</sub>](https://www.yihangho.com)<br />[💻](https://github.com/jmeas/redux-resource/commits?author=yihangho "Code") | [<img src="https://avatars2.githubusercontent.com/u/1026002?v=4" width="100px;"/><br /><sub>Bryce Reynolds</sub>](https://github.com/brycereynolds)<br />[💡](#example-brycereynolds "Examples") | [<img src="https://avatars1.githubusercontent.com/u/5614134?v=4" width="100px;"/><br /><sub>Ben Creasy</sub>](http://bencreasy.com)<br />[📖](https://github.com/jmeas/redux-resource/commits?author=jcrben "Documentation") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind are welcome!
