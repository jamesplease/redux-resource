import simpleResource, {xhrStatuses} from '../../../src';

describe('reducers: delete', function() {
  it('should handle `DELETE_HELLO`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'DELETE_HELLO',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      resourceMeta: {
        3: {
          deletingStatus: xhrStatuses.PENDING
        }
      },
      resourceListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `DELETE_HELLO_FAIL`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'DELETE_HELLO_FAIL',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      resourceMeta: {
        3: {
          deletingStatus: xhrStatuses.FAILED
        }
      },
      resourceListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `DELETE_HELLO_ABORT`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ],
        resourceMeta: {
          3: {
            deletingStatus: 'sandwiches'
          }
        }
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'DELETE_HELLO_ABORT',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      resourceMeta: {
        3: {
          deletingStatus: xhrStatuses.ABORTED
        }
      },
      resourceListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `DELETE_HELLO_RESET`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ],
        resourceMeta: {
          3: {
            deletingStatus: 'sandwiches'
          }
        }
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'DELETE_HELLO_RESET',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      resourceMeta: {
        3: {
          deletingStatus: xhrStatuses.NULL
        }
      },
      resourceListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `DELETE_HELLO_SUCCEED`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ],
        resourceMeta: {
          2: {
            name: 'what'
          },
          3: {
            deletingStatus: 'sandwiches'
          }
        }
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'DELETE_HELLO_SUCCEED',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 4},
      ],
      resourceMeta: {
        2: {
          name: 'what'
        },
        3: null
      },
      resourceListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `DELETE_HELLO_SUCCEED` with a custom idAttribute', () => {
    const result = simpleResource('hello', {
      idAttribute: 'movieId',
      initialState: {
        resources: [
          {movieId: 1},
          {movieId: 3},
          {movieId: 4},
        ],
        resourceMeta: {
          2: {
            name: 'what'
          },
          3: {
            deletingStatus: 'sandwiches'
          }
        }
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'DELETE_HELLO_SUCCEED',
      movieId: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {movieId: 1},
        {movieId: 4},
      ],
      resourceMeta: {
        2: {
          name: 'what'
        },
        3: null
      },
      resourceListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });
});
