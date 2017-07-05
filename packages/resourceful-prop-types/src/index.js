import PropTypes from 'prop-types';

// The state from a `resourceReducer` slice of your store. It's called a
// "slice" because most folks use `resourceReducer` alongside `combineReducers`,
// although it works just as well if you're not.
const slicePropType = PropTypes.shape({
  resources: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  labels: PropTypes.object.isRequired
}).isRequired;

// An array of Resource IDs
const resourceIdsPropType = PropTypes.arrayOf(
  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])
);

// The return value from `getResources`
const resourcesPropType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])
  })
).isRequired;

// The return value from `getStatus`
const statusPropType = PropTypes.shape({
  null: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
  succeeded: PropTypes.bool.isRequired
}).isRequired;

export {
  slicePropType,
  resourceIdsPropType,
  resourcesPropType,
  statusPropType
};
