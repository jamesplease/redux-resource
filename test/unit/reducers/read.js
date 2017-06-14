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
      listMeta: {
        createStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `READ_RESOURCES_SUCCEED`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 100, sandwiches: 'yummm'},
          {id: 23},
          {id: 55},
        ],
        meta: {
          23: 'sandwiches'
        }
      }
    });

    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES_SUCCEED',
      resourceName: 'hellos',
      resources: [
        {id: 2, hungry: true, pasta: 'yespls'},
        {id: 100, hungry: false},
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 2, hungry: true, pasta: 'yespls'},
        {id: 100, hungry: false},
      ],
      meta: {
        2: {
          updateStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
        },
        100: {
          updateStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL
        }
      },
      labelStatus: {},
      listMeta: {
        createStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        readStatus: requestStatuses.SUCCEEDED
      }
    });
  });

  it('should handle `READ_RESOURCES_SUCCEED` with ids', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 23, hungry: 'yes'},
          {id: 100, sandwiches: 'yummm'},
          {id: 55, pasta: true},
        ],
        meta: {
          23: {
            readStatus: requestStatuses.PENDING,
            deleteStatus: requestStatuses.NULL,
            updateStatus: requestStatuses.FAILED
          },
          55: {
            readStatus: requestStatuses.PENDING,
            deleteStatus: requestStatuses.NULL,
            updateStatus: requestStatuses.NULL
          },
          100: {
            readStatus: requestStatuses.PENDING,
            deleteStatus: requestStatuses.NULL,
            updateStatus: requestStatuses.NULL
          }
        }
      }
    });

    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES_SUCCEED',
      resourceName: 'hellos',
      ids: [100, 23, 55],
      resources: [
        {id: 55, hungry: true, pasta: 'yespls'},
        {id: 23, hungry: true, pasta: 'yespls'},
        {id: 100, hungry: false},
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 23, hungry: true, pasta: 'yespls'},
        {id: 100, hungry: false, sandwiches: 'yummm'},
        {id: 55, hungry: true, pasta: 'yespls'},
      ],
      meta: {
        23: {
          updateStatus: requestStatuses.FAILED,
          readStatus: requestStatuses.SUCCEEDED,
          deleteStatus: requestStatuses.NULL,
        },
        55: {
          readStatus: requestStatuses.SUCCEEDED,
          deleteStatus: requestStatuses.NULL,
          updateStatus: requestStatuses.NULL
        },
        100: {
          updateStatus: requestStatuses.NULL,
          readStatus: requestStatuses.SUCCEEDED,
          deleteStatus: requestStatuses.NULL
        }
      },
      labelStatus: {},
      listMeta: {
        createStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `READ_RESOURCES_SUCCEED` with `replace: false`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 100, sandwiches: 'yummm'},
          {id: 23},
          {id: 55},
        ],
        meta: {
          23: 'sandwiches'
        }
      }
    });

    const reduced = reducer(undefined, {
      type: 'READ_RESOURCES_SUCCEED',
      resourceName: 'hellos',
      replace: false,
      resources: [
        {id: 2, hungry: true, pasta: 'yespls'},
        {id: 100, hungry: false},
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 100, hungry: false, sandwiches: 'yummm'},
        {id: 23},
        {id: 55},
        {id: 2, hungry: true, pasta: 'yespls'},
      ],
      meta: {
        2: {
          updateStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL,
        },
        23: 'sandwiches',
        100: {
          updateStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL
        }
      },
      labelStatus: {},
      listMeta: {
        createStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        readStatus: requestStatuses.SUCCEEDED
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
      listMeta: {
        createStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL
      }
    });
  });
});
