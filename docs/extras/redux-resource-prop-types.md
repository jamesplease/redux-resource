# Redux Resource Prop Types

[![gzip size](http://img.badgesize.io/https://unpkg.com/redux-resource-prop-types/dist/redux-resource-prop-types.min.js?compression=gzip)](https://unpkg.com/redux-resource-prop-types/dist/redux-resource-prop-types.min.js)

A collection of [prop-types](https://github.com/facebook/prop-types) objects.

### Installation

Install `redux-resource-prop-types` with npm:

`npm install redux-resource-prop-types --save`

Then, import the prop types that you need:

```js
import { resourcesPropType } from 'redux-resource-prop-types';
```

### Usage

There are four prop types. If you're using React, refer to the [Typechecking with
PropTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)
guide on how to use them. If you're not using React, refer to the documentation
of the [prop-types](https://github.com/facebook/prop-types) library.

#### `slicePropType`

Validates the state slice that a
[`resourceReducer`](/docs/api-reference/resource-reducer.md) is associated with.
It's called a "slice" because the most common usage of Redux Resource
involves using
[`combineReducers`](http://redux.js.org/docs/api/combineReducers.html).

This checks that the object has a shape like:

```js
{
  resources: {},
  meta: {},
  requests: {},
  lists: {}
}
```

```js
import { slicePropType } from 'redux-resource-prop-types';

MyComponent.propTypes = {
  books: slicePropType
};

mapStateToProps(state) {
  return {
    books: state.books
  };
}
```

#### `resourceIdsPropType`

Validates an Array of resource IDs. Sometimes, it's convenient to store a
reference to a subset of resources as an array of IDs. For instance, lists
store their associated resources as an array of IDs. In your own application
code, you might choose to represent a list of "selected" resources as an array
of IDs.

> Tip: This prop type requires that your IDs be either strings or numbers.

```js
import { resourceIdsPropType } from 'redux-resource-prop-types';

MyComponent.propTypes = {
  selectedBookIds: resourceIdsPropType
};

mapStateToProps(state) {
  return {
    selectedBookIds: state.books.selectedBookIds
  };
}
```

#### `resourcesPropTypes`

Validates an array of resources. Resources are JavaScript objects that have an
`id` attribute. For more, see
[the Resources guide](/docs/guides/resources.md).

```js
import { resourcesPropType } from 'redux-resource-prop-types';

MyComponent.propTypes = {
  books: resourcesPropType
};

mapStateToProps(state) {
  return {
    books: state.books.resources
  };
}
```

#### `statusPropType`

Validates the object returned by [`getStatus`](/docs/api-reference/get-status.md).

```js
import { getStatus } from 'redux-resource';
import { statusPropType } from 'redux-resource-prop-types';

MyComponent.propTypes = {
  booksReadStatus: statusPropType
};

mapStateToProps(state) {
  return {
    bookReadStatus: getStatus(state, 'books.meta[23].readStatus');
  };
}
```
