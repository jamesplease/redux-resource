// This function generates the five statuses from a single CRUD action.
// For instance, you'd probably pass "CREATE", "READ", "UPDATE", or "DELETE"
// as `crudAction`.
//
// These are deprecated in favor of the simpler alternatives listed in
// `./action-types`. Those work the _exact_ same way. Because there are
// fewer of them, they should be easier to use.
const mapConstant = crudAction => ({
  [`${crudAction}_RESOURCES_PENDING`]: `${crudAction}_RESOURCES_PENDING`,
  [`${crudAction}_RESOURCES_SUCCEEDED`]: `${crudAction}_RESOURCES_SUCCEEDED`,
  [`${crudAction}_RESOURCES_FAILED`]: `${crudAction}_RESOURCES_FAILED`,
  [`${crudAction}_RESOURCES_IDLE`]: `${crudAction}_RESOURCES_IDLE`,
});

const createTypes = mapConstant('CREATE');
const readTypes = mapConstant('READ');
const updateTypes = mapConstant('UPDATE');
const deleteTypes = mapConstant('DELETE');

export default {
  ...createTypes,
  ...readTypes,
  ...updateTypes,
  ...deleteTypes,
};
