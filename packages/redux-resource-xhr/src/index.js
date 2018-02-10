import { actionTypes } from 'redux-resource';
import xhr from './xhr';

function crudRequest(crudAction, options) {
  const {
    dispatch,
    xhrOptions = {},
    transformData,
    actionDefaults = {},
    onPending,
    onFailed,
    onSucceeded,
    onAborted
  } = options;

  const { resourceName } = actionDefaults;

  const crudActionOption = crudAction ? crudAction : '';

  // Catch common configuration problems in dev
  if (process.env.NODE_ENV !== 'production') {
    const lowercaseCrud = crudActionOption.toLowerCase();
    const isValidCrudType =
      lowercaseCrud === 'update' ||
      lowercaseCrud === 'delete' ||
      lowercaseCrud === 'read' ||
      lowercaseCrud === 'create';
    const { url, uri } = xhrOptions;

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
          `the Redux Resource XHR documentation: ` +
          `https://redux-resource.js.org/docs/extras/redux-resource-xhr.html`
      );
    }
  }

  const crudType = crudActionOption.toUpperCase();

  const pendingAction = {
    ...actionDefaults,
    type: actionTypes[`${crudType}_RESOURCES_PENDING`],
    // This may seem strange, but any unresolved request has a status code of 0
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
    statusCode: 0
  };

  if (onPending) {
    onPending(pendingAction);
  } else {
    dispatch(pendingAction);
  }

  const req = xhr(xhrOptions, (err, res, body) => {
    const statusCode = res ? res.statusCode : 0;
    if (req.aborted) {
      const abortedAction = {
        ...actionDefaults,
        type: actionTypes[`${crudType}_RESOURCES_NULL`],
        statusCode,
        res
      };

      if (onAborted) {
        onAborted(abortedAction, res);
      } else {
        dispatch(abortedAction);
      }
    } else if (err || statusCode >= 400 || statusCode === 0) {
      const failedAction = {
        ...actionDefaults,
        type: actionTypes[`${crudType}_RESOURCES_FAILED`],
        statusCode,
        res,
        err
      };

      if (onFailed) {
        onFailed(failedAction, err, res);
      } else {
        dispatch(failedAction);
      }
    } else {
      let resources;

      if (body) {
        if (transformData) {
          resources = transformData(body, options);
        } else {
          resources = body;
        }
      } else {
        resources = actionDefaults.resources;
      }

      const succeededAction = {
        ...actionDefaults,
        type: actionTypes[`${crudType}_RESOURCES_SUCCEEDED`],
        statusCode,
        resources,
        res
      };

      if (onSucceeded) {
        onSucceeded(succeededAction, res, body);
      } else {
        dispatch(succeededAction);
      }
    }
  });

  return req;
}

export { crudRequest, xhr };
