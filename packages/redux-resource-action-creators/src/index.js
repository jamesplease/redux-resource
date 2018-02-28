import { actionTypes } from 'redux-resource';
import warning from './utils/warning';

const _createAction = function(
  actionProperties = {},
  actionDefaults = {},
  type
) {
  if (process.env.NODE_ENV !== 'production') {
    if (actionProperties.type || actionDefaults.type) {
      warning(
        'It looks like you provided a `type` property for an action created using redux-resource-' +
          'action-creators. This library sets the `type` for you; your value has been ignored. ' +
          'For more, refer to the documentation: ' +
          'https://redux-resource.js.org/docs/extras/redux-resource-action-creators.html'
      );
    }
  }

  return {
    ...actionDefaults,
    ...actionProperties,
    type,
  };
};

const createActionCreators = (crudType, actionDefaults = {}) => {
  const { resourceName, resourceType } = actionDefaults;
  const typeToUse = resourceType || resourceName;
  const uppercaseCrud =
    typeof crudType === 'string' ? crudType.toUpperCase() : '';
  const isValidCrudType =
    uppercaseCrud === 'UPDATE' ||
    uppercaseCrud === 'DELETE' ||
    uppercaseCrud === 'READ' ||
    uppercaseCrud === 'CREATE';

  if (process.env.NODE_ENV !== 'production') {
    if (!isValidCrudType) {
      warning(
        `You supplied an invalid crudType of ${crudType} to createActionCreators.` +
          `Please verify you've supplied one of: ['read', 'update', 'delete', 'create'].` +
          'For more, refer to the documentation: ' +
          'https://redux-resource.js.org/docs/extras/redux-resource-action-creators.html'
      );
    }

    if (typeof typeToUse !== 'string') {
      warning(
        `The value of "resourceType" that you passed to createActionCreators was ` +
          `not a string. The resourceType must be a string. You should check ` +
          `your redux-resource-action-creators configuration.` +
          'For more, refer to the documentation: ' +
          'https://redux-resource.js.org/docs/extras/redux-resource-action-creators.html'
      );
    }
  }

  return {
    pending: actionProperties =>
      _createAction(
        actionProperties,
        actionDefaults,
        actionTypes[`${uppercaseCrud}_RESOURCES_PENDING`]
      ),
    null: actionProperties =>
      _createAction(
        actionProperties,
        actionDefaults,
        actionTypes[`${uppercaseCrud}_RESOURCES_NULL`]
      ),
    succeeded: actionProperties =>
      _createAction(
        actionProperties,
        actionDefaults,
        actionTypes[`${uppercaseCrud}_RESOURCES_SUCCEEDED`]
      ),
    failed: actionProperties =>
      _createAction(
        actionProperties,
        actionDefaults,
        actionTypes[`${uppercaseCrud}_RESOURCES_FAILED`]
      ),
  };
};

export default createActionCreators;
