// This function generates the five statuses from a single CRUD action.
// For instance, you'd probably pass "CREATE", "READ", "UPDATE", or "DELETE"
// as `crudAction`.
const mapConstant = (resourceName, crudAction) => ({
  [`${crudAction}_${resourceName}`]: `${crudAction}_${resourceName}`,
  [`${crudAction}_${resourceName}_SUCCEED`]: `${crudAction}_${resourceName}_SUCCEED`,
  [`${crudAction}_${resourceName}_FAIL`]: `${crudAction}_${resourceName}_FAIL`,
  [`${crudAction}_${resourceName}_NULL`]: `${crudAction}_${resourceName}_NULL`,
});

const createTypes = mapConstant('RESOURCES', 'CREATE');
const readTypes = mapConstant('RESOURCES', 'READ');
const updateTypes = mapConstant('RESOURCES', 'UPDATE');
const deleteTypes = mapConstant('RESOURCES', 'DELETE');

export default {
  ...createTypes,
  ...readTypes,
  ...updateTypes,
  ...deleteTypes
};
