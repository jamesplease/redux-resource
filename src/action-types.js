// This function generates the five statuses from a single CRUD action.
// For instance, you'd probably pass "CREATE", "READ", "UPDATE", or "DELETE"
// as `crudAction`.
const mapConstant = (resourceName, crudAction) => ({
  [`${crudAction}_${resourceName}`]: `${crudAction}_${resourceName}`,
  [`${crudAction}_${resourceName}_SUCCEED`]: `${crudAction}_${resourceName}_SUCCEED`,
  [`${crudAction}_${resourceName}_FAIL`]: `${crudAction}_${resourceName}_FAIL`,
  [`${crudAction}_${resourceName}_ABORT`]: `${crudAction}_${resourceName}_ABORT`,
  [`${crudAction}_${resourceName}_RESET`]: `${crudAction}_${resourceName}_RESET`,
});

const createTypes = mapConstant('RESOURCE', 'CREATE');
const readTypes = mapConstant('RESOURCE', 'READ');
const updateTypes = mapConstant('RESOURCE', 'UPDATE');
const deleteTypes = mapConstant('RESOURCE', 'DELETE');
const createManyTypes = mapConstant('RESOURCES', 'CREATE_MANY');
const readManyTypes = mapConstant('RESOURCES', 'READ_MANY');
const updateManyTypes = mapConstant('RESOURCES', 'UPDATE_MANY');
const deleteManyTypes = mapConstant('RESOURCES', 'DELETE_MANY');

export default {
  ...createTypes,
  ...readTypes,
  ...updateTypes,
  ...deleteTypes,
  ...createManyTypes,
  ...readManyTypes,
  ...updateManyTypes,
  ...deleteManyTypes,
};
