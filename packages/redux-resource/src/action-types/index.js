import actionTypes from './action-types';
import deprecated from './deprecated';
import warning from '../utils/warning';

const allTypes = {
  ...deprecated,
  ...actionTypes,
};

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  function warn(propName) {
    const newPropName = propName
      .split('_')
      .slice(0, 2)
      .concat('IDLE')
      .join('_');

    warning(
      `You attempted to access the Redux Resource action type: ${propName}. ` +
        `This action type has been renamed to ${newPropName} ` +
        `in Redux Resource v3. Please update your application to ` +
        `use the new action type. For more information, refer to the action types ` +
        `documentation at: ` +
        `https://redux-resource.js.org/docs/api-reference/action-types.html\n\n` +
        `Also, the migration guide to Redux Resource v3 can be found at: ` +
        `https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource/docs/migration-guides/2-to-3.md`,
      `INVALID_PROP_${propName}_ACCESSED`
    );
  }

  Object.defineProperties(allTypes, {
    READ_RESOURCES_NULL: {
      get() {
        warn('READ_RESOURCES_NULL');
      },
    },
    CREATE_RESOURCES_NULL: {
      get() {
        warn('READ_RESOURCES_NULL');
      },
    },
    UPDATE_RESOURCES_NULL: {
      get() {
        warn('READ_RESOURCES_NULL');
      },
    },
    DELETE_RESOURCES_NULL: {
      get() {
        warn('READ_RESOURCES_NULL');
      },
    },
  });
}

export default {
  ...deprecated,
  ...actionTypes,
};
