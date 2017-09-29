import {actionTypes} from 'redux-resource';
import xhr from './xhr';

function performXhr(dispatch, options, callback) {
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
        `A resourceName was not passed to a Redux Resource Action ` +
        `creator. A resourceName must be passed so that Redux Resource ` +
        `knows which resource slice to update. Refer to the CRUD Actions ` +
        `guide for more: https://redux-resource.js.org/docs/guides/crud-actions.html`
      );
    }

    if (!isValidCrudType) {
      console.warn(
        `An invalid "crudAction" was passed to a Redux Resource action creator. ` +
        `It must be one of: "create", "read", "update", "delete"`
      );
    }

    if (!url && !uri) {
      console.warn(
        `No URL was passed to a Redux Resource action creator. You must ` +
        `pass either "xhrOptions.url" or "xhrOptions.uri". For more, refer to ` +
        `the Action Creators Extension documentation: ` +
        `https://redux-resource.js.org/docs/extensions/action-creators.html`
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

    if (typeof callback === 'function') {
      callback(err, res, body);
    }
  });

  return req;
}

function crudAction(options = {}, callback) {
  return performXhr(options.dispatch, options, callback);
}

function createResources(options = {}, callback) {
  const xhrOpts = options.xhrOptions || {};

  const newOptions = {
    crudAction: 'create',
    ...options,
    xhrOptions: {
      method: 'POST',
      ...xhrOpts
    }
  };

  return performXhr(options.dispatch, newOptions, callback);
}

function readResources(options = {}, callback) {
  const xhrOpts = options.xhrOptions || {};

  const newOptions = {
    crudAction: 'read',
    ...options,
    xhrOptions: {
      method: 'GET',
      ...xhrOpts
    }
  };

  return performXhr(options.dispatch, newOptions, callback);
}

function updateResources(options = {}, callback) {
  const xhrOpts = options.xhrOptions || {};

  const newOptions = {
    crudAction: 'update',
    ...options,
    xhrOptions: {
      method: 'PATCH',
      ...xhrOpts
    }
  };

  return performXhr(options.dispatch, newOptions, callback);
}

function deleteResources(options = {}, callback) {
  const xhrOpts = options.xhrOptions || {};

  const newOptions = {
    crudAction: 'delete',
    ...options,
    xhrOptions: {
      method: 'DELETE',
      ...xhrOpts
    }
  };

  return performXhr(options.dispatch, newOptions, callback);
}

export {
  xhr, crudAction, createResources, readResources, updateResources,
  deleteResources
};
