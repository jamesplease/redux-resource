import { actionTypes } from 'resourceful-redux';
import xhr from './xhr';

function performXhr(dispatch, options) {
  const {
    xhrOptions = {},
    crudAction,
    transformData,
    resourceName
  } = options;

  // Catch common configuration problems in dev
  if (process.env.NODE_ENV !== 'production') {
    const { resourceName } = options;
    const lowercaseCrud = crudAction.toLowerCase();
    const isValidCrudType =
      lowercaseCrud === 'update' || lowercaseCrud === 'delete' ||
      lowercaseCrud === 'read' || lowercaseCrud === 'create';
    const { url, uri } = xhrOptions;

    if (!resourceName) {
      throw new Error(
        `A resourceName was not passed to a Resourceful Redux Action ` +
        `creator. A resourceName must be passed so that Resourceful Redux ` +
        `knows which resource slice to update. Refer to the CRUD Actions ` +
        `guide for more: https://resourceful-redux.js.org/docs/guides/crud-actions.html`
      )
    }

    if (!isValidCrudType) {
      throw new Error(
        `An invalid "crudAction" was passed to a Resourceful Redux action creator. ` +
        `It must be one of: "create", "read", "update", "delete"`
      );
    }

    if (!url && !uri) {
      throw new Error(
        `No URL was passed to a Resourceful Redux action creator. You must ` +
        `pass either "xhrOptions.url" or "xhrOptions.uri". For more, refer to ` +
        `the Action Creators Extension documentation: ` +
        `https://resourceful-redux.js.org/docs/extensions/action-creators.html`
      );
    }
  }

  const crudType = crudAction.toUpperCase();

  dispatch({
    ...options,
    type: actionTypes[`${crudType}_RESOURCES_PENDING`],
  });

  const req = xhr(xhrOptions, (err, res, body) => {
    if (req.aborted) {
      dispatch({
        ...options,
        type: actionTypes[`${crudType}_RESOURCES_NULL`]
      });
    } else if (err || res.statusCode >= 400) {
      dispatch({
        ...options,
        type: actionTypes[`${crudType}_RESOURCES_FAILED`],
        res,
        err,
      });
    } else {
      let resources;
      if (transformData) {
        resources = transformData(body, options);
      } else {
        resources = body;
      }

      dispatch({
        ...options,
        type: actionTypes[`${crudType}_RESOURCES_SUCCEEDED`],
        resources
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
