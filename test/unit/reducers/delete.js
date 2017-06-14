import {resourceReducer, requestStatuses} from '../../../src';

describe('reducers: delete', function() {
  it('should handle `DELETE_RESOURCES`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = reducer(undefined, {
      type: 'DELETE_RESOURCES',
      resourceName: 'hellos',
      ids: [3, 4]
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
        },
        4: {
          deleteStatus: requestStatuses.PENDING
        }
      },
      labelStatus: {},
      listMeta: {
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `DELETE_RESOURCES_FAIL`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = reducer(undefined, {
      type: 'DELETE_RESOURCES_FAIL',
      resourceName: 'hellos',
      ids: [3, 4]
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
        },
        4: {
          deleteStatus: requestStatuses.FAILED
        }
      },
      labelStatus: {},
      listMeta: {
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `DELETE_RESOURCES_NULL`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = reducer(undefined, {
      type: 'DELETE_RESOURCES_NULL',
      resourceName: 'hellos',
      ids: [3, 4]
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
        },
        4: {
          deleteStatus: requestStatuses.NULL
        }
      },
      labelStatus: {},
      listMeta: {
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `DELETE_RESOURCES_SUCCEED`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ],
        meta: {
          1: {
            name: 'what'
          },
          3: {
            deleteStatus: 'sandwiches'
          }
        }
      }
    });

    const reduced = reducer(undefined, {
      type: 'DELETE_RESOURCES_SUCCEED',
      resourceName: 'hellos',
      ids: [3, 4]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
      ],
      meta: {
        1: {
          name: 'what'
        },
        3: null,
        4: null
      },
      labelStatus: {},
      listMeta: {
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });
});
