import getValueFromPath from 'lodash/get';
import requestStatuses from './request-statuses';

function getSingleStatus(state, metaLocation, isNullPending) {
  const status = getValueFromPath(state, metaLocation, requestStatuses.NULL);

  const isPending = status === requestStatuses.PENDING;
  const nullPending = Boolean(isNullPending) && status === requestStatuses.NULL;

  return {
    pending: isPending || nullPending,
    failed: status === requestStatuses.FAILED,
    succeeded: status === requestStatuses.SUCCEEDED,
  };
}

// Returns the status of a particular CRUD action based on `metaLocation`.
//
// `state`: A piece of the Redux store containing the relevant resources
// `action`: The CRUD action in question
// `metaLocation`: A location of the meta resource (see `find-meta.js` for more)
// `isNullPending`: Whether or not to count a status of `NULL` as pending.
//
// Returns an Object with the following properties:
//
// {
//   failed: false,
//   pending: false,
//   succeeded: true,
// }
//
// Note that at most _one_ of those properties will be true. It is
// possible for them to all be false.
export default function getStatus(state, metaLocations, isNullPending) {
  if (!(metaLocations instanceof Array)) {
    return getSingleStatus(state, metaLocations, isNullPending);
  }

  const statusValues = metaLocations.map(loc => getSingleStatus(state, loc, isNullPending));

  let pending = false;
  let failed = false;
  let succeeded = false;

  let successCount = 0;
  let pendingCount = 0;
  for (let i = 0; i < statusValues.length; i++) {
    const status = statusValues[i];
    if (status.failed) {
      failed = true;
      break;
    } else if (status.pending) {
      pendingCount++;
    } else if (status.succeeded) {
      successCount++;
    }
  }

  if (!failed && pendingCount > 0) {
    pending = true;
  } else if (successCount === statusValues.length) {
    succeeded = true;
  }

  return {pending, failed, succeeded};
}
