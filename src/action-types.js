// This function generates the five statuses from a single CRUD action.
// For instance, you'd probably pass "CREATE", "RETRIEVE", "UPDATE", or "DELETE"
// as `crudAction`.
const mapConstant = crudAction => ({
  [`${crudAction}`]: crudAction,
  [`${crudAction}_SUCCESS`]: `${crudAction}_SUCCESS`,
  [`${crudAction}_FAILURE`]: `${crudAction}_FAILURE`,
  [`${crudAction}_ABORTED`]: `${crudAction}_ABORTED`,
  [`${crudAction}_RESET_RESOLUTION`]: `${crudAction}_RESET_RESOLUTION`,
});

// This is a map of the four CRUD operations to the five async action types
export default {
  CREATE: mapConstant('CREATE'),
  RETRIEVE: mapConstant('RETRIEVE'),
  UPDATE: mapConstant('UPDATE'),
  DELETE: mapConstant('DELETE'),
};
