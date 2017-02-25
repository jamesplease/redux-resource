import simpleResource, {xhrStatuses} from '../../../src';

describe('reducers: create', function() {
  it('should handle `CREATE_HELLO`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_HELLO'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourceMeta: {},
      resourceListMeta: {
        creatingStatus: xhrStatuses.PENDING,
        retrievingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `CREATE_HELLOS_FAIL`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_HELLO_FAIL'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourceMeta: {},
      resourceListMeta: {
        creatingStatus: xhrStatuses.FAILED,
        retrievingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `CREATE_HELLOS_ABORT`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_HELLO_ABORT'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourceMeta: {},
      resourceListMeta: {
        creatingStatus: xhrStatuses.ABORTED,
        retrievingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `CREATE_HELLOS_RESET`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_HELLO_RESET'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      resourceMeta: {},
      resourceListMeta: {
        creatingStatus: xhrStatuses.NULL,
        retrievingStatus: xhrStatuses.NULL
      }
    });
  });

  it('should handle `CREATE_HELLO_SUCCEED`', () => {
    const result = simpleResource('hello', {
      idAttribute: 'movieId'
    });
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_HELLO_SUCCEED',
      resource: {
        movieId: 10,
        hungry: true
      }
    });

    expect(reduced).to.deep.equal({
      resources: [
        {movieId: 10, hungry: true}
      ],
      resourceMeta: {
        10: {
          updatingStatus: xhrStatuses.NULL,
          retrievingStatus: xhrStatuses.NULL,
          deletingStatus: xhrStatuses.NULL
        }
      },
      resourceListMeta: {
        creatingStatus: xhrStatuses.SUCCEEDED,
        retrievingStatus: xhrStatuses.NULL
      }
    });
  });
});
