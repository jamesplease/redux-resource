import getStatus from './get-status';

// Aggregates a list of statuses into one status. If any statuses are failed,
// then the result will be failed. If none are failed, but some are pending,
// then the result is pending. And if all are success, then the result is
// succeeded. Returns an object with these values as booleans:
//
// {
//   failed: false,
//   pending: false,
//   succeeded: true,
// }
//
// Note that at most _one_ of those properties will be true. It is
// possible for them to all be false.
export default function combineStatuses(state = {}, statuses = [], isNullPending) {
  const statusValues = statuses.map(status => getStatus(state, status.action, status, isNullPending));

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
