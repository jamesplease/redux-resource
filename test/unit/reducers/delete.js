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
      labels: {},
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
      labels: {},
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
      labels: {},
      listMeta: {
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  describe('DELETE_RESOURCES_SUCCESS', () => {
    it('returns the right state without a label', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: [
            {id: 1},
            {id: 3},
            {id: 4},
          ],
          labels: {},
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
        labels: {},
        meta: {
          1: {
            name: 'what'
          },
          3: null,
          4: null
        },
        listMeta: {
          updateStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          createStatus: requestStatuses.NULL
        }
      });
    });

    it('returns the right state with a label', () => {
      const reducer = resourceReducer('hellos', {
        initialState: {
          resources: [
            {id: 1},
            {id: 3},
            {id: 4},
          ],
          labels: {
            deletingStuff: {
              ids: [3, 4],
              status: 'PENDING'
            }
          },
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
        requestLabel: 'deletingStuff',
        ids: [3, 4]
      });

      expect(reduced).to.deep.equal({
        resources: [
          {id: 1},
        ],
        labels: {
          deletingStuff: {
            status: 'SUCCEEDED',
            ids: []
          }
        },
        meta: {
          1: {
            name: 'what'
          },
          3: null,
          4: null
        },
        listMeta: {
          updateStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          createStatus: requestStatuses.NULL
        }
      });
    });
  });
});
