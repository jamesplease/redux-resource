# Resourceful Plugins

[![gzip size](http://img.badgesize.io/https://unpkg.com/resourceful-plugins/dist/resourceful-plugins.min.js?compression=gzip)](https://unpkg.com/resourceful-plugins/dist/resourceful-plugins.min.js)

These plugins can be used to augment the reducer returned by `resourceReducer`.
The plugins are a collection of common patterns that you may find yourself
needing when writing a CRUD application.

Do you find yourself using the same plugin over and over?
[Let us know](https://github.com/jmeas/resourceful-redux/issues/new?title=New+plugin+suggestion),
and it might find its way into this package!

### Installation

Install `resourceful-plugins` from npm:

`npm install resourceful-plugins --save`

Then, import the pieces of the package that you need:

```js
import { selection } from 'resourceful-plugins';
```

### Usage

This library is a collection of different plugins. Refer to their individual
documentation pages to learn more.

- [`httpStatusCodes`](/docs/extras/http-status-codes-plugin.md): Add this plugin
  to track the HTTP status codes associated with each request. The built-in
  reducer behavior doesn't provide any information specific to HTTP. What this
  means is that if a request fails, for instance, you won't be able to tell that
  it failed with a 404 response.

- [`selection`](/docs/extras/selection-plugin.md): This plugin allows you to
  maintain a list of "selected" resource IDs. If your interface displays a list
  of resources that the user can select to perform bulk operations on, then this
  might be useful to you.

- [`reset`](/docs/extras/reset-plugin.md): This plugin provides action types
  that let you reset the state of an entire slice. You can also pass a label to
  reset the state of just that label.
