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
        createXhrStatus: requestStatuses.PENDING,
        createManyXhrStatus: requestStatuses.NULL,
        readXhrStatus: requestStatuses.NULL
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
        createXhrStatus: requestStatuses.FAILED,
        createManyXhrStatus: requestStatuses.NULL,
        readXhrStatus: requestStatuses.NULL
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
      meta: {},
      listMeta: {
        createXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        readXhrStatus: requestStatuses.NULL
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
        createXhrStatus: requestStatuses.NULL,
        createManyXhrStatus: requestStatuses.NULL,
        readXhrStatus: requestStatuses.NULL
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
          updateXhrStatus: requestStatuses.NULL,
          readXhrStatus: requestStatuses.NULL,
          deleteXhrStatus: requestStatuses.NULL
        }
      },
      listMeta: {
        createXhrStatus: requestStatuses.SUCCEEDED,
        createManyXhrStatus: requestStatuses.NULL,
        readXhrStatus: requestStatuses.NULL
      }
    });
  });
});
