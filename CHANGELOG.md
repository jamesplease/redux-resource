## 7/31/18

##### `redux-resource@3.0.4`

**Bug Fixes**

- Fixes an issue where the `DELETE_RESOURCES` action type could log an invalid warning message
  to the console in certain situations.

##### `redux-resource-plugins@3.1.0`

**New Features**

- The `includedResources` plugin now supports create requests in addition to update requests.

## 4/26/18

##### `redux-resource@3.0.3`

**Bug Fixes**

- Fixes an error that was thrown in certain environments, such as React Native

##### `redux-resource@3.0.2`

**Bug Fixes**

- The `actionTypes` export has been fixed. It was not exporting `UPDATE_RESOURCES`
  nor `DELETE_RESOURCES`.

## 4/18/18

- All libraries have been updated to allow for Redux@4 as a peer dependency.

## 4/17/18

##### `redux-resource@3.0.0` [Migration guide](https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource/docs/migration-guides/2-to-3.md)

**Breaking Changes**

* The `NULL` request status has been renamed to `IDLE`. The request action types (such as `READ_RESOURCES_NULL`) have
  been updated to reflect this new name.

* As a consequence of the above change, `getStatus` will now return an object with an `idle` key rather than a `null` key.

* The deprecated `getResources()` signature that accepted three arguments has been removed.

* Omitting a `filter` when calling `getResources` now returns all of the resources in the slice.

* Four action types have been reserved for a future minor release of Redux Resource: `REQUEST_IDLE`, `REQUEST_PENDING`,
  `REQUEST_SUCCEEDED`, and `REQUEST_FAILED`. Using these action types will cause a warning to be logged, and will
  conflict with an upcoming update to the library.

**New Features**

* The `resourceType` is now stored on the resource slice.

* There are two new action types for directly modifying resource data independent from requests: `UPDATE_RESOURCES`
  and `DELETE_RESOURCES`.

**Deprecations**

* Using the `resourceName` property on actions. Use `resourceType` instead.

##### `redux-resource-xhr@4.0.0` [Migration Guide](https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource-xhr/docs/migration-guides/3-to-4.md)

**Breaking Changes**

- The library now sets HTTP status codes onto Request Objects by default. The HTTP Status Codes plugin
  is no longer nececessary for this functionality.

- HTTP status codes are no longer wiped when a request becomes pending

**New Features**

- You can now pass `requestProperties` to your actions. These are additional properties that
  will be added to the Request Object in the state.

##### `redux-resource-plugins@3.0.0` [Migration Guide](https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource-plugins/docs/migration-guides/2-to-3.md)

**Breaking Changes**

- HTTP Status Codes Plugin: Actions without status codes will now set a status code of null rather than 0.

##### `redux-resource-prop-types@4.0.0` [Migration Guide](https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource-prop-types/docs/migration-guides/3-to-4.md)

**Breaking Changes**

- The library has been updated to reflect the changes in `redux-resource@3.0.0`. You should
not need to make any changes.

##### `redux-resource-action-creators@2.0.0` [Migration Guide](https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource-action-creators/docs/migration-guides/1-to-2.md)

**Breaking Changes**

- The library has been updated to reflect the changes in `redux-resource@3.0.0`. You should
not need to make any changes.

## 2/8/18

##### `redux-resource@2.4.1`

* IDs that were a the number `0` would cause error messages to be logged in certain situations. Also,
  they would not be deleted when using the built-in delete action type. This issue has been resolved.

##### `redux-resource-action-creators@1.0.1`

* The file names for the UMD builds were incorrect. Previously, it was `redux-resource-prop-types.min.js`.
  Now, it is `redux-resource-action-creators.min.js`.

  This change should not impact Webpack, Node, nor Browserify users. It only impacts developers who were
  using this path directly in their application code.

## 12/9/17

##### `redux-resource-action-creators@1.0.0`

