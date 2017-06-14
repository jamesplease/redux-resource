// This function generates the five statuses from a single CRUD action.
// For instance, you'd probably pass "CREATE", "READ", "UPDATE", or "DELETE"
// as `crudAction`.
const mapConstant = (crudAction) => ({
  [`${crudAction}_RESOURCES`]: `${crudAction}_RESOURCES`,
  [`${crudAction}_RESOURCES_SUCCEED`]: `${crudAction}_RESOURCES_SUCCEED`,
  [`${crudAction}_RESOURCES_FAIL`]: `${crudAction}_RESOURCES_FAIL`,
  [`${crudAction}_RESOURCES_NULL`]: `${crudAction}_RESOURCES_NULL`,
});

const createTypes = mapConstant('CREATE');
const readTypes = mapConstant('READ');
const updateTypes = mapConstant('UPDATE');
const deleteTypes = mapConstant('DELETE');

export default {
  ...createTypes,
  ...readTypes,
  ...updateTypes,
  ...deleteTypes
};
