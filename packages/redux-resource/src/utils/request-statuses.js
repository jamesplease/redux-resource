import warning from './warning';

const requestStatuses = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  SUCCEEDED: 'SUCCEEDED',
};

if (process.env.NODE_ENV !== 'production') {
  Object.defineProperty(requestStatuses, 'NULL', {
    get() {
      warning(
        `You attempted to access the NULL request status from the requestStatus object ` +
         `that is exported from Redux Resource. The NULL request status ` +
          `has been renamed to IDLE in Redux Resource v3. Please update your ` +
          `application to use the new request status. Typically, this can be ` +
          `done by doing a find and replace within your source code to ` +
          `replace "NULL" with "IDLE". For more information, refer to the ` +
          `documentation for the request statuses at: ` +
          `https://redux-resource.js.org/docs/api-reference/request-statuses.html\n\n` +
          `Also, the migration guide to Redux Resource v3 can be found at: ` +
          `https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource/docs/migration-guides/2-to-3.md`,
        `NULL_REQUEST_STATUS_ACCESSED`
      );
    },
  });
}

export default requestStatuses;
