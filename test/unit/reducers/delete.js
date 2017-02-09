import simpleResource from '../../../src';
const {resourceStatuses} = simpleResource;

describe('reducers: readOne', function() {
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
      resourcesMeta: {
        3: {
          deletingStatus: resourceStatuses.PENDING
        }
      },
      resourcesListMeta: {}
    });
  });

  it('should handle `DELETE_HELLO_FAILURE`', () => {
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
      type: 'DELETE_HELLO_FAILURE',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      resourcesMeta: {
        3: {
          deletingStatus: resourceStatuses.FAILED
        }
      },
      resourcesListMeta: {}
    });
  });

  it('should handle `DELETE_HELLO_ABORTED`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ],
        resourcesMeta: {
          3: {
            deletingStatus: 'sandwiches'
          }
        }
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'DELETE_HELLO_ABORTED',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      resourcesMeta: {
        3: {
          deletingStatus: resourceStatuses.ABORTED
        }
      },
      resourcesListMeta: {}
    });
  });

  it('should handle `DELETE_HELLO_RESET_RESOLUTION`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ],
        resourcesMeta: {
          3: {
            deletingStatus: 'sandwiches'
          }
        }
      }
    });

    const reduced = result.reducer(result.initialState, {
      type: 'DELETE_HELLO_RESET_RESOLUTION',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 3},
        {id: 4},
      ],
      resourcesMeta: {
        3: {
          deletingStatus: resourceStatuses.NULL
        }
      },
      resourcesListMeta: {}
    });
  });

  it('should handle `DELETE_HELLO_SUCCESS`', () => {
    const result = simpleResource('hello', {
      initialState: {
        resources: [
          {id: 1},
          {id: 3},
          {id: 4},
        ],
        resourcesMeta: {
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
      type: 'DELETE_HELLO_SUCCESS',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [
        {id: 1},
        {id: 4},
      ],
      resourcesMeta: {
        2: {
          name: 'what'
        },
        3: null
      },
      resourcesListMeta: {}
    });
  });
});
