import simpleResource, {requestStatuses} from '../../../src';

describe('reducers: deleteMany', function() {
  it('should handle `DELETE_MANY_HELLOS`', () => {
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
      type: 'DELETE_MANY_HELLOS',
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
          deleteXhrStatus: requestStatuses.PENDING
        },
        4: {
          deleteXhrStatus: requestStatuses.PENDING
        }
      },
      listMeta: {
        readXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        createXhrStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `DELETE_MANY_HELLOS_FAIL`', () => {
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
      type: 'DELETE_MANY_HELLOS_FAIL',
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
          deleteXhrStatus: requestStatuses.FAILED
        },
        4: {
          deleteXhrStatus: requestStatuses.FAILED
        }
      },
      listMeta: {
        readXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        createXhrStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `DELETE_MANY_HELLOS_ABORT`', () => {
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
      type: 'DELETE_MANY_HELLOS_ABORT',
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
          deleteXhrStatus: requestStatuses.NULL
        },
        4: {
          deleteXhrStatus: requestStatuses.NULL
        }
      },
      listMeta: {
        readXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        createXhrStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `DELETE_MANY_HELLOS_RESET`', () => {
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
      type: 'DELETE_MANY_HELLOS_RESET',
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
          deleteXhrStatus: requestStatuses.NULL
        },
        4: {
          deleteXhrStatus: requestStatuses.NULL
        }
      },
      listMeta: {
        readXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        createXhrStatus: requestStatuses.NULL
      }
    });
  });

  it('should handle `DELETE_MANY_HELLOS_SUCCEED`', () => {
    const result = simpleResource('hello', {
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
            deleteXhrStatus: 'sandwiches'
          }
        }
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'DELETE_MANY_HELLOS_SUCCEED',
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
      listMeta: {
        readXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        createXhrStatus: requestStatuses.NULL
      }
    });
  });
});