* This new library that may help you create valid Redux Resource action. For more,
  see [the documentation](https://redux-resource.js.org/docs/extras/redux-resource-action-creators.html).

## 12/8/17

Today's updates include features that make it easier to work with
[related resources](https://redux-resource.js.org/docs/recipes/related-resources.html).

##### `redux-resource@2.4.0`

* `upsertResources` and `setResourceMeta` now accept an Object for `resources`
  as well as an Array.

##### `redux-resource-plugins@2.1.0`

* There is now a new plugin,
  [Included Resources](https://redux-resource.js.org/docs/extras/included-resources-plugin.html).

##### `redux-resource-xhr@2.2.0`

* Introduces a new API that provides the user with more control over when actions
  are dispatched, and the shape of those actions.
* Deprecates the old API. See
  [the migration guide](https://github.com/jmeas/redux-resource/blob/master/packages/redux-resource-xhr/docs/migration-guides/2-to-3.md).

##### `redux-resource-xhr@3.0.0`

* Removes the deprecated `2.x` API.

## 10/24/17

**Bug Fixes**

* All libraries have been updated to fix an issue with the ES Modules build where
  the Babel helpers were not included in the bundle. The published package
  versions with this fix are:

  * `redux-resource@2.3.2`
  * `redux-resource-xhr@2.1.1`
  * `redux-resource-plugins@2.0.2`
  * `redux-resource-prop-types@3.0.1`

## 10/24/17

##### `redux-resource@2.3.1`

**Bug Fixes**

* The warning message when a `request` or `resources` attribute is missing from
  an action has been fixed. Previously, it would suggest that adding a `"list"`
  would resolve the warning, but that's not true!

## 10/20/17

##### `redux-resource-xhr@2.1.0`

**New Features**

* You can now customize the query string serializer by using the
  `qsStringify` and `qsStringifyOptions` XHR options. For more, refer
  to [the documentation](https://redux-resource.js.org/docs/extras/redux-resource-xhr.html).

##### `redux-resource-prop-types@3.0.0`

**Breaking Changes**

* `resourceIdsPropType` has been removed
* `slicePropType` has been removed
* `resourcesPropType` has been removed

**New Features**

* Several new prop types that you can use to build better replacements for the
  above deletions. For more, refer to
  [the migration guide](<(https://github.com/jmeas/redux-resource/blob/master/packages/redux-resource-prop-types/MIGRATING.md)>).

## 10/19/17

##### `redux-resource@2.3.0`

**New Features**

* `getStatus` now supports bracket notation for pathing. For instance,
  `getStatus(state, 'books.resources[24].readStatus')`.

## 10/17/17

##### `redux-resource@2.2.1`

**Changes**

* A README has been added to the npm package.

##### Extras `@2.0.1`

**Changes**

* A README has been added to the npm packages.

## 10/17/17

##### `redux-resource@2.2.0`

**New Features**

* `getResources` has a new signature that only accepts two arguments. This makes it easier to use
  `getResources` in applications that aren't using `combineReducers`. Read more on
  [the API documentation page](https://redux-resource.js.org/docs/api-reference/get-resources.html).

**Deprecations**

* The old API of `getResources` that accepts three arguments.

## 10/13/17

##### `redux-resource@2.1.0`

**New Features**

* `getResources` now accepts a filter function. Read more on
  [the API documentation page](https://redux-resource.js.org/docs/api-reference/get-resources.html).

## 10/11/17

##### `@2.0.0`

> Note: No changes were made from `2.0.0-beta1`.

Here is a summary of changes between 1.0.x and 2.0.0:

**Breaking Changes**

* `getResources` now returns resources from lists, rather than requests.
* The `labels` section of a slice has been renamed to be `requests`.
* The library has been renamed from `resourceful-redux` to be `redux-resource`

**New Features**

* The `resourceful-redux` library now supports lists, which separates two use
  cases both previously managed by `labels`. Lists are designed to track ordered
  collections of resources, like results from a search or a 'most popular books'.
  Labels are now able to focus solely on named requests that aren't necessarily
  tied to specific resources (e.g. to track the creation of new resources that
  may not have IDs yet). For more info, refer to #187 or read further in
  our [docs](https://resourceful-redux.js.org/).
* Loading Redux Resource in browser global environments (when you're not using
  Webpack, Browserify, Rollup, or another bundler like these) now works.
* The reset plugin now supports resetting a list and/or a request, or the entire
  state slice.

## 9/30/17

##### `@2.0.0-beta1`

**Bug Fixes**

* `getResources` now works properly.

## 9/29/17

##### `@2.0.0-beta`

**Breaking Changes**

* `getResources` now returns resources from lists, rather than requests.
* The `labels` section of a slice has been renamed to be `requests`.
* The library has been renamed from `resourceful-redux` to be `redux-resource`

**New Features**

* Loading Redux Resource in browser global environments (when you're not using
  Webpack, Browserify, Rollup, or another bundler like these) now works.
* The reset plugin now supports resetting a list and/or a request, or the entire
  state slice.

## 9/14/17

##### `resourceful-redux@1.1.0-beta`

**New Features**

* The `resourceful-redux` library now supports lists, which separates two use
  cases both previously managed by `labels`. Lists are designed to track ordered
  collections of resources, like results from a search or a 'most popular books'.
  Labels are now able to focus solely on named requests that aren't necessarily
  tied to specific resources (e.g. to track the creation of new resources that
  may not have IDs yet). For more info, refer to #187 or read further in
  our [docs](https://resourceful-redux.js.org/).

## 9/12/17

##### `resourceful-xhr@1.2.0`

**New Features**

* The `resourceful-xhr` library now supports an alternative API that allows for
  better chaining of requests. For more, refer to issue #190. The old API is
  still supported, but it will be removed in resourceful-xhr@2.0.0.

##### `resourceful-xhr@2.0.0`

**Breaking Changes**

* The old API of `resourceful-xhr@1.x` has been removed. Only the API introduced
  in `resourceful-xhr@1.2.0` is now available.

## 9/7/17

##### `resourceful-xhr@1.1.0`

The `resourceful-action-creators` library has been renamed to `resourceful-xhr`.

## 8/18/17

##### `resourceful-action-creators@1.1.0`

**New Features**

* All action creators now accept a second, optional argument `callback(err, res, body)`
  that is invoked after the XHR is complete and `dispatch()` events trigged.

## [v1.0.1](https://github.com/jmeas/resourceful-redux/releases/tag/v1.0.1) (8/18/17)

**Bug Fixes**

* Fixes an issue where apps bundled with Webpack 1 or CommonJS were always in development
  mode.

## [v1.0.0](https://github.com/jmeas/resourceful-redux/releases/tag/v1.0.0) (8/3/17)

* No changes. This release marks the stability of the API.

## [v0.5.0](https://github.com/jmeas/resourceful-redux/releases/tag/v0.5.0) (7/21/17)

**New Features**

* `resourceful-plugins`: A new library has been added, `resourceful-plugins`.
  This is a collection of of common plugins that you can use for your CRUD apps.

## [v0.4.0](https://github.com/jmeas/resourceful-redux/releases/tag/v0.4.0) (7/21/17)

**Changes**

* More warnings in development mode should help catch mistakes

**Breaking Changes**

* Redux@3.x is now a peerDependency of Resourceful Redux, Resourceful Action
  Creators, and Resourceful Prop Types
* `resourceful-action-creators`: All end actions now always pass the `res`
  object
* `resourceful-action-creators`: The actions now pass a `statusCode` property,
  which represents the current status code of the request.

**Bug Fixes**

* `resourceful-action-creators`: The `xhr` object will now be returned when
  using the shorthand action creators (such as `readResources`).

## [v0.3.0](https://github.com/jmeas/resourceful-redux/releases/tag/v0.3.0) (7/11/17)

**Changes**

* Smaller build file-size
* There is now an ES modules export
* New warnings will be emitted in dev mode to catch errors when using the API

**Breaking Changes**

* Developer warnings will now use `console.error`, rather than `console.warn`

**Bug Fixes**

* Resources without an ID will no longer set metadata on the key `undefined`
  within `slice.meta`
* Non-string labels will be ignored

## [v0.2.0](https://github.com/jmeas/resourceful-redux/releases/tag/v0.2.0) (7/9/17)

**Changes**

* Resourceful Redux will now log warnings in more situations where you might be
  making mistakes to help you out.

## [v0.1.2](https://github.com/jmeas/resourceful-redux/releases/tag/v0.1.2) (7/9/17)

**Bug Fixes**

* Non-success CRUD actions will now ensure that the resource's metadata includes
  the initial metadata (gh-103)

## [v0.1.1](https://github.com/jmeas/resourceful-redux/releases/tag/v0.1.1) (7/9/17)

**Bug Fixes**

* Successful CRUD operations no longer squash the status of other CRUD
  operations within resource metadata (gh-100)

## [v0.1.0](https://github.com/jmeas/resourceful-redux/releases/tag/v0.1.0) (7/8/17)

**Breaking Changes**

* The plugin argument signature has changed. Refer to the documentation for
  more.
* The Resourceful Prop Types no longer include `isRequired` by default. It is
  now opt in.

**Bug Fixes**

* In Resourceful Action Creators, the shortcut methods for the wrapped `xhr`
  (such as `xhr.get`) now accept all of the same signatures as the `xhr` lib.
* Fixed a `console.warn` in Resourceful Redux that wasn't warning when it should
  have been warning.

## [v0.0.14](https://github.com/jmeas/resourceful-redux/releases/tag/v0.0.14) (7/6/17)

**Bug Fixes**

* The Action Creators extension will now return the `resources` array that you
  pass as options when a successful response is received from the backend
  without a response body.

* The name of the delete metadata has now been normalized as `deleteStatus`.

## [v0.0.13](https://github.com/jmeas/resourceful-redux/releases/tag/v0.0.13) (7/6/17)

* No changes.

## [v0.0.12](https://github.com/jmeas/resourceful-redux/releases/tag/v0.0.12) (7/6/17)

* No changes. There was an issue with the deploy of 0.0.11 that's been fixed.

## [v0.0.11](https://github.com/jmeas/resourceful-redux/releases/tag/v0.0.11) (7/5/17)

**Breaking Changes**

* Resourceful Action Creators will no longer throw errors. Instead, it will
  log warnings to the console.

**Bug Fixes**

* Warnings will only be logged when a resources array is missing from an action
  completely, but not when it is present but empty.

## [v0.0.10](https://github.com/jmeas/resourceful-redux/releases/tag/v0.0.10) (7/4/17)

**Breaking Changes**

* Resourceful Action Creators and Resourceful Prop Types are no longer included
  with the `resourceful-redux` npm package. They may be reintroduced, but there
  were too many bugs with the implementation being used. You can now install
  each collection of extras from npm directly.

* New warning messages and Errors will be thrown when common mistakes are made
  when using the API.

**Bug Fixes**

* Resourceful Action Creators will now dispatch the correct actions for
  successful actions.

## [0.0.9](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.9) (6/29/17)

**Breaking Changes**

* The `resources` Array is now an Object. This will only be breaking if you're
  accessing or modifying the `resources` Array directly. If you're using
  `getResources` for accessing resources, and `upsertResources` for updating
  resources, then this change will not be breaking.

## [0.0.8](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.8) (6/27/17)

**Bug Fixes**

* Fixes a bug that would cause errors to be thrown when using Resourceful
  Action Creators
* Fixes the location of the Resourceful Action Creators and Resourceful Prop
  Types in the npm module

## [0.0.7](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.7) (6/24/17)

**New Features**

* Two extras have been added to the `npm` package: Resourceful Prop Types and
  Resourceful Action Creators.

## [0.0.6](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.6) (6/22/17)

**New Features**

* Adds `getResources` method

## [0.0.5](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.5) (6/20/17)

**Bug Fixes**

* Fixed a bug where `pending` was set to `true` anytime `treatNullAsPending`
  was `true` when calling `getStatus`.

## [0.0.4](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.4) (6/19/17)

**New Features**

* A "null" property is now included in the object returned from `getStatus`,
  which can be used to check if the request status is `"NULL"`.

## [0.0.3](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.3) (6/19/17)

* Passing an empty resources array in an action creator with `mergeLabelIds: false`
  will now clear the label's IDs array.

## [0.0.2](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.2) (6/18/17)

* First release

## Earlier development

This library began as a fork of
[redux-simple-resource v1.0.0](https://github.com/jmeas/redux-simple-resource/blob/master/CHANGELOG.md).
