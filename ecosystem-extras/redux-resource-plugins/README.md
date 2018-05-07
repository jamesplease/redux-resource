# Redux Resource Plugins

![npm version](https://img.shields.io/npm/v/redux-resource-plugins.svg) ![gzip size](http://img.badgesize.io/https://unpkg.com/redux-resource-plugins/dist/redux-resource-plugins.min.js?compression=gzip)

These plugins can be used to augment the reducer returned by `resourceReducer`. The plugins are a collection of common patterns that you may find yourself needing when writing a CRUD application.

Do you find yourself using the same plugin over and over? [Let us know](https://github.com/jamesplease/redux-resource/issues/new?title=New+plugin+suggestion), and it might find its way into this package!

## Other Guides

**Old Documentation**

* [2.x documentation](https://github.com/jamesplease/redux-resource/blob/33a79cfdddb0dc5dae10f7073ece28e90dbd1455/docs/extras/redux-resource-plugins.md)

**Migration Guides**

* [v2 to v3](https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource-plugins/docs/migration-guides/2-to-3.md)

## Installation

Install `redux-resource-plugins` from npm:

`npm install redux-resource-plugins --save`

Then, import the pieces of the package that you need:

```javascript
import { selection } from 'redux-resource-plugins';
```

## Usage

This library is a collection of different plugins. Refer to their individual documentation pages to learn more.

* [`reset`](reset.md): This plugin provides action types that let you reset the state of an entire slice. You can also pass a list to reset the state of just that list.
* [`includedResources`](included-resources.md): This plugin adds support for including multiple resource types into a single action for read requests. This can be useful if you're using GraphQL, JSON API, or normalizr.
* [`httpStatusCodes`](http-status-codes.md): Add this plugin to track the HTTP status codes associated with each request. The built-in reducer behavior doesn't provide any information specific to HTTP. What this means is that if a request fails, for instance, you won't be able to tell that it failed with a 404 response.

### Deprecated Plugins

The following plugins are deprecated. There are built-in features that provide the same functionality as these plugins.

* [`selection`](selection.md): This plugin allows you to

  maintain a list of "selected" resource IDs. If your interface displays a list

  of resources that the user can select to perform bulk operations on, then this

  might be useful to you.

