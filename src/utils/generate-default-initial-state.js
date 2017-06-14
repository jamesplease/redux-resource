import requestStatuses from './request-statuses';

export default function generateDefaultInitialState() {
  return {
    // These are the actual resources that the server sends back.
    resources: [],
    // This is metadata about _specific_ resources. For instance, if a DELETE
    // is in flight for a book with ID 24, then you could find that here.
    meta: {},
    // Metadata for request labels
    labelMeta: {},
    // This is metadata about the entire collection of resources. For instance,
    // on page load, you might fetch all of the resources. The XHR status for
    // that request would live here.
    listMeta: {
      createStatus: requestStatuses.NULL,
      readStatus: requestStatuses.NULL,
      updateStatus: requestStatuses.NULL,
      deleteStatus: requestStatuses.NULL
    }
  };
}
