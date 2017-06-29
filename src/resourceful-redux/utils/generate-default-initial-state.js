export default function generateDefaultInitialState() {
  return {
    // These are the actual resources that the server sends back. The keys of
    // this Object are the resource's ID.
    resources: {},
    // This is metadata about _specific_ resources. For instance, if a DELETE
    // is in flight for a book with ID 24, then you could find that here.
    meta: {},
    // This contains the metadata for labeled requests
    labels: {}
  };
}
