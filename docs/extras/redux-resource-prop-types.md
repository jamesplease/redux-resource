# Redux Resource Prop Types

[![npm version](https://img.shields.io/npm/v/redux-resource-prop-types.svg)](https://www.npmjs.com/package/redux-resource-prop-types)
[![gzip size](http://img.badgesize.io/https://unpkg.com/redux-resource-prop-types/dist/redux-resource-prop-types.min.js?compression=gzip)](https://unpkg.com/redux-resource-prop-types/dist/redux-resource-prop-types.min.js)

A collection of [prop-types](https://github.com/facebook/prop-types) objects.

### Other Guides

**Old Documentation**

- [2.x documentation](https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource-prop-types/docs/old-versions/2.md)
- [3.x documentation](https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource-prop-types/docs/old-versions/3.md)

**Migration Guides**

- [v2 to v3](https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource-prop-types/docs/migration-guides/2-to-3.md)
- [v3 to v4](https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource-prop-types/docs/migration-guides/3-to-4.md)

### Installation

Install `redux-resource-prop-types` with npm:

`npm install redux-resource-prop-types --save`

Then, import the prop types that you need:

```js
import { resourcesPropType } from 'redux-resource-prop-types';
```

### Usage

If you're using React, refer to the [Typechecking with
PropTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)
guide on how to use the exported prop types. If you're not using React, refer to the
documentation of the [prop-types](https://github.com/facebook/prop-types) library.

We recommend using the prop types in this library to build your own prop types, which
you can reuse throughout your application.

#### `idPropType`

Validates a single resource ID.

> Tip: This prop type requires that your IDs be either strings or numbers.

```js
import PropTypes from 'prop-types';
import { idPropType } from 'redux-resource-prop-types';

MyComponent.propTypes = {
  selectedBookIds: PropTypes.arrayOf(idPropType).isRequired
};

mapStateToProps(state) {
  return {
    selectedBookIds: state.books.selectedIds
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

#### `requestStatusPropType`

Validates that a value is one of the [`requestStatuses`](/docs/api-reference/request-statuses.md).
Typically, you'll want to use `statusPropType` instead, but this can be useful when verifying
the structure of your slice.

```js
import { requestStatusPropType } from 'redux-resource-prop-types';

MyComponent.propTypes = {
  bookRequestStatus: requestStatusPropType
};

mapStateToProps(state) {
  return {
    bookRequestStatus: state.books.meta[23].readStatus
  };
}
```

#### `resourcePropType`

Validates a resource. Similar to `PropTypes.shape()`, except that it enforces an ID.

```js
import PropTypes from 'prop-types';
import { resourcePropType } from 'redux-resource-prop-types';

MyComponent.propTypes = {
  book: resourcePropType({
    name: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired
  })
};

mapStateToProps(state) {
  return {
    book: state.books.resources[23]
  };
}
```

#### `requestPropType`

Validates a [request object](/docs/requests/request-objects.md). Similar to `PropTypes.shape()`,
except that it enforces `ids`, `status`, `requestKey` and `resourceType`. Typically, you won't
need to use this, but it can be useful to verify the structure of your state.

```js
import PropTypes from 'prop-types';
import { requestPropType } from 'redux-resource-prop-types';

MyComponent.propTypes = {
  searchRequest: requestPropType({
    statusCode: PropTypes.number.isRequired
  })
};

mapStateToProps(state) {
  return {
    searchRequest: state.books.requests.search
  };
}
```
