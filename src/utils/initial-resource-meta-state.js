import requestStatuses from './request-statuses';

export default {
  createStatus: requestStatuses.NULL,
  readStatus: requestStatuses.NULL,
  updateStatus: requestStatuses.NULL,
  // The status of an any existing request to delete this resource. Note that
  // this will never be "SUCCEEDED," as a successful delete removes the
  // resource from the store, and also from this meta.
  deleteStatus: requestStatuses.NULL
};
