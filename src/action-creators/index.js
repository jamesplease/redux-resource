import { actionTypes } from 'resourceful-redux';
import xhr from './xhr';

function performXhr(dispatch, options) {
  const {
    xhrOptions,
    crudAction,
    transformData,
    resourceName
  } = options;

  // Some helpful errors in dev
  if (process.env.NODE_ENV !== 'production') {
    const { resourceName } = options;
    const lowercaseCrud = crudAction.toLowerCase();
    const isValidCrudType =
      lowercaseCrud === 'update' || lowercaseCrud === 'delete' ||
      lowercaseCrud === 'read' || lowercaseCrud === 'create';
    if (!resourceName) {
      console.log('No resource name was supplied to a Resourceful Redux action creator.');
    } else if (!isValidCrudType) {
      console.log(`An invalid CRUD type was passed to a Resourceful Redux action creator. It must be one of: "create", "read", "update", "delete"`);
    }
  }

  const crudType = crudAction.toUpperCase();

  dispatch({
    type: actionTypes[`${crudType}_RESOURCES_PENDING`],
    ...options
  });

  const req = xhr(xhrOptions, (err, res, body) => {
    if (req.aborted) {
      dispatch({
        type: actionTypes[`${crudType}_RESOURCES_NULL`],
        ...actionAttributes
      });
    } else if (err || res.statusCode >= 400) {
      dispatch({
        type: actionTypes[`${crudType}_RESOURCES_FAILED`],
        res,
        err,
        ...options
      });
    } else {
      let resources;
      if (transformData) {
        resources = transformData(body, options);
      } else {
        resources = body;
      }

      dispatch({
        type: actionTypes[`${crudType}_RESOURCES_SUCCEEDED`],
        resources,
        ...options
      });
    }
  });

  return req;
}

function crudAction(options) {
  return (dispatch, getState) => {
    let opts;
    if (typeof options === 'function') {
      opts = options(getState()) || {};
    } else {
      opts = options || {};
    }

    performXhr(dispatch, options);
  };
}

function createResources(options = {}) {
  return (dispatch, getState) => {
    let opts;
    if (typeof options === 'function') {
      opts = options(getState()) || {};
    } else {
      opts = options || {};
    }

    const xhrOpts = opts.xhrOptions || {};

    const newOptions = {
      crudAction: 'create',
      ...opts,
      xhrOptions: {
        method: 'POST',
        ...xhrOpts
      }
    };

    performXhr(dispatch, newOptions);
  };
}

function readResources(options = {}) {
  return (dispatch, getState) => {
    let opts;
    if (typeof options === 'function') {
      opts = options(getState()) || {};
    } else {
      opts = options || {};
    }

    const xhrOpts = opts.xhrOptions || {};

    const newOptions = {
      crudAction: 'read',
      ...opts,
      xhrOptions: {
        method: 'GET',
        ...xhrOpts
      }
    };

    performXhr(dispatch, newOptions);
  };
}

function updateResources(options = {}) {
  return (dispatch, getState) => {
    let opts;
    if (typeof options === 'function') {
      opts = options(getState()) || {};
    } else {
      opts = options || {};
    }

    const xhrOpts = opts.xhrOptions || {};

    const newOptions = {
      crudAction: 'update',
      ...opts,
      xhrOptions: {
        method: 'PATCH',
        ...xhrOpts
      }
    };

    performXhr(dispatch, newOptions);
  };
}

function deleteResources(options = {}) {
  return (dispatch, getState) => {
    let opts;
    if (typeof options === 'function') {
      opts = options(getState()) || {};
    } else {
      opts = options || {};
    }

    const xhrOpts = opts.xhrOptions || {};

    const newOptions = {
      crudAction: 'delete',
      ...opts,
      xhrOptions: {
        method: 'DELETE',
        ...xhrOpts
      }
    };

    performXhr(dispatch, newOptions);
  };
}

export {
  xhr, crudAction, createResources, readResources, updateResources,
  deleteResources
};
