import findMeta from './find-meta';
import initialResourceMetaState from './initial-resource-meta-state';
import requestStatuses from './request-statuses';

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
export default function getStatus(state, action, metaLocation, isNullPending) {
  let meta = findMeta(state, metaLocation);
  if (!Object.keys(meta).length) {
    meta = initialResourceMetaState;
  }
  const status = meta[`${action}Status`];

  const isPending = status === requestStatuses.PENDING;
  const nullPending = Boolean(isNullPending) && status === requestStatuses.NULL;

  return {
    pending: isPending || nullPending,
    failed: status === requestStatuses.FAILED,
    succeeded: status === requestStatuses.SUCCEEDED,
  };
}
