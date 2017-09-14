## 9/14/17

##### `resourceful-redux@1.1.0-beta`

**New Features**

- The `resourceful-redux` library now supports lists, which separates two use
  cases both previously managed by `labels`. Lists are designed to track ordered
  collections of resources, like results from a search or a 'most popular books'.
  Labels are now able to focus solely on named requests that aren't necessarily
  tied to specific resources (e.g. to track the creation of new resources that
  may not have IDs yet). For more info, refer to #187 or read further in
  our [docs](https://resourceful-redux.js.org/).

## 9/12/17

##### `resourceful-xhr@1.2.0`

**New Features**

- The `resourceful-xhr` library now supports an alternative API that allows for
  better chaining of requests. For more, refer to issue #190. The old API is
  still supported, but it will be removed in resourceful-xhr@2.0.0.

##### `resourceful-xhr@2.0.0`

**Breaking Changes**

- The old API of `resourceful-xhr@1.x` has been removed. Only the API introduced
  in `resourceful-xhr@1.2.0` is now available.

## 9/7/17

##### `resourceful-xhr@1.1.0`

The `resourceful-action-creators` library has been renamed to `resourceful-xhr`.

## 8/18/17

##### `resourceful-action-creators@1.1.0`

**New Features**

- All action creators now accept a second, optional argument `callback(err, res, body)`
  that is invoked after the XHR is complete and `dispatch()` events trigged.

## [v1.0.1](https://github.com/jmeas/resourceful-redux/releases/tag/v1.0.1) (8/18/17)

**Bug Fixes**

- Fixes an issue where apps bundled with Webpack 1 or CommonJS were always in development
  mode.

## [v1.0.0](https://github.com/jmeas/resourceful-redux/releases/tag/v1.0.0) (8/3/17)

- No changes. This release marks the stability of the API.

## [v0.5.0](https://github.com/jmeas/resourceful-redux/releases/tag/v0.5.0) (7/21/17)

**New Features**

- `resourceful-plugins`: A new library has been added, `resourceful-plugins`.
  This is a collection of of common plugins that you can use for your CRUD apps.

## [v0.4.0](https://github.com/jmeas/resourceful-redux/releases/tag/v0.4.0) (7/21/17)

**Changes**

- More warnings in development mode should help catch mistakes

**Breaking Changes**

- Redux@3.x is now a peerDependency of Resourceful Redux, Resourceful Action
  Creators, and Resourceful Prop Types
- `resourceful-action-creators`: All end actions now always pass the `res`
  object
- `resourceful-action-creators`: The actions now pass a `statusCode` property,
  which represents the current status code of the request.

**Bug Fixes**

- `resourceful-action-creators`: The `xhr` object will now be returned when
  using the shorthand action creators (such as `readResources`).

## [v0.3.0](https://github.com/jmeas/resourceful-redux/releases/tag/v0.3.0) (7/11/17)

**Changes**

- Smaller build file-size
- There is now an ES modules export
- New warnings will be emitted in dev mode to catch errors when using the API

**Breaking Changes**

- Developer warnings will now use `console.error`, rather than `console.warn`

**Bug Fixes**

- Resources without an ID will no longer set metadata on the key `undefined`
  within `slice.meta`
- Non-string labels will be ignored

## [v0.2.0](https://github.com/jmeas/resourceful-redux/releases/tag/v0.2.0) (7/9/17)

**Changes**

- Resourceful Redux will now log warnings in more situations where you might be
  making mistakes to help you out.

## [v0.1.2](https://github.com/jmeas/resourceful-redux/releases/tag/v0.1.2) (7/9/17)

**Bug Fixes**

- Non-success CRUD actions will now ensure that the resource's metadata includes
  the initial metadata (gh-103)

## [v0.1.1](https://github.com/jmeas/resourceful-redux/releases/tag/v0.1.1) (7/9/17)

**Bug Fixes**

- Successful CRUD operations no longer squash the status of other CRUD
  operations within resource metadata (gh-100)

## [v0.1.0](https://github.com/jmeas/resourceful-redux/releases/tag/v0.1.0) (7/8/17)

**Breaking Changes**

- The plugin argument signature has changed. Refer to the documentation for
  more.
- The Resourceful Prop Types no longer include `isRequired` by default. It is
  now opt in.

**Bug Fixes**

- In Resourceful Action Creators, the shortcut methods for the wrapped `xhr`
  (such as `xhr.get`) now accept all of the same signatures as the `xhr` lib.
- Fixed a `console.warn` in Resourceful Redux that wasn't warning when it should
  have been warning.

## [v0.0.14](https://github.com/jmeas/resourceful-redux/releases/tag/v0.0.14) (7/6/17)

**Bug Fixes**

- The Action Creators extension will now return the `resources` array that you
  pass as options when a successful response is received from the backend
  without a response body.

- The name of the delete metadata has now been normalized as `deleteStatus`.

## [v0.0.13](https://github.com/jmeas/resourceful-redux/releases/tag/v0.0.13) (7/6/17)

- No changes.

## [v0.0.12](https://github.com/jmeas/resourceful-redux/releases/tag/v0.0.12) (7/6/17)

- No changes. There was an issue with the deploy of 0.0.11 that's been fixed.

## [v0.0.11](https://github.com/jmeas/resourceful-redux/releases/tag/v0.0.11) (7/5/17)

**Breaking Changes**

- Resourceful Action Creators will no longer throw errors. Instead, it will
  log warnings to the console.

**Bug Fixes**

- Warnings will only be logged when a resources array is missing from an action
  completely, but not when it is present but empty.

## [v0.0.10](https://github.com/jmeas/resourceful-redux/releases/tag/v0.0.10) (7/4/17)

**Breaking Changes**

- Resourceful Action Creators and Resourceful Prop Types are no longer included
  with the `resourceful-redux` npm package. They may be reintroduced, but there
  were too many bugs with the implementation being used. You can now install
  each collection of extras from npm directly.

- New warning messages and Errors will be thrown when common mistakes are made
  when using the API.

**Bug Fixes**

- Resourceful Action Creators will now dispatch the correct actions for
  successful actions.

## [0.0.9](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.9) (6/29/17)

**Breaking Changes**

- The `resources` Array is now an Object. This will only be breaking if you're
  accessing or modifying the `resources` Array directly. If you're using
  `getResources` for accessing resources, and `upsertResources` for updating
  resources, then this change will not be breaking.

## [0.0.8](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.8) (6/27/17)

**Bug Fixes**

- Fixes a bug that would cause errors to be thrown when using Resourceful
  Action Creators
- Fixes the location of the Resourceful Action Creators and Resourceful Prop
  Types in the npm module

## [0.0.7](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.7) (6/24/17)

**New Features**

- Two extras have been added to the `npm` package: Resourceful Prop Types and
  Resourceful Action Creators.

## [0.0.6](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.6) (6/22/17)

**New Features**

- Adds `getResources` method

## [0.0.5](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.5) (6/20/17)

**Bug Fixes**

- Fixed a bug where `pending` was set to `true` anytime `treatNullAsPending`
  was `true` when calling `getStatus`.

## [0.0.4](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.4) (6/19/17)

**New Features**

- A "null" property is now included in the object returned from `getStatus`,
  which can be used to check if the request status is `"NULL"`.

## [0.0.3](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.3) (6/19/17)

- Passing an empty resources array in an action creator with `mergeLabelIds: false`
  will now clear the label's IDs array.

## [0.0.2](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.2) (6/18/17)

- First release

## Earlier development

This library began as a fork of
[redux-simple-resource v1.0.0](https://github.com/jmeas/redux-simple-resource/blob/master/CHANGELOG.md).
