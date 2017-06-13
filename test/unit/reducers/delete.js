import {resourceReducer, requestStatuses} from '../../../src';

describe('reducers: delete', function() {
  it('should handle `DELETE_RESOURCE`', () => {
    const reducer = resourceReducer('hellos', {
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ]
    });

    const reduced = reducer(undefined, {
      type: 'DELETE_RESOURCE',
      resourceName: 'hellos',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      meta: {
        3: {
          deleteStatus: requestStatuses.PENDING
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `DELETE_RESOURCE_FAIL`', () => {
    const reducer = resourceReducer('hellos', {
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ]
    });

    const reduced = reducer(undefined, {
      type: 'DELETE_RESOURCE_FAIL',
      resourceName: 'hellos',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      meta: {
        3: {
          deleteStatus: requestStatuses.FAILED
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `DELETE_RESOURCE_RESET`', () => {
    const reducer = resourceReducer('hellos', {
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      meta: {
        3: {
          deleteStatus: 'sandwiches'
        }
      }
    });

    const reduced = reducer(undefined, {
      type: 'DELETE_RESOURCE_RESET',
      resourceName: 'hellos',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      meta: {
        3: {
          deleteStatus: requestStatuses.NULL
        }
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `DELETE_RESOURCE_SUCCEED`', () => {
    const reducer = resourceReducer('hellos', {
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      meta: {
        2: {
          name: 'what'
        },
        3: {
          deleteStatus: 'sandwiches'
        }
      }
    });

    const reduced = reducer(undefined, {
      type: 'DELETE_RESOURCE_SUCCEED',
      resourceName: 'hellos',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 4},
      ],
      meta: {
        2: {
          name: 'what'
        },
        3: null
      },
      listMeta: {
        readStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });
});
