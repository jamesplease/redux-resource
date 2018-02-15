import { resourceRequestReducer } from '../../../src';

describe('Request Reducer', function() {
  it('returns the right state without a request key, with IDs', () => {
    stub(console, 'error');
    const initialState = {
      requests: {
        pasta: {
          hungry: true
        }
      }
    };

    const reducer = resourceRequestReducer({ initialState });

    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCES_PENDING',
      resourceName: 'hellos',
      resources: [1]
    });

    expect(reduced).to.deep.equal(initialState);
    expect(console.error.callCount).to.equal(0);
  });

  it('returns the right state with an arbitrary action type', () => {
    stub(console, 'error');
    const initialState = {
      requests: {
        pasta: {
          hungry: true
        }
      }
    };

    const reducer = resourceRequestReducer({ initialState });

    const reduced = reducer(undefined, {
      type: 'BLEEP_BLOOP',
      resourceName: 'hellos',
      requestKey: 'ok',
      resources: [1]
    });

    expect(reduced).to.deep.equal(initialState);
    expect(console.error.callCount).to.equal(0);
  });

  it('returns the right state with an existing request key, with IDs: PENDING', () => {
    stub(console, 'error');
    const initialState = {
      requests: {
        pasta: {
          hungry: true
        }
      }
    };

    const reducer = resourceRequestReducer({ initialState });

    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCES_PENDING',
      resourceName: 'hellos',
      requestName: 'GET /pasta',
      requestKey: 'pasta',
      resources: [1]
    });

    expect(reduced).to.deep.equal({
      requests: {
        pasta: {
          hungry: true,
          requestName: 'GET /pasta',
          status: 'PENDING'
        }
      }
    });

    expect(console.error.callCount).to.equal(0);
  });

  it('returns the right state with an existing request key, with IDs: PENDING and requestAttributes', () => {
    stub(console, 'error');
    const initialState = {
      requests: {
        pasta: {
          hungry: true
        }
      }
    };

    const reducer = resourceRequestReducer({ initialState });

    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCES_PENDING',
      resourceName: 'hellos',
      requestName: 'GET /pasta',
      requestKey: 'pasta',
      resources: [1],
      requestAttributes: {
        statusCode: 404,
        hungry: false
      }
    });

    expect(reduced).to.deep.equal({
      requests: {
        pasta: {
          hungry: false,
          statusCode: 404,
          requestName: 'GET /pasta',
          status: 'PENDING'
        }
      }
    });

    expect(console.error.callCount).to.equal(0);
  });

  it('returns the right state with an existing request key, with IDs: FAILED', () => {
    stub(console, 'error');
    const initialState = {
      requests: {
        pasta: {
          hungry: true
        }
      }
    };

    const reducer = resourceRequestReducer({ initialState });

    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCES_FAILED',
      resourceName: 'hellos',
      requestName: 'GET /pasta',
      requestKey: 'pasta',
      resources: [1]
    });

    expect(reduced).to.deep.equal({
      requests: {
        pasta: {
          hungry: true,
          requestName: 'GET /pasta',
          status: 'FAILED'
        }
      }
    });

    expect(console.error.callCount).to.equal(0);
  });

  it('returns the right state with an existing request key, with IDs: NULL', () => {
    stub(console, 'error');
    const initialState = {
      requests: {
        pasta: {
          hungry: true
        }
      }
    };

    const reducer = resourceRequestReducer({ initialState });

    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCES_NULL',
      resourceName: 'hellos',
      // This tests the deprecated API
      request: 'pasta',
      resources: [1]
    });

    expect(reduced).to.deep.equal({
      requests: {
        pasta: {
          hungry: true,
          requestName: 'pasta',
          status: 'NULL'
        }
      }
    });

    expect(console.error.callCount).to.equal(0);
  });

  it('returns the right state with an existing request key, with resources: SUCCEEDED', () => {
    stub(console, 'error');
    const initialState = {
      requests: {
        pasta: {
          hungry: true
        }
      }
    };

    const reducer = resourceRequestReducer({ initialState });

    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCES_SUCCEEDED',
      requestName: 'GET /pasta',
      requestKey: 'pasta',
      resources: {
        books: [{ id: 24, title: 'Things' }, { id: 50, title: 'Things2' }],
        authors: [{ id: 100 }]
      }
    });

    expect(reduced).to.deep.equal({
      requests: {
        pasta: {
          hungry: true,
          requestName: 'GET /pasta',
          status: 'SUCCEEDED',
          resources: {
            books: [24, 50],
            authors: [100]
          }
        }
      }
    });

    expect(console.error.callCount).to.equal(0);
  });

  it('returns the right state with an existing request key, with resource IDs: SUCCEEDED', () => {
    stub(console, 'error');
    const initialState = {
      requests: {
        pasta: {
          hungry: true
        }
      }
    };

    const reducer = resourceRequestReducer({ initialState });

    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCES_SUCCEEDED',
      requestName: 'GET /pasta',
      requestKey: 'pasta',
      resources: {
        books: [24, 50],
        authors: [100]
      }
    });

    expect(reduced).to.deep.equal({
      requests: {
        pasta: {
          hungry: true,
          requestName: 'GET /pasta',
          status: 'SUCCEEDED',
          resources: {
            books: [24, 50],
            authors: [100]
          }
        }
      }
    });

    expect(console.error.callCount).to.equal(0);
  });

  it('returns the right state with an existing request key, with resource IDs: SUCCEEDED', () => {
    stub(console, 'error');
    const initialState = {
      requests: {
        pasta: {
          hungry: true
        }
      }
    };

    const reducer = resourceRequestReducer({ initialState });

    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCES_SUCCEEDED',
      requestName: 'GET /pasta',
      requestKey: 'pasta',
      resourceName: 'books',
      resources: [{ id: 24, title: 'Things' }, { id: 50, title: 'Things2' }]
    });

    expect(reduced).to.deep.equal({
      requests: {
        pasta: {
          hungry: true,
          requestName: 'GET /pasta',
          status: 'SUCCEEDED',
          resources: {
            books: [24, 50]
          }
        }
      }
    });

    expect(console.error.callCount).to.equal(0);
  });

  it('returns the right state with an previously nonexistent request key, with IDs', () => {
    stub(console, 'error');
    const initialState = {
      requests: {
        sandwiches: {
          hungry: true
        }
      }
    };

    const reducer = resourceRequestReducer({ initialState });

    const reduced = reducer(undefined, {
      type: 'CREATE_RESOURCES_PENDING',
      resourceName: 'hellos',
      requestName: 'GET /pasta',
      requestKey: 'pasta',
      resources: [1]
    });

    expect(reduced).to.deep.equal({
      requests: {
        sandwiches: {
          hungry: true
        },
        pasta: {
          requestName: 'GET /pasta',
          status: 'PENDING'
        }
      }
    });

    expect(console.error.callCount).to.equal(0);
  });
});
