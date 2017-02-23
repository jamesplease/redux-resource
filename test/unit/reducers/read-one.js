import simpleResource, {xhrStatuses} from '../../../src';

describe('reducers: readOne', function() {
  it('should handle `RETRIEVE_HELLO`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLO',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {
        3: {
          retrievingStatus: 'PENDING'
        }
      },
      resourcesListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `RETRIEVE_HELLO_FAIL`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLO_FAIL',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {
        3: {
          retrievingStatus: 'FAILED'
        }
      },
      resourcesListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `RETRIEVE_HELLO_SUCCEED`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLO_SUCCEED',
      id: 3,
      resource: {
        id: 3,
        sandwiches: 'yum'
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {
          id: 3,
          sandwiches: 'yum'
        }
      ],
      resourcesMeta: {
        3: {
          retrievingStatus: 'SUCCEEDED'
        }
      },
      resourcesListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `RETRIEVE_HELLO_SUCCEED` with a custom idAttribute', () => {
    const result = simpleResource('hello', {
      idAttribute: 'whatPls'
    });
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLO_SUCCEED',
      whatPls: 3,
      resource: {
        whatPls: 3,
        sandwiches: 'yum'
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {
          whatPls: 3,
          sandwiches: 'yum'
        }
      ],
      resourcesMeta: {
        3: {
          retrievingStatus: 'SUCCEEDED'
        }
      },
      resourcesListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `RETRIEVE_HELLO_ABORT`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLO_ABORT',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {
        3: {
          retrievingStatus: 'ABORTED'
        }
      },
      resourcesListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `RETRIEVE_HELLO_RESET`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLO_RESET',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {
        3: {
          retrievingStatus: xhrStatuses.NULL
        }
      },
      resourcesListMeta: {
        retrievingStatus: xhrStatuses.NULL,
        creatingStatus: xhrStatuses.NULL
      }
    });
  });
});
