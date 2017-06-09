import simpleResource, {xhrStatuses} from '../../../src';

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
      resourceMeta: {
        3: {
          deleteXhrStatus: xhrStatuses.PENDING
        },
        4: {
          deleteXhrStatus: xhrStatuses.PENDING
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
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
      resourceMeta: {
        3: {
          deleteXhrStatus: xhrStatuses.FAILED
        },
        4: {
          deleteXhrStatus: xhrStatuses.FAILED
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
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
      resourceMeta: {
        3: {
          deleteXhrStatus: xhrStatuses.NULL
        },
        4: {
          deleteXhrStatus: xhrStatuses.NULL
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
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
      resourceMeta: {
        3: {
          deleteXhrStatus: xhrStatuses.NULL
        },
        4: {
          deleteXhrStatus: xhrStatuses.NULL
        }
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
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
        resourceMeta: {
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
      resourceMeta: {
        1: {
          name: 'what'
        },
        3: null,
        4: null
      },
      resourceListMeta: {
        readXhrStatus: xhrStatuses.NULL,
        createManyXhrStatus: xhrStatuses.NULL,
        createXhrStatus: xhrStatuses.NULL
      }
    });
  });
});
