import requestStatuses from './request-statuses';
import getPathParts from './get-path-parts';
import warning from './warning';

function getSingleStatus(state, statusLocation, treatIdleAsPending) {
  const splitPath = getPathParts(statusLocation);

  let status;
  let currentVal = state;
  for (let i = 0; i < splitPath.length; i++) {
    const pathValue = currentVal[splitPath[i]];
    if (typeof pathValue === 'undefined') {
      status = requestStatuses.IDLE;
      break;
    } else if (i === splitPath.length - 1) {
      status = pathValue;
    }

    currentVal = pathValue;
  }

  if (process.env.NODE_ENV !== 'production') {
    const isStatus =
      status === requestStatuses.IDLE ||
      status === requestStatuses.PENDING ||
      status === requestStatuses.FAILED ||
      status === requestStatuses.SUCCEEDED;
    if (!isStatus) {
      warning(
        `You called "getStatus" with path "${statusLocation}", which resolved ` +
          `to a value that is not a valid resource status. You may want to ` +
          `check that this path is correct. ` +
          `Read more about getStatus on the documentation page: ` +
          `https://redux-resource.js.org/docs/api-reference/get-status.html`,
        'GET_STATUS_PATH'
      );
    }

    if (status === 'NULL') {
      warning(
        `You called "getStatus" with path "${statusLocation}", which resolved ` +
          `to a value of NULL. The NULL request status was renamed to IDLE in ` +
          `Redux Resource v3.0.0. You may need to verify that your code is ` +
          `compatible with Redux Resource v3.0.0. ` +
          `For more information, refer to the documentation for request statuses at: ` +
          `https://redux-resource.js.org/docs/api-reference/request-statuses.html\n\n` +
          `Also, the migration guide to Redux Resource v3 can be found at: ` +
          `https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource/docs/migration-guides/2-to-3.md`,
        'INVALID_REQUEST_STATUS_GET_STATUS'
      );
    }
  }

  const isPending = status === requestStatuses.PENDING;
  const isIdle = status === requestStatuses.IDLE;
  const treatIdleAsPendingBool = Boolean(treatIdleAsPending);

  return {
    idle: isIdle && !treatIdleAsPendingBool,
    pending: isPending || (isIdle && treatIdleAsPendingBool),
    failed: status === requestStatuses.FAILED,
    succeeded: status === requestStatuses.SUCCEEDED,
  };
}

// Returns the status of a particular CRUD action based on `statusLocation`.
//
// `state`: A piece of the Redux store containing the relevant resources
// `action`: The CRUD action in question
// `statusLocation`: A location of the meta resource (see `find-meta.js` for more)
// `treatIdleAsPending`: Whether or not to count a status of `IDLE` as pending.
//
// Returns an Object with the following properties:
//
// {
//   idle: false,
//   failed: false,
//   pending: false,
//   succeeded: true,
// }
//
// Note that at most _one_ of those properties will be true. It is
// possible for them to all be false.
export default function getStatus(state, statusLocations, treatIdleAsPending) {
  if (!Array.isArray(statusLocations)) {
    const status = getSingleStatus(state, statusLocations, treatIdleAsPending);

    if (process.env.NODE_ENV !== 'production') {
      Object.defineProperty(status, 'null', {
        // eslint-disable-next-line getter-return
        get() {
          warning(
            `You attempted to access a property named "null" from the object returned by ` +
              `the getStatus method from Redux Resource. This property has been renamed to "idle" ` +
              `in Redux Resource v3. Please update your application to ` +
              `use the "idle" rather than "null". For more information, refer to the ` +
              `documentation for getStatus at: ` +
              `https://redux-resource.js.org/docs/api-reference/get-status.html\n\n` +
              `Also, the migration guide to Redux Resource v3 can be found at: ` +
              `https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource/docs/migration-guides/2-to-3.md`,
            `NULL_GET_STATUS_VALUE_ACCESSED`
          );
        },
      });
    }

    return status;
  }

  const statusValues = statusLocations.map(loc =>
    getSingleStatus(state, loc, treatIdleAsPending)
  );

  let idleValue = true;
  let pending = false;
  let failed = false;
  let succeeded = false;

  let successCount = 0;
  let pendingCount = 0;
  for (let i = 0; i < statusValues.length; i++) {
    const status = statusValues[i];
    if (status.failed) {
      idleValue = false;
      failed = true;
      break;
    } else if (status.pending) {
      pendingCount++;
    } else if (status.succeeded) {
      successCount++;
    }
  }

  if (!failed && pendingCount > 0) {
    idleValue = false;
    pending = true;
  } else if (successCount === statusValues.length) {
    idleValue = false;
    succeeded = true;
  }

  const status = { idle: idleValue, pending, failed, succeeded };

  if (process.env.NODE_ENV !== 'production') {
    Object.defineProperty(status, 'null', {
      // eslint-disable-next-line getter-return
      get() {
        warning(
          `You attempted to access a property named "null" from the object returned by ` +
            `the getStatus method from Redux Resource. This property has been renamed to "idle" ` +
            `in Redux Resource v3. Please update your application to ` +
            `use the "idle" rather than "null". For more information, refer to the ` +
            `documentation for getStatus at: ` +
            `https://redux-resource.js.org/docs/api-reference/get-status.html\n\n` +
            `Also, the migration guide to Redux Resource v3 can be found at: ` +
            `https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource/docs/migration-guides/2-to-3.md`,
          `NULL_GET_STATUS_VALUE_ACCESSED`
        );
      },
    });
  }

  return status;
}
