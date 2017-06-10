import requestStatuses from './request-statuses';

export default {
  // The status of any existing request to update this resource
  updateStatus: requestStatuses.NULL,
  // The status of any existing request to fetch this resource
  readStatus: requestStatuses.NULL,
  // The status of an any existing request to delete this resource. Note that
  // this will never be "SUCCEEDED," as a successful delete removes the
  // resource from the store.
  deleteStatus: requestStatuses.NULL
};
