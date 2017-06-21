import requestStatuses from './request-statuses';

function getSingleStatus(state, statusLocation, treatNullAsPending) {
  const splitPath = statusLocation.split('.');

  let status;
  let currentVal = state;
  for (let i = 0; i < splitPath.length; i++) {
    const pathValue = currentVal[splitPath[i]];
    if (typeof pathValue === 'undefined') {
      status = requestStatuses.NULL;
      break;
    } else if (i === splitPath.length - 1) {
      status = pathValue;
    }

    currentVal = pathValue;
  }

  const isPending = status === requestStatuses.PENDING;
  const isNull = status === requestStatuses.NULL;
  const treatNullAsPendingBool = Boolean(treatNullAsPending);

  return {
    null: isNull && !treatNullAsPendingBool,
    pending: isPending || (isNull && treatNullAsPendingBool),
    failed: status === requestStatuses.FAILED,
    succeeded: status === requestStatuses.SUCCEEDED,
  };
}

// Returns the status of a particular CRUD action based on `statusLocation`.
//
// `state`: A piece of the Redux store containing the relevant resources
// `action`: The CRUD action in question
// `statusLocation`: A location of the meta resource (see `find-meta.js` for more)
// `treatNullAsPending`: Whether or not to count a status of `NULL` as pending.
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
export default function getStatus(state, statusLocations, treatNullAsPending) {
  if (!(statusLocations instanceof Array)) {
    return getSingleStatus(state, statusLocations, treatNullAsPending);
  }

  const statusValues = statusLocations.map(loc => getSingleStatus(state, loc, treatNullAsPending));

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
