// This function generates the five statuses from a single CRUD action.
// For instance, you'd probably pass "CREATE", "RETRIEVE", "UPDATE", or "DELETE"
// as `crudAction`.
const mapConstant = (resourceName, crudAction) => ({
  [`${crudAction}_${resourceName}`]: `${crudAction}_${resourceName}`,
  [`${crudAction}_${resourceName}_SUCCESS`]: `${crudAction}_${resourceName}_SUCCESS`,
  [`${crudAction}_${resourceName}_FAILURE`]: `${crudAction}_${resourceName}_FAILURE`,
  [`${crudAction}_${resourceName}_ABORTED`]: `${crudAction}_${resourceName}_ABORTED`,
  [`${crudAction}_${resourceName}_RESET_RESOLUTION`]: `${crudAction}_${resourceName}_RESET_RESOLUTION`,
});

// This is a map of the four CRUD operations to the five async action types
export default (resourceName) => {
  const capitalResourceName = resourceName.toUpperCase();

  return {
    ...mapConstant(capitalResourceName, 'CREATE'),
    ...mapConstant(capitalResourceName, 'RETRIEVE'),
    ...mapConstant(capitalResourceName, 'UPDATE'),
    ...mapConstant(capitalResourceName, 'DELETE'),
  };
};
