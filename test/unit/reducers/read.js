import {resourceReducer, requestStatuses} from '../../../src';

describe('reducers: read', function() {
  it('should handle `READ_RESOURCE`', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'READ_RESOURCE',
      resourceName: 'hellos',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {
        3: {
          readStatus: 'PENDING'
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `READ_RESOURCE_FAIL`', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'READ_RESOURCE_FAIL',
      resourceName: 'hellos',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {
        3: {
          readStatus: 'FAILED'
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `READ_RESOURCE_SUCCEED`', () => {
    const reducer = resourceReducer('hellos', {
      resources: [
        {id: 3, hunger: false}
      ]
    });

    const reduced = reducer(undefined, {
      type: 'READ_RESOURCE_SUCCEED',
      resourceName: 'hellos',
      id: 3,
      resource: {
        id: 3,
        sandwiches: 'yum'
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {
          id: 3,
          sandwiches: 'yum'
        }
      ],
      meta: {
        3: {
          readStatus: 'SUCCEEDED'
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `READ_RESOURCE_SUCCEED` with `replace: false`', () => {
    const reducer = resourceReducer('hellos', {
      resources: [
        {id: 3, hunger: false}
      ]
    });

    const reduced = reducer(undefined, {
      type: 'READ_RESOURCE_SUCCEED',
      resourceName: 'hellos',
      id: 3,
      replace: false,
      resource: {
        id: 3,
        sandwiches: 'yum'
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {
          id: 3,
          sandwiches: 'yum',
          hunger: false
        }
      ],
      meta: {
        3: {
          readStatus: 'SUCCEEDED'
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `READ_RESOURCE_RESET`', () => {
    const reducer = resourceReducer('hellos');
    const reduced = reducer(undefined, {
      type: 'READ_RESOURCE_RESET',
      resourceName: 'hellos',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {
        3: {
          readStatus: requestStatuses.NULL
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });
});
