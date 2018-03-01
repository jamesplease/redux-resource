import warning from './warning';

const requestStatuses = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  SUCCEEDED: 'SUCCEEDED',
};

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  function warn(propName) {
    warning(
      `You attempted to access the NULL request status that is exported from ` +
        ` Redux Resource. This request status has been renamed to IDLE ` +
        `in Redux Resource v3. Please update your application to ` +
        `use the new request status. For more information, refer to the ` +
        `documentation for the request statuses at: ` +
        `https://redux-resource.js.org/docs/api-reference/request-statuses.html\n\n` +
        `Also, the migration guide to Redux Resource v3 can be found at: ` +
        `https://github.com/jamesplease/redux-resource/blob/master/packages/redux-resource/docs/migration-guides/2-to-3.md`,
      `NULL_REQUEST_STATUS_ACCESSED`
    );
  }

  Object.defineProperty(requestStatuses, 'NULL', {
    get() {
      warn('READ_RESOURCES_NULL');
    },
  });
}

export default requestStatuses;
