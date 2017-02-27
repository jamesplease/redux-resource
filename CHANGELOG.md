## [0.0.10](https://github.com/jmeas/redux-simple-resource/releases/tag/0.0.10) (2/27/17)

**Bug fixes**

- Multi-word resource names were not generating the correct reducer handlers for
  read many. This issue has been resolved.

## [0.0.9](https://github.com/jmeas/redux-simple-resource/releases/tag/0.0.9) (2/25/17)

**Breaking**

- `lodash.snakecase` has been removed as a dependency. This reduces the minified
  bundle size by 4kb, yet means that you can now only pass in camel case
  resource names.

## [0.0.8](https://github.com/jmeas/redux-simple-resource/releases/tag/0.0.8) (2/25/17)

- The npm package now only ships with the `dist` folder to keep the module small

## [0.0.7](https://github.com/jmeas/redux-simple-resource/releases/tag/0.0.7) (2/25/17)

**Breaking**

- `updateResourcesMeta` has been renamed to `updateResourceMeta`
- `updateManyResourcesMeta` has been renamed to `updateManyResourceMetas`
- `READ_ONE_X` action types have been renamed to `READ_X` for better consistency
  with the other action types that operate on a single resource.
- `supportedActions.readOne` has been renamed to `supportedActions.read` for
  better consistency with the other action types that operate on a single
  resource.

**New features**

- `updateResourceMeta` now accepts a `replace` option

**Bug fixes**

- Data is now stored on the proper location in the store: `resourceMeta` and
  `resourceListMeta`. Previously, the library was incorrectly storing them on
  `resourcesMeta` and `resourcesListMeta`.
- `replace: true` now actually replaces the list in `updateManyResources()`.

## [0.0.6](https://github.com/jmeas/redux-simple-resource/releases/tag/0.0.6) (2/25/17)

**Breaking**

- The `allowedOperations` option has been renamed to `supportedActions`
- Multiword resource names will now be snake-cased in action types. For
  instance, previously, a name of `catPerson` would have been `CATPERSON`. Now
  it will be `CAT_PERSON`.
- Action creator placeholders have been removed from the library
- The `RETRIEVE` action type has been renamed to `READ_ONE`and `READ_MANY` to
  make it more clear if you are fetching one or many resources.
- In browser global environments, the variable name that is attached to the
  `window` has been renamed from `simpleResource` to `createResource`.

**New features**

- You can now customize whether the reducers replace existing data or merge the
  new data with the old through the `replace` property of your action.
- Helpful utilities are now available as named exports, which can help with
  manipulating data and metadata in the store.

**Bug fixes**

- Newly-created resources now have the default metadata associated with them
- The `idAttribute` option now works in all reducers
- The action types that are included in the `actionReducers` options are now
  available on the `actionTypes` property of the resource

## [0.0.5](https://github.com/jmeas/redux-simple-resource/releases/tag/0.0.5) (2/23/17)

**Breaking**

- Action type names are now shorter

## [0.0.4](https://github.com/jmeas/redux-simple-resource/releases/tag/0.0.4) (2/23/17)

- Fix a bug where `initialState` was returning undefined in reducers

## [0.0.3](https://github.com/jmeas/redux-simple-resource/releases/tag/0.0.3) (2/23/17)

- `xhrStatuses` is now a named export

## [0.0.2](https://github.com/jmeas/redux-simple-resource/releases/tag/0.0.2) (2/23/17)

- `xhrStatuses` added to main exported Object
- Most reducers added
- Action types generated

## [0.0.1](https://github.com/jmeas/redux-simple-resource/releases/tag/0.0.1)

- The first release
