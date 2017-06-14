import {resourceReducer, requestStatuses} from '../../../src';

describe('reducers: update', function() {
  it('should handle `UPDATE_RESOURCES`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_RESOURCES',
      ids: [3, 4],
      resourceName: 'hellos',
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: null},
        {id: 4, hungry: null},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.PENDING
        },
        4: {
          updateStatus: requestStatuses.PENDING
        }
      },
      labelStatus: {},
      labelResources: {},
      listMeta: {
        readStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_RESOURCES_FAIL`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_RESOURCES_FAIL',
      ids: [3, 4],
      resourceName: 'hellos',
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: null},
        {id: 4, hungry: null},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.FAILED
        },
        4: {
          updateStatus: requestStatuses.FAILED
        }
      },
      labelStatus: {},
      labelResources: {},
      listMeta: {
        readStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_RESOURCES_NULL`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_RESOURCES_NULL',
      resourceName: 'hellos',
      ids: [3, 4],
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: null},
        {id: 4, hungry: null},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.NULL
        },
        4: {
          updateStatus: requestStatuses.NULL
        }
      },
      labelStatus: {},
      labelResources: {},
      listMeta: {
        readStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_RESOURCES_SUCCEED`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_RESOURCES_SUCCEED',
      ids: [3, 4],
      resourceName: 'hellos',
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: true},
        {id: 4, hungry: false},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.SUCCEEDED
        },
        4: {
          updateStatus: requestStatuses.SUCCEEDED
        }
      },
      labelStatus: {},
      labelResources: {},
      listMeta: {
        readStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_RESOURCES_SUCCEED`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_RESOURCES_SUCCEED',
      resourceName: 'hellos',
      ids: [3, 4],
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1, hungry: null},
        {id: 3, hungry: true},
        {id: 4, hungry: false},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.SUCCEEDED
        },
        4: {
          updateStatus: requestStatuses.SUCCEEDED
        }
      },
      labelStatus: {},
      labelResources: {},
      listMeta: {
        readStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_RESOURCES_SUCCEED` with `replace: true`', () => {
    const reducer = resourceReducer('hellos', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = reducer(undefined, {
      type: 'UPDATE_RESOURCES_SUCCEED',
      resourceName: 'hellos',
      replace: true,
      ids: [3, 4],
      resources: [
        {
          id: 3,
          hungry: true
        },
        {
          id: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 3, hungry: true},
        {id: 4, hungry: false},
      ],
      meta: {
        3: {
          updateStatus: requestStatuses.SUCCEEDED
        },
        4: {
          updateStatus: requestStatuses.SUCCEEDED
        }
      },
      labelStatus: {},
      labelResources: {},
      listMeta: {
        readStatus: requestStatuses.NULL,
        updateStatus: requestStatuses.NULL,
        deleteStatus: requestStatuses.NULL,
        createStatus: requestStatuses.NULL
      }
    });
  });
});
