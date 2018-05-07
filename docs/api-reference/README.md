# API Reference

### Top-Level Exports

* [resourceReducer](api-reference/resource-reducer.md)
* [getStatus](api-reference/get-status.md)
* [getResources](api-reference/get-resources.md)
* [upsertResources](api-reference/upsert-resources.md)
* [setResourceMeta](api-reference/set-resource-meta.md)
* [actionTypes](api-reference/action-types.md)
* [requestStatuses](api-reference/request-statuses.md)

### Importing

Every function or object described above is a top-level export. You can import
any of them like this:

#### ES6

```js
import { resourceReducer } from 'redux-resource';
```

#### ES5 (CommonJS)

```js
var resourceReducer = require('redux-resource').resourceReducer;
```
