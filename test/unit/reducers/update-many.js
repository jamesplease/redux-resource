import simpleResource, {xhrStatuses} from '../../../src';

describe('reducers: updateMany', function() {
  it('should handle `UPDATE_MANY_HELLOS`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_MANY_HELLOS',
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
      resourceMeta: {
        3: {
          updateXhrStatus: xhrStatuses.PENDING
        },
        4: {
          updateXhrStatus: xhrStatuses.PENDING
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_HELLOS_FAIL`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_MANY_HELLOS_FAIL',
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
      resourceMeta: {
        3: {
          updateXhrStatus: xhrStatuses.FAILED
        },
        4: {
          updateXhrStatus: xhrStatuses.FAILED
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_HELLOS_ABORT`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_MANY_HELLOS_ABORT',
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
      resourceMeta: {
        3: {
          updateXhrStatus: xhrStatuses.NULL
        },
        4: {
          updateXhrStatus: xhrStatuses.NULL
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_HELLOS_RESET`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_MANY_HELLOS_RESET',
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
      resourceMeta: {
        3: {
          updateXhrStatus: xhrStatuses.NULL
        },
        4: {
          updateXhrStatus: xhrStatuses.NULL
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_HELLOS_SUCCEED`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_MANY_HELLOS_SUCCEED',
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
      resourceMeta: {
        3: {
          updateXhrStatus: xhrStatuses.SUCCEEDED
        },
        4: {
          updateXhrStatus: xhrStatuses.SUCCEEDED
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_HELLOS_SUCCEED`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_MANY_HELLOS_SUCCEED',
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
      resourceMeta: {
        3: {
          updateXhrStatus: xhrStatuses.SUCCEEDED
        },
        4: {
          updateXhrStatus: xhrStatuses.SUCCEEDED
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_HELLOS_SUCCEED` with a custom idAttribute', () => {
    const result = simpleResource('hello', {
      idAttribute: 'movieId',
      initialState: {
        resources: [
          {movieId: 1, hungry: null},
          {movieId: 3, hungry: null},
          {movieId: 4, hungry: null},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_MANY_HELLOS_SUCCEED',
      resources: [
        {
          movieId: 3,
          hungry: true
        },
        {
          movieId: 4,
          hungry: false
        }
      ]
    });

    expect(reduced).to.deep.equal({
      resources: [
        {movieId: 1, hungry: null},
        {movieId: 3, hungry: true},
        {movieId: 4, hungry: false},
      ],
      resourceMeta: {
        3: {
          updateXhrStatus: xhrStatuses.SUCCEEDED
        },
        4: {
          updateXhrStatus: xhrStatuses.SUCCEEDED
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `UPDATE_MANY_HELLOS_SUCCEED` with `replace: true`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1, hungry: null},
          {id: 3, hungry: null},
          {id: 4, hungry: null},
        ]
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'UPDATE_MANY_HELLOS_SUCCEED',
      replace: true,
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
      resourceMeta: {
        3: {
          updateXhrStatus: xhrStatuses.SUCCEEDED
        },
        4: {
          updateXhrStatus: xhrStatuses.SUCCEEDED
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });
});
