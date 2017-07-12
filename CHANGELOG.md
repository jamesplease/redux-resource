## [0.0.11](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.11) (7/5/17)

**Breaking Changes:**

- Resourceful Action Creators will no longer throw errors. Instead, it will
  log warnings to the console.

**Bug Fixes**

- Warnings will only be logged when a resources array is missing from an action
  completely, but not when it is present but empty.

## [0.0.10](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.10) (7/4/17)

**Breaking Changes**:

- Resourceful Action Creators and Resourceful Prop Types are no longer included 
  with the `resourceful-redux` npm package. They may be reintroduced, but there 
  were too many bugs with the implementation being used. You can now install 
  each collection of extras from npm directly.

- New warning messages and Errors will be thrown when common mistakes are made
  when using the API.

**Bug Fixes**:

- Resourceful Action Creators will now dispatch the correct actions for
  successful actions.

## [0.0.9](https://github.com/jmeas/resourceful-redux/releases/tag/0.0.9) (6/29/17)

**Breaking Changes**:

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
