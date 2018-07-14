import { actionTypes } from 'redux-resource';

export default function resourceRequest(crudAction, options) {
  const {
    dispatch,
    url,
    xhrOptions = {},
    transformResponse,
    actionDefaults = {},
    onPending,
    onFailed,
    onSucceeded,
    onAborted,
  } = options;

  const { resourceName, resourceType, requestProperties } = actionDefaults;
  const typeToUse = resourceType || resourceName;

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

    if (!typeToUse) {
      console.warn(
        `A resourceType was not passed to a Redux Resource Fetch action ` +
          `creator. A resourceType must be passed so that Redux Resource ` +
          `knows which resource slice to update. Refer to the Request Actions ` +
          `guide for more: https://redux-resource.js.org/docs/requests/request-actions.html`
      );
    }

    if (!isValidCrudType) {
      console.warn(
        `An invalid "crudAction" was passed to a Redux Resource Fetch action creator. ` +
          `It must be one of: "create", "read", "update", "delete"`
      );
    }

    if (!url && !uri) {
      console.warn(
        `No URL was passed to a call to a Redux Resource Fetch resourceRequest. You must ` +
          `pass a "url". For more, refer to ` +
          `the Redux Resource Fetch documentation: ` +
          `https://redux-resource.js.org/docs/extras/redux-resource-fetch.html`
      );
    }
  }

  const crudType = crudActionOption.toUpperCase();

  const pendingAction = {
    ...actionDefaults,
    type: actionTypes[`${crudType}_RESOURCES_PENDING`],
    requestProperties,
  };

  if (onPending) {
    onPending(pendingAction);
  } else {
    dispatch(pendingAction);
  }

  return fetch(url, xhrOptions).then(
    res => {
      const statusCode = res ? res.status : null;

      if (!res.ok) {
        const failedAction = {
          ...actionDefaults,
          type: actionTypes[`${crudType}_RESOURCES_FAILED`],
          requestProperties: {
            ...requestProperties,
            statusCode,
          },
          res: res,
          err: null,
        };

        if (onFailed) {
          onFailed(failedAction, null, res);
        } else {
          dispatch(failedAction);
        }

        return;
      }

      let transformedResponse;

      if (transformResponse) {
        transformedResponse = transformResponse(res, options);
      } else {
        transformedResponse = res.json();
      }

      transformedResponse.then(
        resources => {
          const succeededAction = {
            ...actionDefaults,
            type: actionTypes[`${crudType}_RESOURCES_SUCCEEDED`],
            requestProperties: {
              ...requestProperties,
              statusCode,
            },
            resources,
            res,
          };

          if (onSucceeded) {
            onSucceeded(succeededAction, transformedResponse);
          } else {
            dispatch(succeededAction);
          }

          return resources;
        },
        () => {
          const resources = [];

          const succeededAction = {
            ...actionDefaults,
            type: actionTypes[`${crudType}_RESOURCES_SUCCEEDED`],
            requestProperties: {
              ...requestProperties,
              statusCode,
            },
            resources,
            res,
          };

          if (onSucceeded) {
            onSucceeded(succeededAction, transformedResponse);
          } else {
            dispatch(succeededAction);
          }

          return resources;
        }
      );

      return transformedResponse;
    },
    err => {
      if (err && err.name === 'AbortError') {
        const abortedAction = {
          ...actionDefaults,
          type: actionTypes[`${crudType}_RESOURCES_IDLE`],
          requestProperties,
          err,
          res: null,
        };

        if (onAborted) {
          onAborted(abortedAction, err);
        } else {
          dispatch(abortedAction);
        }

        return err;
      }

      const failedAction = {
        ...actionDefaults,
        type: actionTypes[`${crudType}_RESOURCES_FAILED`],
        requestProperties: {
          ...requestProperties,
          statusCode: null,
        },
        res: null,
        err,
      };

      if (onFailed) {
        onFailed(failedAction, err, null);
      } else {
        dispatch(failedAction);
      }

      return err;
    }
  );
}
