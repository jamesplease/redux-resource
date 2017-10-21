import PropTypes from 'prop-types';
import {requestStatuses} from 'redux-resource';

// Verifies a resource ID. Useful as a "building block" for
// more advanced prop types.
const idPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

// Verifies a request status. useful as a "building block" for
// more advanced prop types.
const requestStatusPropType = PropTypes.oneOf([
  requestStatuses.NULL,
  requestStatuses.PENDING,
  requestStatuses.FAILED,
  requestStatuses.SUCCEEDED
]);

// Similar to `.shape()`, except that it enforces an ID.
const resourcePropType = function(props) {
  return PropTypes.shape({
    ...props,
    id: idPropType.isRequired
  });
};

// Similar to `.shape()`, except that it enforces proper request
// statuses, as well as an ID list
const requestPropType = function(props) {
  return PropTypes.shape({
    ...props,
    ids: PropTypes.arrayOf(idPropType).isRequired,
    status: requestStatusPropType.isRequired
  });
};

// The return value from `getStatus`.
const statusPropType = PropTypes.shape({
  null: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
  succeeded: PropTypes.bool.isRequired
});

export {
  idPropType,
  requestStatusPropType,
  resourcePropType,
  requestPropType,
  statusPropType,
};
