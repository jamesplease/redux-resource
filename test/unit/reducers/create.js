import simpleResource, {requestStatuses} from '../../../src';

describe('reducers: create', function() {
  it('should handle `CREATE_HELLO`', () => {
    const result = simpleResource('hello');
    const reduced = result.reducer(result.initialState, {
      type: 'CREATE_HELLO'
    });

    expect(reduced).to.deep.equal({
      resources: [],
      meta: {},
      listMeta: {
        createStatus: requestStatuses.PENDING,
        createManyStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL
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
      meta: {},
      listMeta: {
        createStatus: requestStatuses.FAILED,
        createManyStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL
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
      meta: {},
      listMeta: {
        createStatus: requestStatuses.NULL,
        createManyStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL
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
      meta: {
        10: {
          updateStatus: requestStatuses.NULL,
          readStatus: requestStatuses.NULL,
          deleteStatus: requestStatuses.NULL
        }
      },
      listMeta: {
        createStatus: requestStatuses.SUCCEEDED,
        createManyStatus: requestStatuses.NULL,
        readStatus: requestStatuses.NULL
      }
    });
  });
});
