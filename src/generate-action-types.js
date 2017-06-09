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

// This is a map of the four CRUD actions to the five async action types
export default (resourceName, pluralForm, supportedActions, customTypes) => {
  const capitalResourceName = resourceName.toUpperCase();
  const capitalPluralName = pluralForm.toUpperCase();
  const {create, createMany, read, readMany, update, updateMany, del, delMany} = supportedActions;

  const createTypes = create ? mapConstant(capitalResourceName, 'CREATE') : {};
  const createManyTypes = createMany ? mapConstant(capitalPluralName, 'CREATE_MANY') : {};
  const readTypes = read ? mapConstant(capitalResourceName, 'READ') : {};
  const readManyTypes = readMany ? mapConstant(capitalPluralName, 'READ_MANY') : {};
  const updateTypes = update ? mapConstant(capitalResourceName, 'UPDATE') : {};
  const updateManyTypes = updateMany ? mapConstant(capitalPluralName, 'UPDATE_MANY') : {};
  const deleteTypes = del ? mapConstant(capitalResourceName, 'DELETE') : {};
  const deleteManyTypes = delMany ? mapConstant(capitalPluralName, 'DELETE_MANY') : {};

  const custom = {};
  customTypes.forEach(value => (custom[value] = value));

  return {
    ...createTypes,
    ...createManyTypes,
    ...readTypes,
    ...readManyTypes,
    ...updateTypes,
    ...updateManyTypes,
    ...deleteTypes,
    ...deleteManyTypes,
    ...custom
  };
};
