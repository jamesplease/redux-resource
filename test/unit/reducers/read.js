import {resourceReducer, requestStatuses} from '../../../src';

describe('reducers: read', function() {
  it('should handle `READ_RESOURCES` without IDs', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES',
      resourceName: 'hellos',
      ids: []
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {},
      labelStatus: {},
      labelResources: {},
      listMeta: {
        createStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        readStatus: requestStatuses.PENDING
      }
    });
  });

  it('should handle `READ_RESOURCES` with IDs', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES',
      resourceName: 'hellos',
      ids: [2]
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {
        2: {
          readStatus: requestStatuses.PENDING
        }
      },
      labelStatus: {},
      labelResources: {},
      listMeta: {
        createStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `READ_RESOURCES_FAIL`', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES_FAIL',
      resourceName: 'hellos',
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {},
      labelStatus: {},
      labelResources: {},
      listMeta: {
        createStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        readStatus: requestStatuses.FAILED
      }
    });
  });

  it('should handle `READ_RESOURCES_FAILED` with IDs', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES_FAIL',
      resourceName: 'hellos',
      ids: [2]
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {
        2: {
          readStatus: requestStatuses.FAILED
        }
      },
      labelStatus: {},
      labelResources: {},
      listMeta: {
        createStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `READ_RESOURCES_NULL`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        listMeta: {
          createStatus: requestStatuses.NULL,
          readStatus: 'sandwiches'
        }
      }
    });

    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES_NULL',
      resourceName: 'hellos',
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {},
      labelStatus: {},
      labelResources: {},
      listMeta: {
        createStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `READ_RESOURCES_NULL` with IDs', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        meta: {
          2: {
            readStatus: requestStatuses.FAILED
          }
        }
      }
    });

    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES_NULL',
      resourceName: 'hellos',
      ids: [2]
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {
        2: {
          readStatus: requestStatuses.NULL
        }
      },
      labelStatus: {},
      labelResources: {},
      listMeta: {
        createStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL
      }
    });
  });
});
