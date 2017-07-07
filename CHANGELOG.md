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

- The action creators extension will no longer throw errors. Instead, it will
  log warnings to the console.

**Bug Fixes**

- Warnings will only be logged when a resources array is missing from an action
  completely, but not when it is present but empty.

## [v0.0.10](https://github.com/jmeas/resourceful-redux/releases/tag/v0.0.10) (7/4/17)

**Breaking Changes**

- Extensions are no longer included with the `resourceful-redux` npm package.
  They may be reintroduced, but there were too many bugs with the
  implementation being used. You can now install each extension from npm
  directly.

- New warning messages and Errors will be thrown when common mistakes are made
  when using the API.

**Bug Fixes**

- The action creators extension will now dispatch the correct actions for
  successful actions.

## [0.0.9](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.9) (6/29/17)

**Breaking Changes**

- The `resources` Array is now an Object. This will only be breaking if you're
  accessing or modifying the `resources` Array directly. If you're using
  `getResources` for accessing resources, and `upsertResources` for updating
  resources, then this change will not be breaking.

## [0.0.8](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.8) (6/27/17)

**Bug Fixes**

- Fixes a bug that would cause errors to be thrown when using the action
  creators extension
- Fixes the location of the extensions in the npm module

## [0.0.7](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.7) (6/24/17)

**New Features**

- Two "extensions" have been added to the `npm` package: Prop Types and
  Action Creators.

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
