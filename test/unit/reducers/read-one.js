import reduxInconsistentApi from '../../../src/redux-inconsistent-api';
const {resourceStatuses} = reduxInconsistentApi;

describe('reducers: readOne', function() {
  it('should handle `RETRIEVE_HELLO`', () => {
    const result = reduxInconsistentApi('hello');
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
      resourcesListMeta: {}
    });
  });

  it('should handle `RETRIEVE_HELLO_FAILURE`', () => {
    const result = reduxInconsistentApi('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLO_FAILURE',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {
        3: {
          retrievingStatus: 'FAILED'
        }
      },
      resourcesListMeta: {}
    });
  });

  it('should handle `RETRIEVE_HELLO_SUCCESS`', () => {
    const result = reduxInconsistentApi('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLO_SUCCESS',
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
      resourcesListMeta: {}
    });
  });

  it('should handle `RETRIEVE_HELLO_SUCCESS` with a custom idAttribute', () => {
    const result = reduxInconsistentApi('hello', {
      idAttribute: 'whatPls'
    });
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLO_SUCCESS',
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
      resourcesListMeta: {}
    });
  });

  it('should handle `RETRIEVE_HELLO_ABORTED`', () => {
    const result = reduxInconsistentApi('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLO_ABORTED',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {
        3: {
          retrievingStatus: 'ABORTED'
        }
      },
      resourcesListMeta: {}
    });
  });

  it('should handle `RETRIEVE_HELLO_RESET_RESOLUTION`', () => {
    const result = reduxInconsistentApi('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'RETRIEVE_HELLO_RESET_RESOLUTION',
      id: 3
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourcesMeta: {
        3: {
          retrievingStatus: null
        }
      },
      resourcesListMeta: {}
    });
  });
});
