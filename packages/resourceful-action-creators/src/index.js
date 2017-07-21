import {actionTypes} from 'resourceful-redux';
import xhr from './xhr';

function performXhr(dispatch, options) {
  const {
    xhrOptions = {},
    crudAction,
    transformData,
    resourceName
  } = options;

  const crudActionOption = crudAction ? crudAction : '';

  // Catch common configuration problems in dev
  if (process.env.NODE_ENV !== 'production') {
    const lowercaseCrud = crudActionOption.toLowerCase();
    const isValidCrudType =
      lowercaseCrud === 'update' || lowercaseCrud === 'delete' ||
      lowercaseCrud === 'read' || lowercaseCrud === 'create';
    const {url, uri} = xhrOptions;

    if (!resourceName) {
      console.warn(
        `A resourceName was not passed to a Resourceful Redux Action ` +
        `creator. A resourceName must be passed so that Resourceful Redux ` +
        `knows which resource slice to update. Refer to the CRUD Actions ` +
        `guide for more: https://resourceful-redux.js.org/docs/guides/crud-actions.html`
      );
    }

    if (!isValidCrudType) {
      console.warn(
        `An invalid "crudAction" was passed to a Resourceful Redux action creator. ` +
        `It must be one of: "create", "read", "update", "delete"`
      );
    }

    if (!url && !uri) {
      console.warn(
        `No URL was passed to a Resourceful Redux action creator. You must ` +
        `pass either "xhrOptions.url" or "xhrOptions.uri". For more, refer to ` +
        `the Action Creators Extension documentation: ` +
        `https://resourceful-redux.js.org/docs/extensions/action-creators.html`
      );
    }
  }

  const crudType = crudActionOption.toUpperCase();

  dispatch({
    ...options,
    type: actionTypes[`${crudType}_RESOURCES_PENDING`],
    // This may seem strange, but any unresolved request has a status code of 0
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
    statusCode: 0
  });

  const req = xhr(xhrOptions, (err, res, body) => {
    const statusCode = res ? res.statusCode : 0;
    if (req.aborted) {
      dispatch({
        ...options,
        type: actionTypes[`${crudType}_RESOURCES_NULL`],
        statusCode,
        res
      });
    } else if (err || statusCode >= 400 || statusCode === 0) {
      dispatch({
        ...options,
        type: actionTypes[`${crudType}_RESOURCES_FAILED`],
        statusCode,
        res,
        err,
      });
    } else {
      let resources;

      if (body) {
        if (transformData) {
          resources = transformData(body, options);
        } else {
          resources = body;
        }
      } else {
        resources = options.resources;
      }

      dispatch({
        ...options,
        type: actionTypes[`${crudType}_RESOURCES_SUCCEEDED`],
        statusCode,
        resources,
        res
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

    return performXhr(dispatch, opts);
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

    return performXhr(dispatch, newOptions);
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

    return performXhr(dispatch, newOptions);
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

    return performXhr(dispatch, newOptions);
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

    return performXhr(dispatch, newOptions);
  };
}

export {
  xhr, crudAction, createResources, readResources, updateResources,
  deleteResources
};
