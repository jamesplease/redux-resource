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
    const isStatus = status === requestStatuses.IDLE ||
      status === requestStatuses.PENDING ||
      status === requestStatuses.FAILED ||
      status === requestStatuses.SUCCEEDED;
    if (!isStatus) {
      warning(
        `You called "getStatus" with path "${statusLocation}", which resolved ` +
        `to a value that is not a valid resource status. You may want to ` +
        `check that this path is correct.`
      );
    }
  }

  const isPending = status === requestStatuses.PENDING;
  const isIdle = status === requestStatuses.IDLE;
  const treatIdleAsPendingBool = Boolean(treatIdleAsPending);

  return {
    null: isIdle && !treatIdleAsPendingBool,
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
//   null: false,
//   failed: false,
//   pending: false,
//   succeeded: true,
// }
//
// Note that at most _one_ of those properties will be true. It is
// possible for them to all be false.
export default function getStatus(state, statusLocations, treatIdleAsPending) {
  if (!(statusLocations instanceof Array)) {
    return getSingleStatus(state, statusLocations, treatIdleAsPending);
  }

  const statusValues = statusLocations.map(loc => getSingleStatus(state, loc, treatIdleAsPending));

  let nullValue = true;
  let pending = false;
  let failed = false;
  let succeeded = false;

  let successCount = 0;
  let pendingCount = 0;
  for (let i = 0; i < statusValues.length; i++) {
    const status = statusValues[i];
    if (status.failed) {
      nullValue = false;
      failed = true;
      break;
    } else if (status.pending) {
      pendingCount++;
    } else if (status.succeeded) {
      successCount++;
    }
  }

  if (!failed && pendingCount > 0) {
    nullValue = false;
    pending = true;
  } else if (successCount === statusValues.length) {
    nullValue = false;
    succeeded = true;
  }

  return {null: nullValue, pending, failed, succeeded};
}
